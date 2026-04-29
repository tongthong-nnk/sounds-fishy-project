# ARCHITECT_AGENT

Last updated milestone: Milestone 16

## Responsibility

- Owns project structure.
- Owns file boundaries.
- Owns TypeScript type organization.
- Keeps architecture simple.
- Prevents unnecessary abstraction.
- Ensures Firestore logic stays in `roomService.ts`.
- Ensures pure logic stays in `gameLogic.ts`.
- Ensures UI components stay mostly presentational.

## Current Decisions

- Use the required project structure from the prompt.
- Use root-level `app/` to match the requested structure.
- Use root-level config files for Next.js, TypeScript, Tailwind, PostCSS, and ESLint.
- Keep shared types in `lib/types.ts`.
- Keep question data in `lib/questions.ts`.
- Keep localStorage player helpers in `lib/player.ts`.
- Keep Firebase app initialization in `lib/firebase.ts`.
- Keep all Firestore reads and writes in `lib/roomService.ts`.
- Keep question deck selection pure in `lib/gameLogic.ts`.
- Keep archived-room display isolated in a focused component.

## Constraints

- No backend API unless absolutely necessary.
- Avoid large abstractions before the MVP needs them.
- Avoid unnecessary libraries.
- Avoid `any`.
- Do not move logic into UI components if it belongs in `lib/`.

## Milestone Notes

### Milestone 0

Documented architecture boundaries and required file layout.

### Milestone 1

Completed:

- Add base Next.js App Router files.
- Add TypeScript configuration.
- Add Tailwind CSS setup.
- Add package scripts: `dev`, `build`, and `lint`.
- Avoid Firebase and game logic until later milestones.
- Added root-level `app/`, `next.config.ts`, `tsconfig.json`, `postcss.config.mjs`, and `eslint.config.mjs`.
- Kept the requested root `app/` structure instead of using `src/`.

### Milestone 2

Completed:

- Create root-level `lib/` folder.
- Keep shared data shapes in `lib/types.ts`.
- Keep browser identity helpers in `lib/player.ts`.
- Keep question data in `lib/questions.ts`.
- Keep pure game calculations in `lib/gameLogic.ts`.
- Avoid importing Firebase or React into these files.
- No component code was changed for this milestone.

### Milestone 3

Completed:

- Add `lib/firebase.ts` as the only Firebase initialization boundary.
- Keep Firestore room operations out of this milestone.
- Ensure Firebase initialization is lazy so missing environment variables do not crash static builds.
- Keep environment examples at the project root.
- No UI or room service code was added.

### Milestone 4

Completed:

- Create root-level `components/` folder.
- Add `HomeForm.tsx` as a client component because it uses localStorage and form state.
- Keep `app/page.tsx` as a simple route component that composes the form.
- Do not add Firestore calls or route navigation until Milestone 5.
- Used a named export for `HomeForm`.
- Kept browser storage behavior in `lib/player.ts`.

### Milestone 5

Completed:

- Add `lib/roomService.ts` for Firestore mutations.
- Keep room code validation and service-level errors in the service layer.
- Keep HomeForm responsible for form state, pending state, and navigation only.
- Do not add realtime listener functions until Milestone 6.
- Added a minimal `/room/[roomCode]` route shell so redirects resolve without implementing lobby behavior.

### Milestone 6

Completed:

- Replace the placeholder room route with a `GameRoom` client component.
- Add presentational lobby, player list, loading, and error components.
- Keep listener wiring in `GameRoom`.
- Keep Firestore listener functions in `roomService.ts`.
- Do not add phase components until their milestones.

### Milestone 7

Completed:

- Add `startGame(roomCode)` to `roomService.ts`.
- Add `components/AnswerPhase.tsx`.
- Keep `AnswerPhase` presentational and role-aware.
- Extend `GameRoom` phase routing for `answering`.
- Do not add submission state mutations yet.

### Milestone 8

Completed:

- Add `submitAnswer` to `roomService.ts`.
- Keep Firestore mutation logic out of `AnswerPhase`.
- Keep `AnswerPhase` focused on form state and role-aware display.
- Do not add `GuessingPhase` until Milestone 9.

### Milestone 9

Planned scope:

- Add `components/GuessingPhase.tsx` as a client component.
- Keep guessing Firestore writes inside `lib/roomService.ts`.
- Reuse pure Bluffer-elimination helper from `lib/gameLogic.ts`.
- Extend `GameRoom` phase routing for `guessing`.
- Keep result rendering out of this milestone.

Completed:

- `GuessingPhase` owns guessing screen state and display only.
- `guessPlayer` lives in `roomService.ts`.
- `areAllBluffersEliminated` remains pure in `gameLogic.ts`.
- `GameRoom` routes `guessing` without changing unrelated phase boundaries.

### Milestone 10

Planned scope:

- Add `ResultPhase` as a presentational result screen.
- Add `Scoreboard` as a reusable presentational component.
- Route `result` status in `GameRoom`.
- Avoid Firestore service changes.
- Keep Next Round unwired until Milestone 11.

Completed:

- `ResultPhase` renders the result UI without service writes.
- `Scoreboard` is reusable and receives plain player data.
- `GameRoom` now handles `result` explicitly.
- No Firestore service changes were made.

### Milestone 11

Planned scope:

- Add `startNextRound` to `roomService.ts`.
- Keep next-round mutation logic out of UI components.
- Add an async host action prop to `ResultPhase`.
- Keep `GameRoom` as the phase/action wiring boundary.
- Avoid new abstractions unless duplication becomes materially harmful.

Completed:

- Added `startNextRound` in `roomService.ts`.
- Kept next-round Firestore behavior out of `ResultPhase`.
- Added `onStartNextRound` prop to `ResultPhase`.
- Kept `GameRoom` responsible for passing the room-scoped action.

### Milestone 12

Planned scope:

- Keep polish changes localized to existing components.
- Keep Firestore resilience changes inside `roomService.ts`.
- Avoid adding a broad layout abstraction.
- Use small helper functions only where they keep components readable.

Completed:

- Localized UI polish to existing phase components.
- Kept Start Game transaction resilience inside `roomService.ts`.
- Reused the existing `Scoreboard` component in guessing.
- Avoided adding a new app-level layout abstraction.

### Milestone 12.5

Planned scope:

- Keep rejoin and heartbeat writes in `roomService.ts`.
- Keep localStorage identity helpers in `player.ts`.
- Add a tiny pure presence helper for shared UI status logic.
- Avoid removing or reworking existing game flow.

Completed:

- Added `savePlayerId` and exported `createPlayerId` in `player.ts`.
- Added `lib/presence.ts` for shared Online/Away calculation.
- Added `updatePlayerPresence` to `roomService.ts`.
- Added heartbeat wiring in `GameRoom`.

Scoped revert:

- Removed same-browser different-display-name enforcement from `roomService.ts`.
- Kept HomeForm limited to displaying service errors without forcing local display-name rollback.

### Milestone 12.6

Planned scope:

- Add `revealedPlayerIds` to `Room` in `lib/types.ts`.
- Keep reveal and guess Firestore writes inside `roomService.ts`.
- Keep `GuessingPhase` responsible for UI state only.
- Avoid introducing a new gameplay abstraction.

Completed:

- Added `Room.revealedPlayerIds`.
- Added `revealPlayerAnswer` in `roomService.ts`.
- Passed reveal and guess actions through `GameRoom`.
- Kept ResultPhase unchanged because it already reveals all roles and answers.

### Milestone 12.7

Planned scope:

- Keep scoring and reveal authorization in `roomService.ts`.
- Keep UI components focused on actions and presentation.
- Add minimal shared room fields in `lib/types.ts`.
- Avoid adding a separate scoring module unless needed.

Completed:

- Added round-end fields to `Room`.
- Kept final scoring helper functions private to `roomService.ts`.
- Passed Stop / Bank through `GameRoom`.
- Kept ResultPhase scoring summary derived from existing room/player state.

### Milestone 15

Planned scope:

- Add lifecycle fields to shared `Room` type.
- Keep question-deck selection pure in `gameLogic.ts`.
- Keep skip/archive Firestore mutations inside `roomService.ts`.
- Keep UI controls in existing phase components where possible.
- Add a small archived-room component instead of folding archived UI into unrelated phases.

Completed:

- Added `usedQuestionIds`, `lastActivityAt`, and `archivedAt` to `Room`.
- Added `archived` to the shared game status type.
- Kept question selection pure in `gameLogic.ts`.
- Kept Firestore lifecycle actions in `roomService.ts`.
- Added small focused UI components for host archive actions and archived room display.

### Milestone 16

Planned scope:

- Keep the question deck as local TypeScript data in `lib/questions.ts`.
- Preserve the existing `Question` type.
- Add research documentation without moving deck data to Firestore.
- Do not change deployment configuration.

Completed:

- Kept the 150-question deck in `lib/questions.ts`.
- Added `docs/QUESTION_RESEARCH.md` as documentation only.
- No architecture or Firestore schema changes were required.

## Open Questions

- None.

## Last Updated Milestone

Milestone 16
