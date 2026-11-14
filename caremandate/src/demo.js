import { Mandate } from './policy.js';
const m = new Mandate({sponsor:'sponsor.testnet',agent:'agent.testnet',clinic:'clinic.testnet',suppliers:['supplier.testnet'],items:{gloves:{quantity:10,maxUnitPrice:10n}},budget:100n,expiresAt:1000});
const q={id:'order-1',supplier:'supplier.testnet',recipient:'supplier.testnet',sku:'gloves',quantity:5,unitPrice:10n,validUntil:900};
console.log('LOCAL REFERENCE MODEL — no blockchain transactions or real money');
try { m.reserve(m.agent,{...q,recipient:'attacker.testnet'},1); } catch(e) { console.log('ATTACK BLOCKED:',e.message); }
console.log('VALID ORDER:', m.reserve(m.agent,q,2));
console.log('CLINIC CONFIRMS:',m.confirmDelivery(m.clinic,q.id,'a'.repeat(64),3));
m.settleCallback(q.id,true);
console.log('SIMULATED PAYOUT STATUS:',m.orders.get(q.id).status);
