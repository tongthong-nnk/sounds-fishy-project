# Sounds Fishy - Multiplayer Party Game

A personal web application for small groups of friends to play a bluffing party game together. Players join a room, submit answers, and try to distinguish the correct answer from the bluffs.

[Live demo](https://sounds-fishy-project.vercel.app) | [Technical specification](docs/TECHNICAL_SPEC.md) | [Test plan](docs/TEST_PLAN.md)

## Features

- Room-based multiplayer play with host controls.
- Player rejoin and basic Online/Away presence.
- Answer submission, reveal, Stop / Bank, and round scoring.
- Host controls to skip a question or end a game.
- A Thai question deck and an ocean-themed interface with optional music and sound effects.

## Technology

| Area | Tools |
| --- | --- |
| Web application | Next.js, React, TypeScript |
| Styling | Tailwind CSS |
| Shared game data | Firebase Firestore |
| Player identity | Browser localStorage |
| Hosting | Vercel |

## Project Scope

This is a private-party MVP for fewer than 10 trusted friends. It demonstrates room and game-state handling, a shared Firestore data model, and interactive web UI development. It is not presented as a production service with verified scalability or security.

Player identity uses localStorage rather than real authentication. The existing Firestore rules and trust model are intended for this limited setting, not an unrestricted public application.

Development uses AI-assisted workflows. The technical specification, implementation checklists, and test plan document the design and review process. Automated lint/build checks and manual multiplayer checks serve different purposes; a successful build alone does not establish that every game flow works.

## Quick Start

Clone the repository and install the locked dependencies:

```powershell
git clone https://github.com/tongthong-nnk/sounds-fishy-project.git
cd sounds-fishy-project
npm.cmd ci
```

Copy the environment example:

```powershell
Copy-Item .env.example .env.local
```

Paste your Firebase web app values into `.env.local`, then run locally:

```powershell
npm.cmd run dev
```

Then open `http://localhost:3000`.

From the repository root, run the available checks:

```powershell
npm.cmd run lint
npm.cmd run build
npm.cmd audit --audit-level=moderate
```

Manual multi-browser and game-flow checks are documented in [the test plan](docs/TEST_PLAN.md). The package currently has lint and build commands, but no automated test command.

## Firebase Setup

1. Create a Firebase project.
2. Add a Firebase web app.
3. Copy the web app config values into `.env.local`.
4. Enable Firestore Database.
5. Publish this repo's `firestore.rules` in Firestore Database > Rules.
6. Restart `npm.cmd run dev` after changing `.env.local`.

Required `.env.local` keys:

- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`

These are normal Firebase browser config values. Do not commit `.env.local`, and do not add service account keys to this app.

## Deploy To Vercel

1. Create a GitHub repository for this folder.
2. Push the project to GitHub.
3. Import the repository in Vercel.
4. Add the same `NEXT_PUBLIC_FIREBASE_*` environment variables in Vercel Project Settings.
5. Deploy on the Vercel free tier.
6. Open the deployment URL and test create room, join room, and one full round with multiple browser sessions.

The Firestore rules are suitable for this private MVP with trusted friends. They are not production-grade for a public app because there is no real authentication.

## Main Docs

- [Project Plan](docs/PROJECT_PLAN.md)
- [Technical Spec](docs/TECHNICAL_SPEC.md)
- [Game Rules](docs/GAME_RULES.md)
- [Firebase Schema](docs/FIREBASE_SCHEMA.md)
- [Development Checklist](docs/DEVELOPMENT_CHECKLIST.md)
- [Test Plan](docs/TEST_PLAN.md)
- [Deployment Guide](docs/DEPLOYMENT_GUIDE.md)
- [Question Research](docs/QUESTION_RESEARCH.md)

## Development Status

The previous development notes identify Milestone 18.3 (audio behavior and lobby copy-button UI fixes) as implemented, with manual verification of Music Off button sounds and lobby copy controls still pending. See [the test plan](docs/TEST_PLAN.md) and [development checklist](docs/DEVELOPMENT_CHECKLIST.md) for the detailed review steps.

## AI-Assisted Development Notes

- [MAIN_AGENT](docs/agents/MAIN_AGENT.md)
- [ARCHITECT_AGENT](docs/agents/ARCHITECT_AGENT.md)
- [GAME_LOGIC_AGENT](docs/agents/GAME_LOGIC_AGENT.md)
- [FIREBASE_AGENT](docs/agents/FIREBASE_AGENT.md)
- [UI_UX_AGENT](docs/agents/UI_UX_AGENT.md)
- [QA_AGENT](docs/agents/QA_AGENT.md)
- [DEPLOYMENT_AGENT](docs/agents/DEPLOYMENT_AGENT.md)

## Milestone Workflow

At the start of each milestone:

1. `MAIN_AGENT` identifies relevant sub-agents.
2. Relevant agent docs are updated with planned work.
3. `MAIN_AGENT` confirms milestone scope.
4. Only the scoped milestone work is implemented.

At the end of each milestone:

1. Relevant agent docs are updated.
2. `QA_AGENT` updates the test plan when needed.
3. `MAIN_AGENT` updates the development checklist.
4. A short milestone summary is provided.
5. Work stops until user confirmation.
