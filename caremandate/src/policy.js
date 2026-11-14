// Executable reference model. This is NOT a deployed contract or a wallet.
// Monetary values are integer smallest-units, never floating point.
export class Mandate {
  constructor({ sponsor, agent, clinic, suppliers, items, budget, expiresAt }) {
    if (!sponsor || !agent || !clinic || new Set([sponsor, agent, clinic]).size !== 3) throw Error('DISTINCT_ROLES_REQUIRED');
    if (typeof budget !== 'bigint' || budget <= 0n) throw Error('INVALID_BUDGET');
    if (!Number.isSafeInteger(expiresAt) || expiresAt <= 0) throw Error('INVALID_EXPIRY');
    if (!Array.isArray(suppliers) || !suppliers.length) throw Error('SUPPLIERS_REQUIRED');
    this.sponsor = sponsor; this.agent = agent; this.clinic = clinic;
    this.suppliers = new Set(suppliers);
    this.items = new Map(Object.entries(items).map(([sku, rule]) => {
      if (!Number.isSafeInteger(rule.quantity) || rule.quantity <= 0 || typeof rule.maxUnitPrice !== 'bigint' || rule.maxUnitPrice <= 0n) throw Error('INVALID_ITEM');
      return [sku, { ...rule }];
    }));
    if (!this.items.size) throw Error('ITEMS_REQUIRED');
    this.balance = budget; this.expiresAt = expiresAt;
    this.orders = new Map(); this.cancelled = false;
  }
  active(now) {
    if (!Number.isSafeInteger(now) || now < 0) throw Error('INVALID_TIME');
    if (this.cancelled) throw Error('REVOKED');
    if (now >= this.expiresAt) throw Error('EXPIRED');
  }
  reserve(caller, quote, now) {
    this.active(now);
    if (caller !== this.agent) throw Error('AGENT_ONLY');
    const { id, supplier, recipient, sku, quantity, unitPrice, validUntil } = quote;
    if (typeof id !== 'string' || !id || this.orders.has(id)) throw Error('DUPLICATE_OR_INVALID_ORDER');
    if (!this.suppliers.has(supplier) || recipient !== supplier) throw Error('RECIPIENT_NOT_APPROVED');
    if (!Number.isSafeInteger(validUntil) || validUntil <= now) throw Error('QUOTE_EXPIRED');
    const rule = this.items.get(sku);
    if (!rule) throw Error('ITEM_NOT_APPROVED');
    if (!Number.isSafeInteger(quantity) || quantity <= 0 || quantity > rule.quantity) throw Error('QUANTITY_EXCEEDED');
    if (typeof unitPrice !== 'bigint' || unitPrice <= 0n || unitPrice > rule.maxUnitPrice) throw Error('PRICE_EXCEEDED');
    const total = BigInt(quantity) * unitPrice;
    if (total > this.balance) throw Error('BUDGET_EXCEEDED');
    // Consume availability before any external effect; repeated quotes cannot overspend.
    this.balance -= total; rule.quantity -= quantity;
    this.orders.set(id, { id, supplier, recipient, sku, quantity, unitPrice, total, status: 'reserved' });
    return { ...this.orders.get(id) };
  }
  confirmDelivery(caller, id, evidenceHash, now) {
    this.active(now);
    if (caller !== this.clinic) throw Error('CLINIC_ONLY');
    const order = this.orders.get(id);
    if (!order || order.status !== 'reserved') throw Error('ORDER_NOT_RESERVED');
    if (!/^[a-f0-9]{64}$/.test(evidenceHash)) throw Error('INVALID_EVIDENCE_HASH');
    // A hash records an attestation; it does not prove real-world delivery.
    order.evidenceHash = evidenceHash; order.status = 'payment_pending';
    return { recipient: order.recipient, amount: order.total };
  }
  settleCallback(id, succeeded) {
    // In the contract this method MUST be private, with exactly one promise result.
    const order = this.orders.get(id);
    if (!order || order.status !== 'payment_pending') throw Error('NO_PENDING_PAYMENT');
    if (typeof succeeded !== 'boolean') throw Error('INVALID_RESULT');
    order.status = succeeded ? 'paid' : 'payment_failed';
  }
  retryPayment(caller, id, now) {
    this.active(now);
    if (caller !== this.clinic) throw Error('CLINIC_ONLY');
    const order = this.orders.get(id);
    if (!order || order.status !== 'payment_failed') throw Error('PAYMENT_NOT_FAILED');
    order.status = 'payment_pending';
    return { recipient: order.recipient, amount: order.total };
  }
  cancel(caller) {
    if (caller !== this.sponsor) throw Error('SPONSOR_ONLY');
    if (this.cancelled) throw Error('REVOKED');
    // MVP cancellation only before an order is reserved: avoids delivery/refund disputes.
    if (this.orders.size) throw Error('HAS_COMMITTED_ORDERS');
    this.cancelled = true;
    const amount = this.balance; this.balance = 0n;
    return { recipient: this.sponsor, amount };
  }
}
