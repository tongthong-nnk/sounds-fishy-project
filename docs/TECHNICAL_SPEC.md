# Technical Spec

Last updated milestone: Milestone 14

## Tech Stack

- Next.js App Router.
- TypeScript.
- Tailwind CSS.
- Firebase Firestore.
- localStorage-based player identity.
- Vercel deployment.
- No real authentication.
- No backend API unless a future milestone proves it necessary.

## Current Implementation Status

Milestone 1 has initialized the base project:

- Root-level App Router files exist under `app/`.
- TypeScript is configured with strict checking.
- Tailwind CSS is wired through PostCSS.
- ESLint is configured with Next.js flat config exports.
- Package scripts exist for `dev`, `build`, and `lint`.
- `lib/types.ts`, `lib/player.ts`, `lib/questions.ts`, and `lib/gameLogic.ts` exist.
- `lib/firebase.ts` exists and lazily initializes Firebase only when requested.
- `.env.example` and initial `firestore.rules` exist.
- `lib/roomService.ts` exists with room creation and joining.
- Home page UI is wired to local display-name persistence.
- Home page create/join actions are wired to Firestore and redirect to `/room/[roomCode]`.
- Realtime room and player listeners exist.
- Room page renders a realtime lobby for `lobby` status.
- Host can start a game from the lobby when at least 4 players are present.
- Room page renders an initial answering screen for `answering` status.
- Truth Teller and Bluffers can submit answers during `answering`.
- Room automatically moves to `guessing` after all non-guessers submit.
- Owner-revealed guessing, final round scoring, Stop/Bank, result reveal, next round, polish, rejoin, and presence are implemented through Milestone 12.7.

## Architecture

The app should remain simple:

- React components render UI and call service functions from user actions.
- Firestore is the realtime source of truth.
- localStorage stores only client identity values such as player ID and saved display name.
- Pure game calculations stay in `lib/gameLogic.ts`.
- Firestore reads, writes, listeners, transactions, and batches stay in `lib/roomService.ts`.
- Firebase app initialization stays in `lib/firebase.ts`.
- Shared TypeScript types stay in `lib/types.ts`.

## Route Structure

Required routes:

- `/`
  - Home page with display name, create room, and join room UI.
- `/room/[roomCode]`
  - Room page that renders lobby and game phases based on realtime Firestore state.

## Required File Structure

```text
app/
  page.tsx
  room/
    [roomCode]/
      page.tsx
  globals.css

components/
  HomeForm.tsx
  GameRoom.tsx
  Lobby.tsx
  AnswerPhase.tsx
  GuessingPhase.tsx
  ResultPhase.tsx
  PlayerList.tsx
  Scoreboard.tsx
  LoadingState.tsx
  ErrorState.tsx

lib/
  firebase.ts
  types.ts
  questions.ts
  player.ts
  presence.ts
  gameLogic.ts
  roomService.ts

docs/
  PROJECT_PLAN.md
  TECHNICAL_SPEC.md
  GAME_RULES.md
  FIREBASE_SCHEMA.md
  DEVELOPMENT_CHECKLIST.md
  TEST_PLAN.md
  DEPLOYMENT_GUIDE.md
  agents/
    MAIN_AGENT.md
    ARCHITECT_AGENT.md
    GAME_LOGIC_AGENT.md
    FIREBASE_AGENT.md
    UI_UX_AGENT.md
    QA_AGENT.md
    DEPLOYMENT_AGENT.md

.env.example
firestore.rules
README.md
```

## TypeScript Types

Required shared types:

- `GameStatus`
- `PlayerRole`
- `Question`
- `Player`
- `Room`

`Player` includes `lastSeenAt` for basic presence.

Expected status values:

- `lobby`
- `answering`
- `guessing`
- `result`

Expected role values:

- `guesser`
- `truth`
- `bluffer`
- `null`

## Core Helper Functions

### `lib/player.ts`

- `getOrCreatePlayerId()`
- `getSavedPlayerId()`
- `savePlayerId(playerId)`
- `getSavedPlayerName()`
- `savePlayerName(name)`

### `lib/presence.ts`

- `ONLINE_WINDOW_MS`
- `isPlayerOnline(player, now?)`
- `getPlayerPresenceLabel(player, now?)`

### `lib/gameLogic.ts`

- `generateRoomCode()`
- `getNextQuestion(roundNumber, previousQuestionId?)`
- `getNextGuesser(players, currentGuesserId?)`
- `assignRoles(players, guesserId)`
- `areAllNonGuessersSubmitted(players, guesserId)`
- `getActiveBluffers(players)`
- `areAllBluffersEliminated(players)`
- `sortPlayersByJoinedAt(players)`

### `lib/roomService.ts`

- `createRoom(playerName)`
- `joinRoom(roomCode, playerName)`
- `listenToRoom(roomCode, callback)`
- `listenToPlayers(roomCode, callback)`
- `startGame(roomCode)`
- `submitAnswer(roomCode, playerId, answer)`
- `guessPlayer(roomCode, guessedPlayerId)`
- `revealPlayerAnswer(roomCode, playerIdToReveal)`
- `stopGuessing(roomCode)`
- `startNextRound(roomCode)`
- `updatePlayerPresence(roomCode, playerId)`

## Data Flow

1. Home page stores display name in localStorage.
2. Create or join action calls `roomService.ts`.
3. `roomService.ts` writes room and player documents to Firestore.
4. Room page subscribes to room and player documents with `onSnapshot`.
5. UI renders based on `room.status`.
6. User actions call service functions.
7. Service functions perform Firestore writes, transactions, or batches.
8. Firestore listeners update all clients in realtime.

## Rejoin Strategy

- localStorage `playerId` is the primary identity.
- `joinRoom(roomCode, playerName)` first checks whether the current local player ID already exists in the room.
- If that player document exists, the user is treated as the same player; `name` and `lastSeenAt` are updated from the join form.
- If local player ID is missing or not found, the service searches existing room players by trimmed, case-insensitive display name.
- If a display-name match exists, that existing player ID is saved into localStorage and `lastSeenAt` is updated.
- If no existing player ID or display-name match exists, a new player may join only while the room status is `lobby`.
- Brand-new joins are rejected after the game starts with a friendly message.
- No authentication, accounts, or passwords are added.

## Realtime Update Strategy

- Use `onSnapshot` for room document changes.
- Use `onSnapshot` for players subcollection changes.
- Do not write to Firestore on frequent intervals.
- Presence is updated with a scoped heartbeat about every 20 seconds for known room players.
- Online/Away display uses a 45-second `lastSeenAt` threshold.
- Do not remove disconnected players automatically.
- Write only on user actions or phase transitions.
- Use transactions or batches for multi-document state changes:
  - Starting game.
  - Submitting answer with possible phase transition.
  - Revealing a submitted answer.
  - Guessing player with score and status updates.
  - Stopping and banking Guesser points.
  - Starting next round.

## Reveal-One-By-One Guessing Strategy

- `Room.revealedPlayerIds` stores non-Guesser player IDs whose answers are visible during guessing.
- When all non-guessers submit, room status moves to `guessing` and `revealedPlayerIds` is set to `[]`.
- `GuessingPhase` renders every non-Guesser card, but hides submitted answer text until that player ID is revealed.
- Each non-Guesser reveals only their own hidden card through `revealPlayerAnswer(roomCode, playerIdToReveal)`.
- The Guesser cannot reveal cards and must ask players to reveal in the live voice chat flow.
- Non-guessers can see which cards are hidden, revealed, or guessed, but role labels stay hidden during guessing.
- `guessPlayer(roomCode, guessedPlayerId)` allows guesses only for revealed player IDs.
- Result phase remains the full reveal and shows all roles and answers.
- `startNextRound(roomCode)` resets `revealedPlayerIds` to `[]` with the rest of the round state.

## Round Scoring Strategy

- Permanent score changes happen only when the round ends.
- `roundEndReason` is one of `truth_selected`, `guesser_stopped`, `all_bluffers_found`, or `null`.
- `scoringApplied` is checked inside the round-ending transaction so duplicate clicks, refreshes, or retries do not award points twice.
- Guesser temporary points are derived from guessed Bluffers in `guessedPlayerIds`.
- If all Bluffers are found, the Guesser gets one point per Bluffer plus a +1 bonus.
- If the Guesser selects the Truth Teller, the Guesser gets +0 for the round.
- If the Guesser stops, the Guesser banks one point per guessed Bluffer.
- Unguessed Bluffers score one point per entry in `guessedPlayerIds` when the round ends by Truth Teller or Stop.
- Truth Teller scores only when selected, equal to the number of uncaught Bluffers.
- `revealedPlayerIds` never affects scoring; it only controls answer visibility.

## Desktop-First Layout Strategy

Primary target viewports:

- 1366x768.
- 1440x900.
- 1920x1080.

Layout guidance:

- Use horizontal space for side panels on desktop.
- Keep the current question, phase, role, player list, and score visible.
- Avoid excessive vertical scrolling during the core game loop.
- Keep buttons large and readable.
- Use rounded cards and clear spacing.
- Keep mobile usable with stacked layouts.

## Agent Ownership Boundaries

- `MAIN_AGENT` controls milestone scope and checklist updates.
- `ARCHITECT_AGENT` keeps code organization simple and enforces file boundaries.
- `GAME_LOGIC_AGENT` owns pure game behavior in `gameLogic.ts`.
- `FIREBASE_AGENT` owns Firestore behavior in `roomService.ts`, `firebase.ts`, and `firestore.rules`.
- `UI_UX_AGENT` owns component layout and readability.
- `QA_AGENT` owns test checkpoints and manual QA coverage.
- `DEPLOYMENT_AGENT` owns README setup, Firebase setup, and Vercel deployment docs.

## Deployment And Rules Strategy

- Deploy the Next.js app on the Vercel free tier.
- Use Firebase Firestore as the only realtime backend.
- Store Firebase browser config in `.env.local` locally and Vercel Project Settings in deployment.
- Keep `.env.local` out of source control.
- Publish the root `firestore.rules` file manually through Firebase Console for this private MVP.
- The rules allow unauthenticated reads, lists, creates, and updates under the `rooms` tree and close unrelated collections.
- The rules intentionally avoid room-code/player-ID validation because over-tight path checks blocked current join/list behavior.
- The rules block deletes but do not enforce real host/player identity because the MVP has no authentication.
- A public version would need real auth and stricter per-action/per-field validation.

## Implementation Constraints

- Do not implement future milestones early.
- Avoid unnecessary libraries.
- Avoid unnecessary abstraction.
- Avoid `any`.
- Keep components mostly presentational.
- Keep Firestore secrets out of source code.
- Use only normal Firebase `NEXT_PUBLIC_*` browser config values.
