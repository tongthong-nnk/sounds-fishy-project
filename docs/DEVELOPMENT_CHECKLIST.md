# Development Checklist

Last updated milestone: Milestone 16

## Current Status

- Current milestone: Milestone 16 implemented; awaiting question-deck review.
- Next step: review the Milestone 16 samples and run the question deck validation checks in `docs/TEST_PLAN.md`.
- Rule: Do not commit, push, deploy, or consider the MVP ready for friends until user approval.

## Milestone Checklist

### Milestone 0: Workspace Verification, Documentation Setup, And Agent Setup

- [x] Verify current directory is `E:\sounds-fishy-project`.
- [x] Inspect folder before editing.
- [x] Preserve existing files if present.
- [x] Create `docs/`.
- [x] Create `docs/agents/`.
- [x] Create `docs/PROJECT_PLAN.md`.
- [x] Create `docs/TECHNICAL_SPEC.md`.
- [x] Create `docs/GAME_RULES.md`.
- [x] Create `docs/FIREBASE_SCHEMA.md`.
- [x] Create `docs/DEVELOPMENT_CHECKLIST.md`.
- [x] Create `docs/TEST_PLAN.md`.
- [x] Create `docs/DEPLOYMENT_GUIDE.md`.
- [x] Create all requested agent docs.
- [x] Create `README.md`.
- [x] Do not implement app features.

Completion criteria:

- All required documentation files exist.
- All required agent files exist.
- README links to the docs.
- Milestone roadmap is documented.
- No app code was implemented during Milestone 0.

### Milestone 1: Base Project Setup

- [x] MAIN_AGENT identifies relevant agents.
- [x] Relevant agent docs are updated with planned work.
- [x] Next.js App Router is set up.
- [x] TypeScript is set up.
- [x] Tailwind CSS is set up.
- [x] `app/globals.css` exists.
- [x] Simple `app/page.tsx` exists.
- [x] Basic layout exists if needed.
- [x] `dev`, `build`, and `lint` scripts exist.
- [x] Firebase logic is not added.
- [x] README current milestone status is updated.
- [x] Agent docs are updated at milestone end.
- [x] `npm run build` passes.

### Milestone 2: Types, Player Identity, And Questions

- [x] MAIN_AGENT identifies relevant agents.
- [x] Relevant agent docs are updated with planned work.
- [x] `lib/types.ts` exists.
- [x] `lib/player.ts` exists.
- [x] `lib/questions.ts` exists with at least 30 questions.
- [x] `lib/gameLogic.ts` exists.
- [x] Pure helper functions are implemented without Firebase calls.
- [x] No room creation is built yet.
- [x] `npm run build` passes.

### Milestone 3: Firebase Setup Layer

- [x] MAIN_AGENT identifies relevant agents.
- [x] Relevant agent docs are updated with planned work.
- [x] Firebase package is installed if needed.
- [x] `lib/firebase.ts` exists.
- [x] Firebase config reads `NEXT_PUBLIC_*` environment variables.
- [x] `.env.example` exists.
- [x] `firestore.rules` exists.
- [x] Firebase setup docs are updated.
- [x] No game flow is implemented yet.
- [x] `npm run build` passes without crashing when env vars are missing during static build.

### Milestone 4: Home Page UI And Local Player Name

- [x] MAIN_AGENT identifies relevant agents.
- [x] Relevant agent docs are updated with planned work.
- [x] `components/HomeForm.tsx` exists.
- [x] Display name input works.
- [x] Display name persists to localStorage.
- [x] Room code input normalizes uppercase.
- [x] Empty display name shows an error.
- [x] Create and Join buttons exist with placeholder or ready handlers.
- [x] Desktop layout works at 1366x768 and 1440x900.

### Milestone 5: Room Service Basics, Create Room, Join Room

- [x] MAIN_AGENT identifies relevant agents.
- [x] Relevant agent docs are updated with planned work.
- [x] `lib/roomService.ts` exists.
- [x] `createRoom(playerName)` works.
- [x] `joinRoom(roomCode, playerName)` works.
- [x] HomeForm calls room service functions.
- [x] Successful create/join redirects to `/room/[roomCode]`.
- [x] Firestore room and player documents are created.

### Milestone 6: Room Page And Realtime Lobby

- [x] MAIN_AGENT identifies relevant agents.
- [x] Relevant agent docs are updated with planned work.
- [x] `app/room/[roomCode]/page.tsx` exists.
- [x] `components/GameRoom.tsx` exists.
- [x] `components/Lobby.tsx` exists.
- [x] `components/PlayerList.tsx` exists.
- [x] `components/LoadingState.tsx` exists.
- [x] `components/ErrorState.tsx` exists.
- [x] `listenToRoom(roomCode, callback)` works.
- [x] `listenToPlayers(roomCode, callback)` works.
- [x] Lobby player list updates realtime.
- [x] Room code copy works.
- [x] Host-only Start Game button is shown.
- [x] Start Game is disabled with fewer than 4 players.

### Milestone 7: Start Game And Role Assignment

- [x] MAIN_AGENT identifies relevant agents.
- [x] Relevant agent docs are updated with planned work.
- [x] `startGame(roomCode)` works.
- [x] Game requires at least 4 players.
- [x] First guesser is selected by joined order.
- [x] Truth Teller is randomly selected and is not the Guesser.
- [x] Bluffers are assigned.
- [x] First question is selected.
- [x] Room status changes to `answering`.
- [x] `AnswerPhase` initially renders role-aware UI.
- [x] Only Truth Teller sees correct answer.

### Milestone 8: Answer Submission And Automatic Transition To Guessing

- [x] MAIN_AGENT identifies relevant agents.
- [x] Relevant agent docs are updated with planned work.
- [x] `submitAnswer(roomCode, playerId, answer)` works.
- [x] Truth Teller can submit correct answer.
- [x] Bluffers can submit fake answers.
- [x] Guesser sees waiting/submission status.
- [x] All non-guesser submissions move room to `guessing`.
- [x] Duplicate submissions are handled intentionally.

### Milestone 9: Guessing Phase

- [x] MAIN_AGENT identifies relevant agents.
- [x] Relevant agent docs are updated with planned work.
- [x] `components/GuessingPhase.tsx` exists.
- [x] `guessPlayer(roomCode, guessedPlayerId)` works.
- [x] Guesser can select players.
- [x] Roles are hidden during guessing.
- [x] Correct Bluffer guess adds +1.
- [x] Eliminated Bluffer is marked.
- [x] Truth Teller guess moves to result.
- [x] All Bluffers guessed adds a bonus and moves to result.

### Milestone 10: Result Phase And Scoreboard

- [x] MAIN_AGENT identifies relevant agents.
- [x] Relevant agent docs are updated with planned work.
- [x] `components/ResultPhase.tsx` exists.
- [x] `components/Scoreboard.tsx` exists.
- [x] Result screen reveals question, correct answer, roles, submitted answers, and scores.
- [x] Scoreboard sorts by score descending.
- [x] Host-only Next Round button is visible as placeholder.

### Milestone 11: Next Round

- [x] MAIN_AGENT identifies relevant agents.
- [x] Relevant agent docs are updated with planned work.
- [x] `startNextRound(roomCode)` works.
- [x] Guesser rotates by joined order.
- [x] New Truth Teller is assigned.
- [x] New question is selected.
- [x] Round number increments.
- [x] Scores persist.
- [x] Round state resets.
- [x] Host-only Next Round button is wired.

### Milestone 12: Polish, Resilience, And UX Cleanup

- [x] MAIN_AGENT identifies relevant agents.
- [x] Relevant agent docs are updated with planned work.
- [x] Desktop styling is improved.
- [x] 1366x768 layout is checked.
- [x] 1440x900 layout is checked.
- [x] 1920x1080 layout is checked.
- [x] Mobile sanity check passes.
- [x] Clear role badges exist.
- [x] Clear phase indicator exists.
- [x] Better loading and error states exist.
- [x] Missing room and missing player cases are handled.
- [x] Duplicate click protections are added where needed.
- [x] Back to Home action exists.

### Milestone 12.5: Rejoin And Presence

- [x] MAIN_AGENT identifies relevant agents.
- [x] Relevant agent docs are updated with planned work.
- [x] `lastSeenAt` exists on `Player` type.
- [x] `lastSeenAt` is written to Firestore player documents.
- [x] Existing player ID rejoin is handled first.
- [x] Same display name fallback rejoin is handled.
- [x] New players are rejected after the game starts.
- [x] Presence heartbeat updates `lastSeenAt` about every 20 seconds.
- [x] Online/Away is based on a 45-second threshold.
- [x] PlayerList shows Online/Away status.
- [x] Scoreboard shows Online/Away status.
- [x] Disconnected players are not removed automatically.
- [x] Same local player ID can rejoin the same room and update its display name.
- [x] Relevant docs are updated.
- [x] `npm.cmd run lint` passes.
- [x] `npm.cmd run build` passes.
- [x] `npm.cmd audit --audit-level=moderate` passes.

### Milestone 12.6: Reveal-One-By-One Guessing

- [x] MAIN_AGENT identifies relevant agents.
- [x] Relevant agent docs are updated with planned work.
- [x] `Room` type includes `revealedPlayerIds`.
- [x] Room documents initialize `revealedPlayerIds`.
- [x] Answering-to-guessing transition resets `revealedPlayerIds` to `[]`.
- [x] `startGame(roomCode)` resets `revealedPlayerIds`.
- [x] `startNextRound(roomCode)` resets `revealedPlayerIds`.
- [x] `revealPlayerAnswer(roomCode, playerIdToReveal)` exists.
- [x] Answer reveal is supported during `guessing`.
- [x] Guessing requires the player answer to be revealed first.
- [x] GuessingPhase starts cards hidden.
- [x] GuessingPhase shows revealed answers without revealing roles.
- [x] ResultPhase still reveals all roles and answers.
- [x] Relevant docs are updated.
- [x] `npm.cmd run lint` passes.
- [x] `npm.cmd run build` passes.
- [x] `npm.cmd audit --audit-level=moderate` passes.

### Milestone 12.7: Scoring Rules And Reveal Flow Adjustment

- [x] MAIN_AGENT identifies relevant agents.
- [x] Relevant agent docs are updated with planned work.
- [x] Reveal flow changes so card owners reveal their own answers.
- [x] Guesser cannot reveal answer cards.
- [x] Guesser can guess only revealed cards.
- [x] `roundEndReason` exists on room state.
- [x] `scoringApplied` exists on room state.
- [x] Final scoring applies exactly once.
- [x] Guesser scores temporary points and can Stop / Bank.
- [x] Truth Teller selection gives Guesser +0 for the round.
- [x] Bluffer and Truth Teller scoring follows the new rules.
- [x] ResultPhase explains round end reason and scoring.
- [x] Relevant docs are updated.
- [x] `npm.cmd run lint` passes.
- [x] `npm.cmd run build` passes.
- [x] `npm.cmd audit --audit-level=moderate` passes.

### Milestone 13: Firestore Rules And Deployment Documentation

- [x] MAIN_AGENT identifies relevant agents.
- [x] Relevant agent docs are updated with planned work.
- [x] `firestore.rules` is improved for private MVP.
- [x] Rules include private-MVP comments.
- [x] Deployment guide is complete.
- [x] README setup guide is complete.
- [x] `.env.example` is complete.
- [x] `npm.cmd run lint` passes.
- [x] `npm.cmd run build` passes.
- [x] `npm.cmd audit --audit-level=moderate` passes.

### Milestone 14: Final End-To-End Test Plan

- [x] MAIN_AGENT identifies relevant agents.
- [x] Relevant agent docs are updated with planned work.
- [x] Final manual QA checklist is complete.
- [x] Create room is covered.
- [x] Join room is covered.
- [x] Lobby realtime is covered.
- [x] Minimum player validation is covered.
- [x] Start game is covered.
- [x] Role visibility is covered.
- [x] Answer submission is covered.
- [x] Transition to guessing is covered.
- [x] Correct guess is covered.
- [x] Wrong guess is covered.
- [x] All Bluffers guessed is covered.
- [x] Stop / Bank is covered.
- [x] Result reveal is covered.
- [x] Next round is covered.
- [x] Refresh behavior is covered.
- [x] Rejoin and presence behavior is covered.
- [x] Desktop viewport behavior is covered.
- [x] Secondary mobile sanity check is covered.
- [x] Vercel deployment behavior is covered.
- [x] Final acceptance criteria are documented.
- [x] `npm.cmd run lint` passes.
- [x] `npm.cmd run build` passes.
- [x] `npm.cmd audit --audit-level=moderate` passes.

### Milestone 15: Question Deck Management And Room Lifecycle

- [x] MAIN_AGENT identifies relevant agents.
- [x] Relevant agent docs are updated with planned work.
- [x] `Room` type includes `usedQuestionIds`.
- [x] `Room` type includes `lastActivityAt`.
- [x] `Room` type includes nullable `archivedAt`.
- [x] `GameStatus` includes `archived`.
- [x] Question selection no longer uses `roundNumber` ordering.
- [x] New games select a random unused question.
- [x] Next rounds select a random unused question.
- [x] Exhausted room decks reset safely.
- [x] `lib/questions.ts` includes at least 120 questions.
- [x] `skipQuestion(roomCode)` exists.
- [x] Skip Question is host-only.
- [x] Skip Question is answering-only.
- [x] Skip Question keeps round number, roles, and scores unchanged.
- [x] Skip Question clears submitted answers and submission flags.
- [x] Skip Question resets guessed and revealed player IDs.
- [x] Host-only Skip Question UI exists in AnswerPhase.
- [x] `archiveRoom(roomCode)` exists.
- [x] Archive Room is host-only.
- [x] Archiving sets status to `archived` without deleting room or player documents.
- [x] Archived room screen shows final scoreboard and Back to Home.
- [x] `lastActivityAt` updates on major room actions.
- [x] Firestore rules still block deletes and unrelated collections.
- [x] Schema, technical spec, game rules, test plan, README, and agent docs are updated.
- [x] `npm.cmd run lint` passes.
- [x] `npm.cmd run build` passes.
- [x] `npm.cmd audit --audit-level=moderate` passes.

## Completed Milestone History

### Milestone 0

Completed documentation-first setup:

- Verified workspace path.
- Confirmed the folder had no existing files.
- Created required project docs.
- Created required agent docs.
- Created README.
- Did not implement app code.

### Milestone 1

Completed base project setup:

- Added Next.js App Router files at the project root.
- Added TypeScript, Tailwind CSS, PostCSS, and ESLint config.
- Added package scripts for `dev`, `build`, and `lint`.
- Installed dependencies and generated `package-lock.json`.
- Added a simple home page.
- Verified `npm.cmd run lint`, `npm.cmd run build`, `npm.cmd audit --audit-level=moderate`, and a local dev-server smoke test.
- Did not add Firebase, player identity, or game logic.

### Milestone 2

Completed foundational non-Firebase code:

- Added shared TypeScript types.
- Added browser-safe localStorage player identity helpers.
- Added 32 sample bluffing questions.
- Added pure game logic helpers for room codes, question selection, joined-order sorting, Guesser rotation, role assignment, submissions, and Bluffer elimination checks.
- Verified `npm.cmd run lint` and `npm.cmd run build`.
- Confirmed no Firebase or Firestore references were added.
- Did not add room creation, Firestore config, or UI wiring.

### Milestone 3

Completed Firebase setup layer:

- Installed Firebase browser SDK.
- Added lazy Firebase app and Firestore getters in `lib/firebase.ts`.
- Added `.env.example` with Firebase web config variables.
- Added initial private-MVP `firestore.rules`.
- Expanded Firebase setup documentation.
- Verified `npm.cmd run lint`, `npm.cmd run build`, `npm.cmd audit --audit-level=moderate`, and missing-env build safety.
- Did not add Firestore room services, realtime listeners, or UI wiring.

### Milestone 4

Completed home page UI and local player name:

- Added `components/HomeForm.tsx`.
- Updated `app/page.tsx` to render the home form.
- Display name saves to localStorage through `lib/player.ts`.
- Room code input normalizes to uppercase alphanumeric characters.
- Empty display name and missing join code show validation errors.
- Create Room and Join Room show placeholder feedback only.
- Verified `npm.cmd run lint`, `npm.cmd run build`, and a local dev-server smoke test.
- Did not add Firestore room creation, joining, or navigation.

### Milestone 5

Completed room service basics:

- Added `lib/roomService.ts`.
- Implemented `createRoom(playerName)` with unique room-code generation and a batch write for room plus host player documents.
- Implemented `joinRoom(roomCode, playerName)` with room existence validation and player document create/update behavior.
- Preserved existing player score and state when the same player rejoins.
- Wired `HomeForm` to call create/join services.
- Added a lightweight `/room/[roomCode]` landing shell so redirects resolve; realtime lobby remains Milestone 6.
- Verified `npm.cmd run lint`, `npm.cmd run build`, targeted service scans, and local HTTP smoke tests.

### Milestone 6

Completed realtime room lobby:

- Replaced the room placeholder with `GameRoom`.
- Added `Lobby`, `PlayerList`, `LoadingState`, and `ErrorState`.
- Implemented `listenToRoom(roomCode, callback)` and `listenToPlayers(roomCode, callback)` in `lib/roomService.ts`.
- Lobby shows room code, copy action, realtime players, host badge, and current player badge.
- Start Game is visible only to the host and disabled until Milestone 7.
- Missing rooms show a friendly error state.
- Verified `npm.cmd run lint`, `npm.cmd run build`, targeted listener scans, and local HTTP smoke tests.

### Milestone 7

Completed start game and role assignment:

- Added `startGame(roomCode)` to `lib/roomService.ts`.
- Start Game validates host, lobby status, and minimum player count.
- First Guesser is selected by joined order.
- One Truth Teller is selected from non-guessers.
- Remaining players become Bluffers.
- First question is selected and room status changes to `answering`.
- Per-round player answer state resets.
- Added `components/AnswerPhase.tsx`.
- Wired `GameRoom` to render `AnswerPhase` for `answering`.
- Wired host Start Game button in `Lobby`.
- Verified `npm.cmd run lint`, `npm.cmd run build`, `npm.cmd audit --audit-level=moderate`, targeted code scans, and local HTTP smoke tests.

### Milestone 8

Completed answer submission:

- Added `submitAnswer(roomCode, playerId, answer)` to `lib/roomService.ts`.
- Implemented submission with a Firestore transaction.
- Validates room status is `answering`.
- Prevents the Guesser from submitting.
- Lets Truth Teller submit the correct answer.
- Lets Bluffers submit fake answers.
- Allows non-guessers to update their answer while status remains `answering`.
- Moves room status to `guessing` once all non-guessers have submitted.
- Completed `AnswerPhase` answer form and realtime submission status.
- Verified `npm.cmd run lint`, `npm.cmd run build`, `npm.cmd audit --audit-level=moderate`, targeted code scans, and local HTTP smoke tests.

### Milestone 9

Completed guessing phase:

- Added `components/GuessingPhase.tsx`.
- Added `guessPlayer(roomCode, guessedPlayerId)` as a Firestore transaction.
- Wired `GameRoom` to render `GuessingPhase` for `guessing`.
- Guesser can select non-Guesser answer cards.
- Non-guessers see the same answer comparison view without active guess buttons.
- Roles remain hidden during guessing.
- Correct Bluffer guesses add +1 and mark the Bluffer eliminated.
- Guessing all Bluffers adds the all-Bluffers bonus and moves to `result`.
- Guessing the Truth Teller moves to `result`.
- Verified `npm.cmd run lint`, `npm.cmd run build`, `npm.cmd audit --audit-level=moderate`, and local HTTP smoke checks.

### Milestone 10

Completed result phase and scoreboard:

- Added `components\ResultPhase.tsx`.
- Added `components\Scoreboard.tsx`.
- Wired `GameRoom` to render `ResultPhase` when room status is `result`.
- Result screen reveals the question, correct answer, Guesser, Truth Teller, player roles, submitted answers, scores, and guessed/eliminated state.
- Scoreboard sorts by score descending.
- Host-only Next Round button is visible as a disabled placeholder.
- Verified `npm.cmd run lint`, `npm.cmd run build`, `npm.cmd audit --audit-level=moderate`, and local HTTP smoke checks.

### Milestone 11

Completed next round:

- Added `startNextRound(roomCode)` to `lib\roomService.ts`.
- Next Round is host-only and only valid from `result`.
- Next round rotates the Guesser by joined order.
- New roles are assigned for every player.
- New question is selected with previous-question avoidance.
- Round number increments.
- Scores persist.
- Submitted answers, submission flags, eliminated flags, and guessed player IDs reset.
- Wired the host Next Round button in `ResultPhase`.
- Verified `npm.cmd run lint`, `npm.cmd run build`, `npm.cmd audit --audit-level=moderate`, and local HTTP smoke checks.

### Milestone 12

Completed polish, resilience, and UX cleanup:

- Added Back to Home actions to lobby, answering, guessing, and result screens.
- Added lobby copy actions for both room code and room link.
- Improved room/round phase headers on active game screens.
- Improved current-role badges in answering and role badges in result reveal.
- Improved missing-player notices across active phases.
- Reused `Scoreboard` in the guessing side panel for consistency.
- Converted `startGame(roomCode)` to a transaction to guard against duplicate starts.
- Kept Firestore schema unchanged.
- Verified `npm.cmd run lint`, `npm.cmd run build`, `npm.cmd audit --audit-level=moderate`, and local HTTP smoke checks.

### Milestone 12.5

Completed rejoin and presence:

- Added `lastSeenAt` to player type and player documents.
- Added player ID saving support for display-name fallback rejoin.
- Updated `joinRoom(roomCode, playerName)` to rejoin by existing player ID first.
- Added trimmed, case-insensitive display-name fallback rejoin.
- Rejected brand-new joins once room status is not `lobby`.
- Added `updatePlayerPresence(roomCode, playerId)`.
- Added a room heartbeat in `GameRoom` that updates presence about every 20 seconds.
- Added `lib\presence.ts` with 45-second Online/Away logic.
- Added Online/Away badges to `PlayerList` and `Scoreboard`.
- Confirmed disconnected players remain in the room and are not auto-removed.
- Updated schema, technical spec, game rules, test plan, README, and relevant agent docs.
- Verified `npm.cmd run lint`, `npm.cmd run build`, and `npm.cmd audit --audit-level=moderate`.

### Milestone 12.5 Scoped Revert

Completed same-browser rejoin revert:

- Removed the blocking same-browser different-display-name restriction.
- Allowed a saved local player ID to rejoin the same room and update its display name.
- Removed the HomeForm behavior that forced the name field back to the previous saved name after join errors.
- Kept rejoin fallback, no-new-players-after-start behavior, heartbeat presence, Online/Away badges, and no automatic removal.
- Updated rejoin documentation and tests.
- Verified `npm.cmd run lint`, `npm.cmd run build`, and `npm.cmd audit --audit-level=moderate`.

### Milestone 12.6

Completed reveal-one-by-one guessing:

- Added `revealedPlayerIds` to room state.
- Reset revealed state when entering guessing and when starting a new round.
- Added `revealPlayerAnswer(roomCode, playerIdToReveal)`.
- Updated `guessPlayer(roomCode, guessedPlayerId)` to reject unrevealed guesses.
- Updated GuessingPhase so answer cards begin hidden and can be revealed one by one.
- Kept roles hidden during guessing and fully revealed in ResultPhase.
- Updated schema, technical spec, game rules, test plan, README, and relevant agent docs.
- Verified `npm.cmd run lint`, `npm.cmd run build`, and `npm.cmd audit --audit-level=moderate`.

### Milestone 12.7

Completed scoring and reveal-flow adjustment:

- Changed reveal flow so non-Guessers reveal their own answers.
- Added `roundEndReason` and `scoringApplied` to room state.
- Added Stop / Bank behavior for the Guesser.
- Changed guessing so permanent score is applied only when the round ends.
- Added final scoring for Guesser, Bluffers, and Truth Teller.
- Updated ResultPhase with round-end and scoring summary.
- Updated docs and active agent notes.
- Verified `npm.cmd run lint`, `npm.cmd run build`, and `npm.cmd audit --audit-level=moderate`.

### Milestone 13

Completed Firestore rules and deployment documentation:

- Improved `firestore.rules` with private-MVP comments.
- After testing, simplified rules to remain permissive under `rooms` so unauthenticated joins, player listing, transactions, and presence work reliably.
- Kept deletes blocked and unrelated collections closed.
- Expanded `.env.example` comments.
- Updated README with quick start, Firebase setup, validation, and Vercel deployment notes.
- Expanded `docs/DEPLOYMENT_GUIDE.md` into a beginner-friendly setup and deployment guide.
- Updated schema, technical spec, test plan, checklist, and active agent docs.
- Verified `npm.cmd run lint`, `npm.cmd run build`, and `npm.cmd audit --audit-level=moderate`.

### Milestone 14

Completed final end-to-end test plan:

- Expanded `docs/TEST_PLAN.md` with the final manual QA checklist.
- Covered create/join room, realtime lobby, minimum player validation, start game, role visibility, answer submission, guessing, scoring, result reveal, next round, refresh behavior, rejoin/presence, desktop viewports, mobile sanity, and Vercel deployment behavior.
- Aligned Firestore rules documentation with the post-Milestone 13 private-MVP rules hotfix.
- Updated README status and relevant agent docs.
- Verified `npm.cmd run lint`, `npm.cmd run build`, and `npm.cmd audit --audit-level=moderate`.

### Milestone 15

Completed question deck management and room lifecycle:

- Added per-room `usedQuestionIds` tracking.
- Replaced predictable round-number question selection with random unused question selection.
- Expanded the question deck to 120 questions.
- Added safe deck reset behavior after all questions are used.
- Added host-only Skip Question during answering.
- Kept skipped questions consumed and cleared current submitted answers when skipping.
- Added `lastActivityAt` updates for important room actions.
- Added host-only archive/end room behavior with no Firestore deletes.
- Added an archived room screen with final scoreboard and Back to Home.
- Updated schema, technical spec, game rules, test plan, README, and active agent docs.
- Verified `npm.cmd run lint`, `npm.cmd run build`, and `npm.cmd audit --audit-level=moderate`.

### Milestone 16

Completed question deck quality upgrade:

- Replaced the generic trivia-style deck with exactly 150 English bizarre fun-fact bluffing questions.
- Kept IDs sequential from `q1` through `q150`.
- Kept the existing `Question` type and local `lib\questions.ts` storage.
- Created `docs\QUESTION_RESEARCH.md` with category, answer, bluffing value, source title or URL, and confidence notes for every question.
- Included only high- and medium-confidence facts in the final deck.
- Documented excluded viral myths and low-confidence facts.
- Updated README, technical spec, game rules, test plan, checklist, and active agent docs.
- Verified `npm.cmd run lint`, `npm.cmd run build`, and `npm.cmd audit --audit-level=moderate`.
