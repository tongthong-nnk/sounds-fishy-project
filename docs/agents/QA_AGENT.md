# QA_AGENT

Last updated milestone: Milestone 14

## Responsibility

- Owns test checkpoints.
- Owns final QA checklist.
- Adds milestone-specific test cases to `docs/TEST_PLAN.md`.
- Checks edge cases before each milestone is considered done.
- Ensures every milestone ends with exact manual test steps.

## Current Decisions

- Milestone 0 test is file and documentation verification only.
- Future code milestones must include `npm run build` where applicable.
- Multiplayer features should be tested with multiple browser sessions.
- Desktop viewports must be checked at 1366x768, 1440x900, and 1920x1080.
- Mobile is a secondary sanity check.

## Constraints

- Do not mark a milestone complete without clear test steps.
- Do not skip build verification after code milestones.
- Track edge cases in `docs/TEST_PLAN.md`.

## Milestone Notes

### Milestone 0

Added documentation verification steps to `docs/TEST_PLAN.md`.

### Milestone 1

Completed checks:

- Confirm package scripts exist.
- Confirm dependency install works.
- Confirm `npm run build` passes.
- Provide exact local browser check steps for the user.
- Confirmed `npm.cmd run lint` passes.
- Confirmed `npm.cmd run build` passes.
- Confirmed `npm.cmd audit --audit-level=moderate` reports 0 vulnerabilities.
- Confirmed local dev server returned HTTP 200 and rendered expected page text.

### Milestone 2

Completed checks:

- Confirm `lib/types.ts`, `lib/player.ts`, `lib/questions.ts`, and `lib/gameLogic.ts` exist.
- Confirm question deck has at least 30 items.
- Confirm helpers import without TypeScript errors.
- Confirm no Firebase dependency is introduced.
- Confirm `npm.cmd run lint` and `npm.cmd run build` pass.
- Confirmed question count is 32.
- Confirmed Firebase/Firestore scan returns no matches.

### Milestone 3

Completed checks:

- Confirm Firebase package is installed.
- Confirm `lib/firebase.ts`, `.env.example`, and `firestore.rules` exist.
- Confirm build passes without `.env.local`.
- Confirm lint passes.
- Confirm docs explain exactly which Firebase values to paste into `.env.local`.
- Confirmed audit has 0 vulnerabilities.

### Milestone 4

Completed checks:

- Confirm `components/HomeForm.tsx` exists.
- Confirm display name persists through localStorage.
- Confirm empty display name shows an error.
- Confirm room code input normalizes to uppercase.
- Confirm Create Room and Join Room buttons show placeholder feedback.
- Confirm lint and build pass.
- Confirmed dev server returns HTTP 200 and renders the home form labels.

### Milestone 5

Completed checks:

- Confirm `lib/roomService.ts` exists.
- Confirm HomeForm imports and calls room services.
- Confirm lint and build pass.
- Manual Firebase test: create a room and verify room/player docs.
- Manual Firebase test: join a room in a second browser and verify player doc.
- Confirmed static checks for service calls and Firestore paths.
- Confirmed local smoke test for `/` and `/room/ABC123`.

### Milestone 6

Completed checks:

- Confirm required room/lobby components exist.
- Confirm listeners are implemented in `roomService.ts`.
- Confirm lobby updates in realtime across browsers.
- Confirm room-code copy button works.
- Confirm only host sees Start Game.
- Confirm Start Game is disabled with fewer than 4 players.
- Confirm lint and build pass.
- Confirmed local HTTP smoke checks for home and room routes.

### Milestone 7

Completed checks:

- Confirm host can start only with at least 4 players.
- Confirm all clients move to `answering`.
- Confirm exactly one Guesser and one Truth Teller.
- Confirm only Truth Teller sees correct answer.
- Confirm Guesser sees waiting state.
- Confirm lint and build pass.
- Confirmed route smoke checks and code scans.

### Milestone 8

Completed checks:

- Truth Teller can submit the correct answer.
- Bluffers can submit fake answers.
- Guesser sees realtime submission status.
- All non-guessers submitted moves room to `guessing`.
- Submitted answers are stored in Firestore.
- Lint and build pass.
- Confirmed code scans, audit, and route smoke checks.

### Milestone 9

Planned checks:

- Confirm `GuessingPhase` renders for `guessing`.
- Confirm only Guesser can select answer cards.
- Confirm roles are hidden while guessing.
- Confirm correct Bluffer guess adds +1 and marks the Bluffer eliminated.
- Confirm Truth Teller guess moves to `result`.
- Confirm all Bluffers guessed adds a bonus and moves to `result`.
- Confirm lint, build, audit, and local smoke checks pass.

Completed checks:

- Confirmed `npm.cmd run lint` passes.
- Confirmed `npm.cmd run build` passes.
- Confirmed `npm.cmd audit --audit-level=moderate` reports 0 vulnerabilities.
- Confirmed local HTTP smoke checks for `/` and `/room/ABC123`.
- Added manual multiplayer guessing checks to `docs/TEST_PLAN.md`.

### Milestone 10

Planned checks:

- Confirm result screen renders for `result`.
- Confirm correct answer appears.
- Confirm Guesser and Truth Teller names appear.
- Confirm all player roles and submitted answers are revealed.
- Confirm scoreboard sorts by score descending.
- Confirm only host sees the disabled Next Round placeholder.
- Confirm lint, build, audit, and local smoke checks pass.

Completed checks:

- Confirmed `npm.cmd run lint` passes.
- Confirmed `npm.cmd run build` passes.
- Confirmed `npm.cmd audit --audit-level=moderate` reports 0 vulnerabilities.
- Confirmed local HTTP smoke checks for `/` and `/room/ABC123`.
- Added manual result-phase checks to `docs/TEST_PLAN.md`.

### Milestone 11

Planned checks:

- Confirm host can click Next Round from result.
- Confirm non-hosts do not see the Next Round button.
- Confirm round number increments.
- Confirm Guesser rotates by joined order.
- Confirm new roles are assigned.
- Confirm scores persist.
- Confirm submitted answers, submission flags, guessed IDs, and eliminated flags reset.
- Confirm lint, build, audit, and local smoke checks pass.

Completed checks:

- Confirmed `npm.cmd run lint` passes.
- Confirmed `npm.cmd run build` passes.
- Confirmed `npm.cmd audit --audit-level=moderate` reports 0 vulnerabilities.
- Confirmed local HTTP smoke checks for `/` and `/room/ABC123`.
- Added manual next-round checks to `docs/TEST_PLAN.md`.

### Milestone 12

Planned checks:

- Confirm duplicate Start Game clicks are rejected or ignored.
- Confirm Back to Home actions are present.
- Confirm copy room link works.
- Confirm missing-player messages are clear.
- Confirm refresh in each phase still recognizes local player identity.
- Confirm 1366x768, 1440x900, 1920x1080, and mobile sanity checks.
- Confirm lint, build, audit, and local smoke checks pass.

Completed checks:

- Confirmed `npm.cmd run lint` passes.
- Confirmed `npm.cmd run build` passes.
- Confirmed `npm.cmd audit --audit-level=moderate` reports 0 vulnerabilities.
- Confirmed local HTTP smoke checks for `/` and `/room/ABC123`.
- Added manual polish, refresh, duplicate-click, viewport, and mobile checks to `docs/TEST_PLAN.md`.

### Milestone 12.5

Planned checks:

- Confirm existing player ID rejoin updates `lastSeenAt`.
- Confirm same display-name fallback avoids duplicate player docs.
- Confirm brand-new join after start is rejected.
- Confirm Online/Away badges update from `lastSeenAt`.
- Confirm no disconnected player is automatically removed.

Completed checks:

- Confirmed `npm.cmd run lint` passes.
- Confirmed `npm.cmd run build` passes.
- Confirmed `npm.cmd audit --audit-level=moderate` reports 0 vulnerabilities.
- Added manual rejoin and presence checks to `docs/TEST_PLAN.md`.

Scoped revert checks:

- Replaced same-browser, different-display-name rejection test with a successful rename/rejoin test.
- Added verification that the same player document is reused and its name updates.
- Removed outdated same-storage restriction wording.
- Confirmed `npm.cmd run lint`, `npm.cmd run build`, and `npm.cmd audit --audit-level=moderate` pass.

### Milestone 12.6

Planned checks:

- Confirm guessing starts with all answer cards hidden.
- Confirm card owners can reveal one card at a time.
- Confirm non-guessers see reveal state but not roles.
- Confirm unrevealed cards cannot be guessed.
- Confirm revealed Bluffer guesses still score correctly.
- Confirm revealed Truth Teller guess ends the round.
- Confirm Next Round resets `revealedPlayerIds`.

Completed checks:

- Added reveal-one-by-one manual QA steps to `docs/TEST_PLAN.md`.
- Confirmed `npm.cmd run lint` passes.
- Confirmed `npm.cmd run build` passes.
- Confirmed `npm.cmd audit --audit-level=moderate` reports 0 vulnerabilities.

### Milestone 12.7

Planned checks:

- Confirm Guesser cannot reveal cards.
- Confirm non-Guessers can reveal only their own card.
- Confirm Stop / Bank ends the round and applies scoring once.
- Confirm Truth Teller selection wipes Guesser temporary points.
- Confirm all-Bluffers-found awards +1 bonus.
- Confirm unguessed Bluffers and Truth Teller receive the correct points.
- Confirm refresh does not reapply scoring.

Completed checks:

- Added Milestone 12.7 manual scoring and reveal-owner tests to `docs/TEST_PLAN.md`.
- Confirmed `npm.cmd run lint` passes.
- Confirmed `npm.cmd run build` passes.
- Confirmed `npm.cmd audit --audit-level=moderate` reports 0 vulnerabilities.

### Milestone 13

Planned checks:

- Confirm private-MVP Firestore rules are documented.
- Confirm `firestore.rules` keeps unrelated collections closed and deletes disabled.
- Confirm `.env.example` lists every required Firebase web config key.
- Confirm README and deployment guide include beginner-ready Firebase and Vercel setup steps.
- Confirm lint, build, and audit pass.

Completed checks:

- Added Milestone 13 documentation and deployment checks to `docs/TEST_PLAN.md`.
- Confirmed README links remain intact and setup flow is current.
- Confirmed deployment guide covers Firebase, Firestore rules, GitHub, Vercel, environment variables, friend testing, and common errors.
- Confirmed `npm.cmd run lint` passes.
- Confirmed `npm.cmd run build` passes.
- Confirmed `npm.cmd audit --audit-level=moderate` reports 0 vulnerabilities.

### Milestone 14

Planned checks:

- Build a final manual QA checklist that covers the complete MVP acceptance flow.
- Include local validation commands.
- Include create room, join room, lobby realtime, minimum player validation, start game, role visibility, answer submission, transition to guessing, correct guess, wrong guess, all Bluffers guessed, Stop / Bank, result reveal, next round, refresh, rejoin/presence, desktop viewports, mobile sanity, and Vercel behavior.
- Confirm docs can be used without chat history.

Completed checks:

- Added the final end-to-end QA checklist to `docs/TEST_PLAN.md`.
- Added Milestone 14 checkpoint commands and expected results.
- Confirmed final checklist includes Vercel deployment behavior and final acceptance criteria.
- Confirmed `npm.cmd run lint` passes.
- Confirmed `npm.cmd run build` passes.
- Confirmed `npm.cmd audit --audit-level=moderate` reports 0 vulnerabilities.

## Open Questions

- None.

## Last Updated Milestone

Milestone 14
