# Showcase upgrade audit and demo plan

## Checkpoint
Original working source, assets and CareMandate reference code are copied to showcase-checkpoint-2026-11-11. The existing project remains React + TypeScript + Vite. No new rendering framework is required. NurseQuest clinical learning and CareMandate procurement remain distinct modes of one product.

## Priorities and implementation
1. Fix movement (all keys previously advanced a single counter), enforce proximity and prevent repeated answer rewards. Implemented; engine unit tests pass.
2. Add a complete three-station ward expedition: assess, escalate, reassess. Correct choices advance once; incorrect choices provide teaching feedback and a lower score. No reward for rushing a clinical decision.
3. Add a real WebGL 3D ward with a low-poly nurse, patient bed, lighting, orbit camera and zoom. A first-shift tutorial, Guide Me and labelled station actions explain the loop. CSS supplies entrance, station and victory effects; low-effects and reduced-motion controls are available.
4. Add optional synthesised sound cues, personal best and completed-run storage on the user's device, replay and a downloadable original victory card. No invented public leaderboard.
5. Preserve original ward as a selectable mode. Preserve CareMandate attack demo and local payment simulation.
6. Real NEAR wallet, attested achievements and escrow deployment remain blocked. SDK installation from npm returned EACCES. No Rust/NEAR compiler is available. Do not present this build as a completed blockchain submission.

## Architecture
- App.tsx: existing navigation and original clinical practice mode.
- GameHub.tsx: original squad-art lobby and CareMandate policy demo.
- WardScene.tsx: preserved original practice ward.
- Ward3D.tsx and ward-renderer.js: WebGL expedition scene, camera, guided movement and graphics fallback.
- Expedition.tsx: local mission state, sound, achievements and PNG card export.
- expedition-engine.mjs: deterministic movement, proximity and bounded scoring.
- caremandate/src/policy.js: local payment-policy reference model, not a smart contract.
- Animations: bounded WebGL animation loop and CSS keyframes, without additional 3D dependencies. Pixel ratio is capped; low quality limits frame rate. OS reduced-motion and per-mission low-effects mode are supported.

## Reproducible three-minute demo
0:00–0:20 — Open lobby. Pitch: NurseQuest connects learning with accountable support for clinic supplies.
0:20–0:40 — Play the new expedition. Move in different directions. Try interacting away from a station to show the distance check.
0:40–1:25 — Complete assess, escalation and reassessment decisions. Show one reconsideration and contextual explanation. No patient outcome is claimed from quiz choices.
1:25–1:45 — Victory, personal best, saved result card and replay. Explain that this is a local educational achievement, not an official credential.
1:45–2:30 — Return to lobby and open CareMandate. Test a malicious recipient, reserve the permitted supplier quote, attest delivery and simulate payment. Explain the simulation label.
2:30–3:00 — Explain the intended onchain boundary: escrow rules must be enforced in a NEAR contract even when an agent is compromised. Show tested policy logic and explicitly identify the currently missing testnet deployment.

## Pitch
NurseQuest is a nursing learning adventure with a supply-support prototype called CareMandate. Players navigate clinical scenarios and practise recognising concerns. Sponsors can explore mandates that restrict how a purchasing agent would spend a clinic's supply budget. The security demo rejects an injected payment recipient. The local gameplay is implemented; wallet transactions, onchain achievements and actual escrow are pending and must not be claimed as delivered.

## Verification and remaining work
TypeScript check, production build and 19 Node tests passed during implementation. The 3D scene and tutorial were inspected in Chrome. Full mobile and complete end-to-end browser QA remain incomplete. Sound, card export and persistence still require live browser confirmation. The extension browser host has been unreliable; native Chrome access sometimes works.

### Blockchain acceptance gates
- Install maintained wallet SDK; explicit testnet network and account display.
- Signed transactions must come only from wallet approval; display returned hashes and verify their outcomes through testnet RPC.
- Deploy compiled, tested escrow contract before enabling funds.
- Define who attests learning outcomes; client-only scores are untrusted. Never mint a credential that claims clinical competence.
- Test payout failure/retry, refund/storage accounting, replay protection and authorisation in a real NEAR sandbox.
- Until these pass, no enabled claim/mint/payment button may suggest onchain support.

Teaching source: Resuscitation Council UK ABCDE approach, https://www.resus.org.uk/library/abcde-approach (checked 11 November 2026). Fictional education only.
