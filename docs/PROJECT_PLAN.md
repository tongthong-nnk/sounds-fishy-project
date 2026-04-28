# Project Plan

Last updated milestone: Milestone 8

## Project Goal

Build a small private web-based multiplayer party bluffing game inspired by Sounds Fishy for fewer than 10 friends. The app is a private hobby project, deployable on free-tier services, and optimized for desktop and laptop browsers first.

The intended player flow:

1. Open the website.
2. Enter a display name.
3. Create a room or join with a room code.
4. Wait together in a realtime lobby.
5. Host starts the game.
6. Each round assigns one Guesser, one Truth Teller, and the remaining players as Bluffers.
7. Everyone sees the same question.
8. Only the Truth Teller sees the correct answer.
9. Bluffers submit fake believable answers.
10. Guesser reviews submitted answers without seeing roles.
11. Guesser chooses players they think are Bluffers.
12. Correct guesses score points.
13. Selecting the Truth Teller ends the round.
14. Results are revealed.
15. Host starts the next round.
16. Guesser rotates each round.

## Feature List

- Display name stored in localStorage.
- Room creation with short uppercase room codes.
- Room joining by code.
- Realtime lobby using Firestore listeners.
- Host-only game start.
- Minimum player validation with at least 4 players.
- Round roles: Guesser, Truth Teller, Bluffers.
- Question and answer reveal rules.
- Answer submission by non-guessers.
- Automatic transition from answering to guessing.
- Guessing flow with eliminated Bluffers.
- Simple scoring.
- Result reveal screen.
- Host-only next round.
- Refresh-resilient player identity through localStorage.
- Desktop-first responsive UI.
- Firebase and Vercel setup documentation.

## MVP Scope

The MVP includes the complete private party game loop:

- Create room.
- Join room.
- Realtime lobby.
- Start game.
- Assign roles.
- Submit answers.
- Guess players.
- Score round.
- Reveal result.
- Start next round.
- Deploy to Vercel with Firebase Firestore.

## Out Of Scope

These features are intentionally excluded from the MVP:

- Real authentication.
- Public account system.
- Payments.
- Analytics.
- Ads.
- Timers.
- Chat.
- Custom avatars.
- Admin panel.
- Database cleanup automation.
- Custom domain.
- Public production-grade security model.
- Complex scoring variants.
- Native mobile app.

## Milestone Roadmap

### Milestone 0: Workspace Verification, Documentation Setup, And Agent Setup

Status: Completed

Goal:

- Verify the project lives in `E:\sounds-fishy-project`.
- Create documentation before app code.
- Create agent documentation files.
- Do not implement app features.

### Milestone 1: Base Project Setup

Status: Completed

Goal:

- Create or verify Next.js App Router, TypeScript, and Tailwind setup.
- Add basic scripts and starter page.
- Do not add Firebase logic yet.

### Milestone 2: Types, Player Identity, And Questions

Status: Completed

Goal:

- Add foundational non-Firebase code in `lib/`.
- Include shared TypeScript types, localStorage identity helpers, sample questions, and pure game logic helpers.

### Milestone 3: Firebase Setup Layer

Status: Completed

Goal:

- Add Firebase configuration and environment examples.
- Add initial Firestore rules.
- Do not wire game flow into UI yet.

### Milestone 4: Home Page UI And Local Player Name

Status: Completed

Goal:

- Build a functional home screen for name entry, room code entry, and placeholder create/join actions.

### Milestone 5: Room Service Basics, Create Room, Join Room

Status: Completed

Goal:

- Implement Firestore-backed room creation and joining.
- Wire home actions to room services.

### Milestone 6: Room Page And Realtime Lobby

Status: Completed

Goal:

- Add room route, realtime listeners, lobby UI, player list, and host-only start button placeholder.

### Milestone 7: Start Game And Role Assignment

Status: Completed

Goal:

- Implement host game start, role assignment, first question selection, and initial answer phase display.

### Milestone 8: Answer Submission And Automatic Transition To Guessing

Status: Completed

Goal:

- Let non-guessers submit answers and move all clients to guessing when all non-guessers have submitted.

### Milestone 9: Guessing Phase

Status: Waiting for user confirmation

Goal:

- Implement the main guessing gameplay, score updates, eliminated state, and result transition.

### Milestone 10: Result Phase And Scoreboard

Goal:

- Reveal roles, answers, and scores clearly.

### Milestone 11: Next Round

Goal:

- Rotate guesser, assign new roles, choose next question, preserve scores, and start another round.

### Milestone 12: Polish, Resilience, And UX Cleanup

Goal:

- Improve desktop UX, loading and error states, refresh behavior, duplicate-click handling, and basic resilience.

### Milestone 13: Firestore Rules And Deployment Documentation

Goal:

- Improve rules for a private MVP and finalize beginner-friendly deployment documentation.

### Milestone 14: Final End-To-End Test Plan

Goal:

- Finalize manual QA checklist and fix only obvious bugs found during final review.

## Desktop-First UX Direction

The UI should prioritize 1366x768, 1440x900, and 1920x1080 desktop/laptop screens. Important game information should stay visible without excessive scrolling:

- Room code and host actions should be easy to find.
- Question and current phase should be prominent.
- Player list, submission status, and scoreboard should use side panels where useful.
- Guessing should make answer comparison comfortable.
- Result screen should reveal roles and scores clearly.
- Mobile should remain usable as a secondary fallback.

## Multi-Agent Workflow Summary

The project uses simulated agent ownership through documentation files in `docs/agents/`. No actual parallel sub-agents are required.

- `MAIN_AGENT` owns roadmap, milestone scope, checklist updates, and final milestone summaries.
- `ARCHITECT_AGENT` owns structure, file boundaries, and simple architecture.
- `GAME_LOGIC_AGENT` owns game rules, role assignment, scoring, and round transitions.
- `FIREBASE_AGENT` owns Firestore schema, listeners, transactions, config, and rules.
- `UI_UX_AGENT` owns desktop-first screens and readability.
- `QA_AGENT` owns test checkpoints and final QA.
- `DEPLOYMENT_AGENT` owns setup, Firebase, Vercel, and common troubleshooting docs.

At the start of each milestone, `MAIN_AGENT` identifies the relevant agents and confirms scope in the docs. At the end of each milestone, relevant agent docs, `docs/DEVELOPMENT_CHECKLIST.md`, and `docs/TEST_PLAN.md` are updated as needed.

## Response Policy

Detailed plans and decisions live in markdown files. Chat responses after each milestone should stay short and include:

- Summary.
- Files created or changed.
- Exact test or check steps.
- Expected result.
- A clear stop for user confirmation before the next milestone.
