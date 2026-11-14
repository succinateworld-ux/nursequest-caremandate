# NurseQuest CareMandate

AI-assisted clinic procurement with contract-enforced spending authority.

## Current status
Local executable policy reference and attack tests only. No contract has been compiled, deployed, funded or tested on NEAR. No AI provider or wallet is connected. The local demo simulates payment; it is not evidence of onchain settlement.

Run `npm test` and `npm run demo` in this folder. No dependencies required beyond Node 22+.

## MVP
One fictional clinic, gloves and dressings, three fixture supplier quotes. Sponsor defines fixed recipient allowlist, item quantities, unit-price ceilings, budget and expiry. Agent proposes an order. Escrow validates it. A separate authorised clinic account attests delivery before payout. A receipt hash preserves evidence integrity, not physical-delivery truth. No patient data or clinical treatment decisions.

## NEAR implementation requirements
- Deploy isolated contract on testnet; use test NEAR for the first demo and label it clearly.
- Keep the owner key with the sponsor; agent key only calls the intended contract and allowed methods with zero attached deposit.
- Obtain caller and timestamps from NEAR runtime, never from submitted JSON.
- Lock quantities and funds atomically before external calls.
- Supplier payout is a contract promise. Private callback handles success/failure; reject forged callbacks and duplicate payout. Test retry and failed refund paths.
- Explicitly separate escrow funds, storage and gas. Avoid unbounded storage.
- Cancellation in MVP is allowed only before commitment. Partial fulfilment, disputes, expiry recovery and stablecoins are not implemented; define and test these before production use.
- Model output and supplier text are untrusted. Deterministic fixture replay must run without an API key. Do not describe fixture selection as live AI.

## Deadline plan (West Africa Time)
Official submission closes 15 November 2026 at 00:59 WAT (14 November 23:59 UTC).
Our target: complete build and demo by 13 November at 18:00 WAT.

| Date | Deliverable / completion evidence |
|---|---|
| 10 Nov | Policy reference, malicious quote fixtures, tests; start NEAR contract |
| 11 Nov | Contract build, sandbox integration tests, testnet deployment and transaction evidence |
| 12 Nov | React flow, wallet interaction, quote comparison agent, complete happy path and blocked attacks |
| 13 Nov | Fresh-clone reproduction, adversarial testing, short demo, screenshots, README and submission draft |
| 14 Nov | Publish public repository and approved X demo; submit links well before cutoff |

Prioritise AI Security & Defense. Add other tracks only if delivered functionality supports them. Cross-chain funding and mainnet payments are stretch work.

## Provenance and submission
CareMandate is new hackathon work. Existing NurseQuest educational app predates this module; disclose this in the submission. Do not present the older app as newly built. Check eligibility against final official rules. Public repository and X post required. User account identity, NEAR payout address and final public posting text must be established before submission. No automatic public post or mainnet transaction is authorised by this README.

Sources: https://nearhackathon.com/ and https://docs.near.org/protocol/accounts-contracts/access-keys (checked 10 November 2026).
