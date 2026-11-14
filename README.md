# NurseQuest by Nurse Succinate

## Hackathon submission status — 13 November 2026

The current build includes a WebGL 3D nursing-learning mission and an offchain CareMandate policy demonstration. No NEAR wallet, deployed contract, live purchasing AI, onchain achievement or real payment is implemented. Supplier checks and payments shown in CareMandate are local simulations. The educational app predates the hackathon; CareMandate and the game upgrades were added during it. See [the one-hour submission checklist and honest project description](docs/SUBMIT-NOW.md). Earlier production notes below describe prior milestones and should not be read as evidence of deployed blockchain functionality.

A responsive educational nursing simulation built with React, TypeScript, Vite, and Lucide icons. The visual direction is a premium, Web3-inspired game interface—neon clinical HUD details, a quest-board layout, mission framing, and XP-style feedback—without blockchain, wallets, tokens, payments, or a backend.

## Current mission

**Quest 001: Emergency Ward — The First Assessment** is a fictional acute-care scenario. Learners review a handover and observations, make three decisions, receive explanatory feedback, earn learning points, and finish with a reflection. The score is for game feedback only; it does not assess or certify clinical competence.

## Setup

Requires Node.js 20.19+ or 22.12+.

```bash
npm install
npm run dev
```

Vite prints the local URL (usually `http://localhost:5173`).

## Checks

```bash
npm run build
npm run lint
```

## Educational scope

All patient details and events are fictional. NurseQuest is for learning and reflection; it does not replace clinical judgment, local protocols, supervision, or formal training. In real care, follow your organisation's escalation pathways and guidance.

## Game hub redesign — 11 November 2026

Original squad hero artwork, an adventure-style mission board, mobile layouts and integrated CareMandate Supply Run are in src/GameHub.tsx and src/game-hub.css. Supply Run uses the local CareMandate policy reference: reject an unknown recipient, reserve an approved quote, simulate clinic attestation and complete a simulated payment. No wallet or NEAR deployment is represented as live. The Emergency Ward remains accessible from the hub. Original App.tsx and styles.css are backed up in design-backup-2026-11-11.

For this managed Windows environment, use `node build-local.mjs --serve` for preview and `node build-local.mjs` for production bundling. This avoids the configuration bundler trying to enumerate the restricted parent home directory. Type-check with `node node_modules/typescript/bin/tsc -b`. Policy checks: run `node --test` inside caremandate.

## Showcase expedition upgrade — 11 November 2026

Click Play Your First Quest to enter the new three-station Aftershock expedition. Move with WASD, arrows or the on-screen buttons; reach each glowing station and interact. Complete the assessment, escalation and reassessment decisions, view the animated result, save a PNG victory card and replay to improve the personal best stored on this device. Sound is opt-in; full/low effects are available in the expedition toolbar. Original Ward Practice remains selectable from the hub, and CareMandate remains a local policy demo.

See [the audit, architecture, three-minute storyboard and remaining acceptance gates](docs/SHOWCASE.md). This build has no deployed NEAR contract, wallet connection, token rewards or verified onchain achievement. Package installation was blocked by EACCES to the npm registry. Do not claim it is a finished blockchain hackathon entry yet. Source checkpoint: showcase-checkpoint-2026-11-11.
