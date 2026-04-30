# MAIN_AGENT

Last updated milestone: Milestone 18.3

## Responsibility

- Acts as project lead.
- Owns the full roadmap.
- Decides milestone scope.
- Delegates responsibilities to documented sub-agents.
- Prevents scope creep.
- Ensures no future milestone is implemented early.
- Updates `docs/DEVELOPMENT_CHECKLIST.md`.
- Gives the final milestone summary to the user.

## Current Decisions

- Milestone 18.3 is implemented and awaiting audio behavior and lobby copy-button review.
- Milestone 18.3 is scoped to UI sound-effect independence and cleaner lobby copy controls.
- Do not change deployment configuration unless needed.
- Do not commit, push, or deploy Milestone 18.3 until the user explicitly approves.
- The project root is `E:\sounds-fishy-project`.
- Existing files must be preserved and inspected before updates.
- Multi-agent workflow is simulated through markdown files, not real parallel agents.
- Documentation is the source of truth for plans and decisions.
- Chat summaries should stay short after docs exist.

## Constraints

- Do not start a future milestone without user confirmation.
- Do not implement app code during Milestone 0.
- Do not delete or overwrite user files without approval.
- Keep architecture simple and milestone-focused.
- Use free-tier services only.

## Milestone Notes

### Milestone 0

Relevant agents:

- MAIN_AGENT.
- ARCHITECT_AGENT.
- GAME_LOGIC_AGENT.
- FIREBASE_AGENT.
- UI_UX_AGENT.
- QA_AGENT.
- DEPLOYMENT_AGENT.

Completed:

- Verified workspace path.
- Created documentation directory structure.
- Created project planning docs.
- Created agent docs.
- Created README.

### Milestone 1

Relevant agents:

- MAIN_AGENT.
- ARCHITECT_AGENT.
- UI_UX_AGENT.
- QA_AGENT.

Planned scope:

- Base Next.js, TypeScript, Tailwind setup.
- Simple home page only.
- No Firebase logic.
- Update README and checklist.
- Verify dependency install and production build.

Not in scope:

- Firebase config.
- Player identity helpers.
- Room creation or joining.
- Game components.

Completed:

- Added base Next.js App Router project files.
- Added package scripts.
- Verified lint, build, audit, and local dev-server smoke test.
- Updated README, checklist, test plan, and active agent docs.

### Milestone 2

Relevant agents:

- MAIN_AGENT.
- ARCHITECT_AGENT.
- GAME_LOGIC_AGENT.
- QA_AGENT.

Planned scope:

- Add `lib/types.ts`.
- Add `lib/player.ts`.
- Add `lib/questions.ts` with at least 30 questions.
- Add `lib/gameLogic.ts` with pure helper functions.
- Verify build and lint.

Not in scope:

- Firebase configuration.
- Firestore room service.
- UI wiring for create or join room.

Completed:

- Added the required foundational `lib/` files.
- Confirmed question deck has 32 questions.
- Verified lint and build.
- Confirmed Firebase was not introduced.

### Milestone 3

Relevant agents:

- MAIN_AGENT.
- ARCHITECT_AGENT.
- FIREBASE_AGENT.
- DEPLOYMENT_AGENT.
- QA_AGENT.

Planned scope:

- Install Firebase package.
- Add `lib/firebase.ts`.
- Add `.env.example`.
- Add initial `firestore.rules`.
- Update Firebase setup documentation.
- Verify lint and build.

Not in scope:

- Firestore room service.
- Realtime listeners.
- Create or join room UI.
- Game flow.

Completed:

- Installed Firebase.
- Added build-safe Firebase config helpers.
- Added `.env.example`.
- Added initial Firestore rules.
- Updated setup docs.
- Verified lint, build, audit, and missing-env build safety.

### Milestone 4

Relevant agents:

- MAIN_AGENT.
- ARCHITECT_AGENT.
- UI_UX_AGENT.
- QA_AGENT.

Planned scope:

- Add `components/HomeForm.tsx`.
- Wire the home page to display-name and room-code form UI.
- Use localStorage display-name helpers.
- Normalize room code input to uppercase.
- Show validation for empty display name.
- Keep create/join actions as placeholders until Milestone 5.

Not in scope:

- Firestore create or join room.
- Room route.
- Realtime lobby.

Completed:

- Added `HomeForm`.
- Wired it into the home page.
- Added localStorage display-name persistence.
- Added room-code normalization and validation.
- Kept create/join as placeholders.
- Verified lint, build, and dev-server smoke test.

### Milestone 5

Relevant agents:

- MAIN_AGENT.
- ARCHITECT_AGENT.
- FIREBASE_AGENT.
- GAME_LOGIC_AGENT.
- QA_AGENT.

Planned scope:

- Add `lib/roomService.ts`.
- Implement `createRoom(playerName)`.
- Implement `joinRoom(roomCode, playerName)`.
- Create room and player documents in Firestore.
- Preserve existing player score when rejoining.
- Wire HomeForm actions to services.
- Redirect to `/room/[roomCode]` after success.

Not in scope:

- Realtime room listeners.
- Room page UI.
- Lobby player list.
- Start game.

Completed:

- Added room service basics.
- Wired home create/join actions to Firestore.
- Redirected successful actions to `/room/[roomCode]`.
- Added a lightweight route landing shell only to receive redirects.
- Verified lint, build, and smoke checks.

### Milestone 6

Relevant agents:

- MAIN_AGENT.
- ARCHITECT_AGENT.
- FIREBASE_AGENT.
- UI_UX_AGENT.
- QA_AGENT.

Planned scope:

- Replace the room placeholder with `GameRoom`.
- Add realtime room and players listeners.
- Add lobby UI, player list, loading state, and error state.
- Show room code and copy action.
- Show host-only Start Game button.
- Disable Start Game with fewer than 4 players.

Not in scope:

- Implementing `startGame`.
- Role assignment.
- Answering or guessing screens.

Completed:

- Replaced the room placeholder with realtime lobby rendering.
- Added required lobby components.
- Added room and player listeners.
- Kept Start Game disabled for Milestone 7.
- Verified lint, build, and smoke checks.

### Milestone 7

Relevant agents:

- MAIN_AGENT.
- ARCHITECT_AGENT.
- FIREBASE_AGENT.
- GAME_LOGIC_AGENT.
- UI_UX_AGENT.
- QA_AGENT.

Planned scope:

- Implement `startGame(roomCode)`.
- Require at least 4 players.
- Assign first Guesser by joined order.
- Assign one random Truth Teller who is not the Guesser.
- Assign remaining players as Bluffers.
- Select first question.
- Move room status to `answering`.
- Reset per-round player answer state.
- Add initial `AnswerPhase`.

Not in scope:

- Answer submission.
- Automatic transition to guessing.
- Guessing phase.

Completed:

- Implemented host Start Game.
- Added first-round role assignment and question selection.
- Added initial AnswerPhase.
- Kept answer submission for Milestone 8.
- Verified lint, build, audit, and smoke checks.

### Milestone 8

Relevant agents:

- MAIN_AGENT.
- ARCHITECT_AGENT.
- FIREBASE_AGENT.
- GAME_LOGIC_AGENT.
- UI_UX_AGENT.
- QA_AGENT.

Planned scope:

- Implement `submitAnswer(roomCode, playerId, answer)`.
- Let Truth Teller submit the correct answer.
- Let Bluffers submit fake answers.
- Show Guesser waiting/submission status.
- Automatically move room status to `guessing` after all non-guessers submit.

Not in scope:

- Guessing UI.
- Guess player mutation.
- Scoring.

Completed:

- Implemented answer submission.
- Completed role-aware answering UI.
- Added automatic transition to `guessing`.
- Kept guessing UI and scoring for later milestones.
- Verified lint, build, audit, and smoke checks.

### Milestone 9

Relevant agents:

- MAIN_AGENT.
- ARCHITECT_AGENT.
- FIREBASE_AGENT.
- GAME_LOGIC_AGENT.
- UI_UX_AGENT.
- QA_AGENT.

Planned scope:

- Add `components/GuessingPhase.tsx`.
- Implement `guessPlayer(roomCode, guessedPlayerId)`.
- Let only the Guesser select submitted answers.
- Hide roles during guessing.
- Award +1 for each Bluffer guessed.
- Mark guessed Bluffers as eliminated.
- End the round when the Truth Teller is selected.
- Award a bonus and end the round when all Bluffers are found.

Not in scope:

- Result reveal UI.
- Scoreboard component extraction.
- Next round behavior.

Completed:

- Added the guessing phase UI.
- Added the guessing transaction and MVP scoring.
- Wired the `guessing` status into `GameRoom`.
- Updated QA steps and checklist.
- Verified lint, build, audit, and local HTTP smoke checks.

### Milestone 10

Relevant agents:

- MAIN_AGENT.
- ARCHITECT_AGENT.
- UI_UX_AGENT.
- GAME_LOGIC_AGENT.
- QA_AGENT.

Planned scope:

- Add `components/ResultPhase.tsx`.
- Add `components/Scoreboard.tsx`.
- Reveal question, correct answer, Guesser, Truth Teller, roles, submitted answers, scores, and eliminated state.
- Show a host-only Next Round button as a disabled placeholder.

Not in scope:

- Implementing `startNextRound`.
- Firestore writes.
- Changing scoring rules.

Completed:

- Added the result reveal screen.
- Added the reusable scoreboard component.
- Wired the `result` status into `GameRoom`.
- Updated QA steps and checklist.
- Verified lint, build, audit, and local HTTP smoke checks.

### Milestone 11

Relevant agents:

- MAIN_AGENT.
- ARCHITECT_AGENT.
- FIREBASE_AGENT.
- GAME_LOGIC_AGENT.
- QA_AGENT.

Planned scope:

- Implement `startNextRound(roomCode)`.
- Rotate the Guesser by joined order.
- Assign a new Truth Teller who is not the Guesser.
- Pick the next question, avoiding the same question when possible.
- Increment the round number.
- Reset per-round answer, submission, guessed, and elimination state.
- Wire the host-only Next Round button.

Not in scope:

- Broad UX polish.
- Back to Home actions.
- Firestore security-rule changes.

Completed:

- Added next-round service behavior.
- Wired the host Next Round button.
- Preserved score state while resetting round state.
- Updated QA steps and checklist.
- Verified lint, build, audit, and local HTTP smoke checks.

### Milestone 12

Relevant agents:

- MAIN_AGENT.
- ARCHITECT_AGENT.
- UI_UX_AGENT.
- FIREBASE_AGENT.
- QA_AGENT.

Planned scope:

- Improve desktop and laptop polish for current screens.
- Add simple Back to Home actions where useful.
- Add copy room link support in the lobby.
- Improve phase and role clarity.
- Improve missing-player and friendly error messaging.
- Add basic protection against duplicate Start Game attempts.

Not in scope:

- New gameplay features.
- Timers, chat, avatars, accounts, or admin tools.
- Firestore security-rule overhaul.

Completed:

- Added scoped UX polish to current screens.
- Added Back to Home actions and room link copy.
- Improved role, phase, and missing-player clarity.
- Strengthened Start Game duplicate-click resilience.
- Updated QA steps and checklist.
- Verified lint, build, audit, and local HTTP smoke checks.

### Milestone 12.5

Relevant agents:

- MAIN_AGENT.
- ARCHITECT_AGENT.
- FIREBASE_AGENT.
- UI_UX_AGENT.
- GAME_LOGIC_AGENT.
- QA_AGENT.

Planned scope:

- Add player `lastSeenAt`.
- Improve rejoin by player ID and display-name fallback.
- Prevent brand-new players from joining after game start.
- Add basic Online/Away presence.
- Keep disconnected players in the room.

Completed:

- Implemented rejoin and presence.
- Updated schema, technical spec, game rules, test plan, checklist, README, and active agent docs.
- Verified lint, build, and audit.

### Milestone 12.5 Scoped Revert

Completed:

- Removed the same-browser same-room different-display-name block.
- Allowed saved player ID rejoin to update the existing player's display name and presence.
- Kept display-name fallback limited to cases where local player ID is missing or not found.
- Kept Milestone 13 out of scope.
- Verified lint, build, and audit.

### Milestone 12.6

Relevant agents:

- MAIN_AGENT.
- ARCHITECT_AGENT.
- FIREBASE_AGENT.
- GAME_LOGIC_AGENT.
- UI_UX_AGENT.
- QA_AGENT.

Planned scope:

- Add reveal-one-by-one guessing.
- Add `revealedPlayerIds` to room state.
- Add a reveal service function.
- Keep roles hidden during guessing.
- Keep ResultPhase as the full reveal.
- Do not start Milestone 13.

Completed:

- Implemented reveal-one-by-one guessing.
- Updated room schema, service functions, and GuessingPhase.
- Updated docs and active agent notes.
- Verified lint, build, and audit.

### Milestone 12.7

Relevant agents:

- MAIN_AGENT.
- ARCHITECT_AGENT.
- FIREBASE_AGENT.
- GAME_LOGIC_AGENT.
- UI_UX_AGENT.
- QA_AGENT.

Planned scope:

- Change reveal flow so answer owners reveal their own cards.
- Add Stop / Bank for the Guesser.
- Replace immediate guess scoring with final round scoring.
- Add round-end state for scoring clarity and duplicate protection.
- Do not start Milestone 13.

Completed:

- Implemented owner reveal, Stop / Bank, round-end reasons, and final scoring.
- Updated GuessingPhase and ResultPhase.
- Updated docs and active agent notes.
- Verified lint, build, and audit.

### Milestone 13

Relevant agents:

- MAIN_AGENT.
- FIREBASE_AGENT.
- DEPLOYMENT_AGENT.
- QA_AGENT.

Planned scope:

- Improve private-MVP Firestore rules.
- Make deployment documentation beginner-complete.
- Clarify Firebase and Vercel environment variable setup.
- Keep gameplay and app behavior unchanged.

Completed:

- Updated `firestore.rules` with private-MVP comments.
- Simplified the final rules after testing so unauthenticated room/player reads, lists, creates, and updates work under `rooms`.
- Expanded README and deployment guide setup steps.
- Confirmed `.env.example` has all required Firebase web config keys.
- Updated checklist, test plan, schema/spec notes, and active agent docs.
- Verified lint, build, and audit.

### Milestone 14

Relevant agents:

- MAIN_AGENT.
- QA_AGENT.
- DEPLOYMENT_AGENT.
- FIREBASE_AGENT.

Planned scope:

- Add the final manual QA checklist.
- Cover the complete MVP acceptance flow.
- Align docs with the private-MVP Firestore rules hotfix.
- Do not add new features.

Completed:

- Expanded `docs/TEST_PLAN.md` with the final end-to-end QA checklist.
- Updated `docs/DEVELOPMENT_CHECKLIST.md` with completed final checklist coverage.
- Updated README status.
- Updated active agent docs.
- Verified lint, build, and audit.

### Milestone 15

Relevant agents:

- MAIN_AGENT.
- ARCHITECT_AGENT.
- GAME_LOGIC_AGENT.
- FIREBASE_AGENT.
- UI_UX_AGENT.
- QA_AGENT.

Planned scope:

- Add per-room random unused question selection.
- Add host-only Skip Question during answering.
- Expand question deck to at least 120 questions.
- Add last activity and archive lifecycle fields.
- Add host-only archive/end room flow and archived room screen.
- Update docs and validation.

Completed:

- Added Milestone 15 without changing deployment configuration.
- Implemented random unused question selection and per-room deck tracking.
- Added host-only Skip Question for the answering phase.
- Expanded the local question deck to 120 questions.
- Added host-only room archive/end behavior and archived-room UI.
- Updated the relevant source-of-truth docs and agent notes.
- Verified lint, build, and audit.
- Stopping after Milestone 15 for manual testing confirmation.

### Milestone 16

Relevant agents:

- MAIN_AGENT.
- ARCHITECT_AGENT.
- GAME_LOGIC_AGENT.
- QA_AGENT.

Planned scope:

- Replace the generic trivia deck with exactly 150 bizarre fun-fact bluffing questions.
- Create `docs/QUESTION_RESEARCH.md`.
- Keep the deck local in `lib/questions.ts`.
- Do not change deployment configuration.
- Do not commit, push, or deploy.

Completed:

- Updated `lib/questions.ts` to exactly 150 English bizarre fun-fact questions.
- Added per-question research notes, categories, source titles, confidence, and excluded myths.
- Updated the project docs and active agent notes.
- Verified lint, build, audit, and deck integrity checks.

### Milestone 17

Relevant agents:

- MAIN_AGENT.
- ARCHITECT_AGENT.
- GAME_LOGIC_AGENT.
- UI_UX_AGENT.
- QA_AGENT.

Planned scope:

- Localize the approved 150-question deck into natural Thai.
- Keep IDs sequential from `q1` through `q150`.
- Keep the existing `Question` type and local `lib/questions.ts` storage.
- Preserve English source and confidence information in `docs/QUESTION_RESEARCH.md`.
- Do not change game logic, scoring, room lifecycle, deployment configuration, commit, push, or deploy.

Completed:

- Updated `lib/questions.ts` to 150 Thai-localized playable questions and answers.
- Added a Thai Localization Ledger to `docs/QUESTION_RESEARCH.md`.
- Updated README, rules, spec, test plan, checklist, and active agent docs.
- Verified lint, build, audit, and deck integrity checks.

### Milestone 18

Relevant agents:

- MAIN_AGENT.
- ARCHITECT_AGENT.
- UI_UX_AGENT.
- QA_AGENT.

Planned scope:

- Add an original playful fish/ocean visual identity.
- Polish home, lobby, answering, guessing, result, archived room, player list, scoreboard, cards, buttons, badges, and phase indicators.
- Add optional instrumental background music through browser-generated Web Audio.
- Persist music mute and volume preferences.
- Do not change gameplay logic, scoring, Firestore schema, question deck, deployment configuration, commit, push, or deploy.

Completed:

- Added reusable theme/audio components.
- Updated global typography and shared theme styling.
- Applied the visual theme across existing screens.
- Added optional bottom-right music controls.
- Updated README, technical spec, test plan, checklist, and active agent docs.
- Verified lint, build, and audit.

### Milestone 18.1

Relevant agents:

- MAIN_AGENT.
- ARCHITECT_AGENT.
- UI_UX_AGENT.
- QA_AGENT.

Planned scope:

- Fix manual-review visual issues from Milestone 18.
- Ensure decorations cannot create layout scroll before content.
- Strengthen home form, cards, buttons, panels, hidden cards, and music control styling.
- Improve playful Thai-supported typography.
- Keep the change UI-only.

Completed:

- Constrained background fish/waves/bubbles to non-layout fixed/behind-content decoration.
- Tightened home first-viewport layout.
- Restyled form inputs, buttons, game cards, hidden cards, and the music control.
- Updated README, technical spec, test plan, checklist, and active agent docs.
- Verified lint, build, and audit.

### Milestone 18.2

Relevant agents:

- MAIN_AGENT.
- ARCHITECT_AGENT.
- UI_UX_AGENT.
- QA_AGENT.

Planned scope:

- Fix final visual/audio review issues.
- Redesign bottom decoration.
- Default music visually to On while respecting saved preferences and autoplay restrictions.
- Add subtle procedural UI sound effects.
- Replace `window.confirm` with themed confirmation modals.
- Remove visible MVP labels.
- Keep gameplay, schema, scoring, lifecycle, deck, deployment, commit, push, and deploy out of scope.

Completed:

- Updated bottom decoration, audio control behavior, sound effects, modals, lobby centering, and UI labels.
- Updated README, technical spec, test plan, checklist, and active agent docs.
- Verified lint, build, and audit.

### Milestone 18.3

Relevant agents:

- MAIN_AGENT.
- ARCHITECT_AGENT.
- UI_UX_AGENT.
- QA_AGENT.

Planned scope:

- Make UI sound effects independent from the Music On/Off background music toggle.
- Keep Music On/Off scoped to background music.
- Shorten and stabilize Lobby copy button labels.
- Keep gameplay, schema, scoring, lifecycle, deck, deployment, commit, push, and deploy out of scope.

Completed:

- Split background music and UI effect gain paths.
- Updated lobby copy button text and copied status.
- Updated README, technical spec, test plan, checklist, and active agent docs.
- Verified lint, build, and audit.

Not in scope:

- Changing deployment configuration unless required.
- Adding authentication, cleanup automation, timers, chat, or admin tools.

## Open Questions

- None.

## Last Updated Milestone

Milestone 18.3
