# NurseQuest CareMandate: submit within one hour

## Current status
Playable local 3D nursing-learning game and offchain CareMandate policy demo. No NEAR contract, wallet, live purchasing AI, onchain achievement or real payment is implemented. Do not describe local simulations as testnet transactions. The existing educational app predates the hackathon; the CareMandate module and game upgrades were built during it.

## 0–15 minutes: public repository
Create a public GitHub repository. Upload src/, public/, caremandate/, docs/, package.json, package-lock.json, index.html, tsconfig.json, tsconfig.app.json, tsconfig.node.json, vite.config.ts, eslint.config.js and build-local.mjs. README.md and package.json must be at repository root. Exclude node_modules, backups, .env files and keys. State the current status above in the README. Run: npm ci; npm run dev. Build: npm run build. Tests: cd caremandate, then node --test.

## 15–35 minutes: demo
Record about two minutes: lobby; Play Your First Quest; Start My Shift; Guide Me; actual 3D movement and camera rotation; Assess Maya and feedback; CareMandate malicious-recipient rejection and simulated valid order. Say explicitly that wallet/NEAR integration is pending. If recording fails, use real screenshots.

## 35–45 minutes: X post
Suggested copy:

I built NurseQuest CareMandate at NEAR HACKATHON: a 3D nursing-learning adventure + a clinic-supply spending-policy prototype. The demo blocks an unapproved recipient. Current policy/payment flow is local; NEAR integration is pending. @NEARProtocol #NEARHackathon

Attach the demo and copy the public post link.

## 45–60 minutes: form and verification
Read the latest https://nearhackathon.com/HACKATHON.md and open https://nearhackathon.com/#apply. Enter the confirmed lead name, email, team size, track, mainnet NEAR prize-payout account, public repository URL and public X demo URL. Leave the website field blank: the API guide identifies it as a spam trap. Local-only projects need a video demo; screenshots alone are insufficient when judges cannot open the demo. Confirm the exact submission and contact notice before sending it once. Track fit and eligibility remain for organisers to assess; no completed NEAR integration is claimed.

## Project description
NurseQuest CareMandate combines a playable 3D nursing-learning adventure with an offchain prototype of controlled clinic-supply spending. Players navigate a ward, practise assessment, escalation and reassessment, and receive educational feedback. CareMandate rejects an unapproved payment recipient and checks supplier, quantity, price, budget and expiry rules in a tested local reference model. Delivery attestation and payment are simulated. The original NurseQuest educational app predates the hackathon; CareMandate and the redesigned game were developed during it. NEAR integration remains incomplete: no deployed escrow, wallet connection, live purchasing AI or onchain transaction is claimed. The next step is enforcing the spending rules in a NEAR testnet contract.
