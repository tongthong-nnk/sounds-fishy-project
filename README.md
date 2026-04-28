# Sounds Fishy Private Party Game

A small private web-based multiplayer bluffing party game for fewer than 10 friends. The app will use Next.js, TypeScript, Tailwind CSS, Firebase Firestore, localStorage-based player identity, and Vercel deployment.

## Current Milestone Status

- Completed: Milestone 14, final end-to-end test plan.
- Next: Run the final QA checklist in `docs/TEST_PLAN.md`.
- Status: Milestone roadmap complete; final manual verification is ready.

The MVP flow now supports player ID rejoin, display-name fallback rejoin, no new players after game start, basic Online/Away presence, owner-revealed answer cards, Stop / Bank, and final round scoring.

## Quick Start

Install dependencies:

```powershell
cd E:\sounds-fishy-project
npm.cmd install
```

Copy the environment example:

```powershell
cd E:\sounds-fishy-project
Copy-Item .env.example .env.local
```

Paste your Firebase web app values into `.env.local`, then run locally:

```powershell
cd E:\sounds-fishy-project
npm.cmd run dev
```

Then open `http://localhost:3000`.

Validation:

```powershell
cd E:\sounds-fishy-project
npm.cmd run lint
npm.cmd run build
npm.cmd audit --audit-level=moderate
```

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

## Agent Docs

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
