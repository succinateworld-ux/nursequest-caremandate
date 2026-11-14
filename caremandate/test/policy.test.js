import { test } from 'node:test';
import assert from 'node:assert/strict';
import { Mandate } from '../src/policy.js';
const setup = () => new Mandate({ sponsor:'sponsor.testnet',agent:'agent.testnet',clinic:'clinic.testnet',suppliers:['supplier.testnet'],items:{gloves:{quantity:10,maxUnitPrice:10n}},budget:100n,expiresAt:1000 });
const quote = (patch={}) => ({id:'order-1',supplier:'supplier.testnet',recipient:'supplier.testnet',sku:'gloves',quantity:5,unitPrice:10n,validUntil:900,...patch});
test('valid order, clinic attestation, one payment',()=>{const m=setup();m.reserve(m.agent,quote(),1);assert.equal(m.balance,50n);assert.deepEqual(m.confirmDelivery(m.clinic,'order-1','a'.repeat(64),2),{recipient:'supplier.testnet',amount:50n});m.settleCallback('order-1',true);assert.equal(m.orders.get('order-1').status,'paid');assert.throws(()=>m.confirmDelivery(m.clinic,'order-1','a'.repeat(64),3));});
for(const [name,patch,error] of [
 ['injected recipient',{recipient:'attacker.testnet'},'RECIPIENT_NOT_APPROVED'],
 ['unknown supplier',{supplier:'attacker.testnet',recipient:'attacker.testnet'},'RECIPIENT_NOT_APPROVED'],
 ['price inflation',{unitPrice:11n},'PRICE_EXCEEDED'],
 ['quantity inflation',{quantity:11},'QUANTITY_EXCEEDED'],
 ['negative quantity',{quantity:-1},'QUANTITY_EXCEEDED'],
 ['unapproved item',{sku:'unknown'},'ITEM_NOT_APPROVED'],
 ['expired quote',{validUntil:1},'QUOTE_EXPIRED'],
 ['float money',{unitPrice:1.5},'PRICE_EXCEEDED']
]) test(`blocks ${name} without consuming funds`,()=>{const m=setup();assert.throws(()=>m.reserve(m.agent,quote(patch),1),new RegExp(error));assert.equal(m.balance,100n);assert.equal(m.orders.size,0);});
test('blocks replay and cumulative quantity abuse',()=>{const m=setup();m.reserve(m.agent,quote(),1);assert.throws(()=>m.reserve(m.agent,quote(),2),/DUPLICATE/);assert.throws(()=>m.reserve(m.agent,quote({id:'order-2',quantity:6}),2),/QUANTITY/);});
test('blocks wrong caller and expired mandate',()=>{const m=setup();assert.throws(()=>m.reserve('attacker',quote(),1),/AGENT_ONLY/);assert.throws(()=>m.reserve(m.agent,quote(),1000),/EXPIRED/);});
test('only designated clinic can confirm delivery',()=>{const m=setup();m.reserve(m.agent,quote(),1);assert.throws(()=>m.confirmDelivery(m.agent,'order-1','a'.repeat(64),2),/CLINIC_ONLY/);assert.throws(()=>m.confirmDelivery(m.clinic,'order-1','receipt',2),/EVIDENCE/);});
test('failed payout can retry once; paid order cannot retry',()=>{const m=setup();m.reserve(m.agent,quote(),1);m.confirmDelivery(m.clinic,'order-1','a'.repeat(64),2);m.settleCallback('order-1',false);assert.equal(m.retryPayment(m.clinic,'order-1',3).amount,50n);assert.throws(()=>m.retryPayment(m.clinic,'order-1',3));m.settleCallback('order-1',true);assert.throws(()=>m.retryPayment(m.clinic,'order-1',4));});
test('sponsor can revoke uncommitted mandate exactly once',()=>{const m=setup();assert.throws(()=>m.cancel(m.agent),/SPONSOR_ONLY/);assert.equal(m.cancel(m.sponsor).amount,100n);assert.throws(()=>m.reserve(m.agent,quote(),1),/REVOKED/);assert.throws(()=>m.cancel(m.sponsor),/REVOKED/);});
test('cannot revoke funds committed to a supplier',()=>{const m=setup();m.reserve(m.agent,quote(),1);assert.throws(()=>m.cancel(m.sponsor),/COMMITTED/);});
test('budget independent of per-item allowance',()=>{const m=setup();m.balance=1n;assert.throws(()=>m.reserve(m.agent,quote(),1),/BUDGET/);assert.equal(m.balance,1n);});
