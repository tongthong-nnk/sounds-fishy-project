# FIREBASE_AGENT

Last updated milestone: Milestone 14

## Responsibility

- Owns Firestore schema.
- Owns realtime listeners.
- Owns transactions and batched writes.
- Owns Firebase config.
- Owns `firestore.rules`.
- Ensures writes only happen on user actions or phase transitions.
- Ensures Firestore schema matches `docs/FIREBASE_SCHEMA.md`.

## Current Decisions

- Firestore is the realtime source of truth.
- Room documents live at `rooms/{roomCode}`.
- Player documents live at `rooms/{roomCode}/players/{playerId}`.
- Listen to the room document and players subcollection with `onSnapshot`.
- Use `writeBatch` or `runTransaction` for multi-document updates.
- No custom indexes are expected for MVP.

## Constraints

- No writes on timers or intervals.
- No real authentication in MVP.
- Firestore rules should be honest about private-MVP tradeoffs.
- Do not expose real secret keys.
- Firebase browser config belongs in `NEXT_PUBLIC_*` environment variables.
- Firebase initialization should be lazy and fail only when Firebase is actually requested.
- Current private-MVP rules allow unauthenticated room/player reads, lists, creates, and updates under `rooms`.
- Current private-MVP rules block deletes and close unrelated collections.
- Rules still do not prove real host or player identity because the app has no authentication.

## Milestone Notes

### Milestone 0

Documented Firestore schema, write strategy, and security-rule notes.

### Milestone 3

Completed:

- Install Firebase browser SDK.
- Add `lib/firebase.ts`.
- Read config from `NEXT_PUBLIC_FIREBASE_*` environment variables.
- Add `.env.example`.
- Add initial private-MVP Firestore rules.
- Do not create Firestore room service yet.
- Confirm build passes without `.env.local`.

### Milestone 5

Completed:

- Implement room creation with a batch write.
- Implement join room with room existence validation.
- Use `rooms/{roomCode}` and `rooms/{roomCode}/players/{playerId}` exactly as documented.
- Use server timestamps for created/updated/joined fields.
- Avoid realtime listeners until Milestone 6.
- Preserve existing player state when rejoining with the same player ID.

### Milestone 6

Completed:

- Implement `listenToRoom(roomCode, callback)`.
- Implement `listenToPlayers(roomCode, callback)`.
- Keep listeners read-only and unsubscribe cleanly from UI.
- Do not add start-game writes until Milestone 7.

### Milestone 7

Completed:

- Implement Start Game as a Firestore batch after validating room and player state.
- Update room and player documents together.
- Ensure writes happen only on host button click.
- Do not add answer submit writes until Milestone 8.

### Milestone 8

Completed:

- Implement answer submission as a transaction.
- Validate room status is `answering`.
- Validate player is not Guesser.
- Update submitted answer and `hasSubmitted`.
- Transition room to `guessing` when all non-guessers have submitted.

### Milestone 9

Planned scope:

- Implement `guessPlayer(roomCode, guessedPlayerId)` as a Firestore transaction.
- Validate room status is `guessing`.
- Read player documents inside the transaction before scoring.
- Update guessed player elimination, room guessed IDs, room status, and Guesser score consistently.
- Keep writes limited to Guesser actions and phase transitions.

Completed:

- `guessPlayer` uses `runTransaction`.
- The current browser must match the room Guesser.
- Bluffer guesses update player elimination, Guesser score, room guessed IDs, and room status together.
- Truth Teller guesses update room guessed IDs and move the room to `result`.
- Duplicate guesses and invalid phase guesses are rejected with friendly errors.

### Milestone 11

Planned scope:

- Implement `startNextRound(roomCode)` as a transaction.
- Validate the room exists and is in `result`.
- Validate the current browser belongs to the host.
- Read room and players before updating.
- Update room round fields and all player round-state fields together.
- Preserve player scores.

Completed:

- Implemented `startNextRound(roomCode)` with `runTransaction`.
- Validates room exists, status is `result`, and current browser is the host.
- Updates room status, round number, question, Guesser, Truth Teller, and guessed IDs together.
- Updates player roles and round-state fields together.
- Does not modify player scores.

### Milestone 12

Planned scope:

- Strengthen Start Game against duplicate clicks by using a transaction.
- Keep writes tied to user actions only.
- Preserve the existing Firestore schema.
- Do not change Firestore security rules in this milestone.

Completed:

- Converted `startGame(roomCode)` to `runTransaction`.
- Duplicate starts now re-check room status inside the transaction.
- Existing room and player schema is unchanged.
- Firestore rules were left for Milestone 13.

### Milestone 12.5

Planned scope:

- Add `lastSeenAt` to player documents.
- Update `joinRoom` rejoin behavior.
- Add a 20-second presence heartbeat for known room players.
- Reject brand-new joins after `lobby`.
- Do not delete away players.

Completed:

- Player documents now write and read `lastSeenAt`.
- `joinRoom` checks existing local player ID first.
- `joinRoom` falls back to trimmed, case-insensitive display-name match.
- New player creation is blocked once room status is not `lobby`.
- `updatePlayerPresence` updates `lastSeenAt` only for the known current player.

Scoped revert:

- If local player ID already exists in the room, `joinRoom` updates that player document's `name` and `lastSeenAt`.
- No same-browser different-display-name block remains.
- Display-name fallback still runs only when the local player ID is missing or not found in the room.

### Milestone 12.6

Planned scope:

- Add `revealedPlayerIds` to room documents.
- Reset `revealedPlayerIds` on start game, answering-to-guessing transition, and next round.
- Add `revealPlayerAnswer(roomCode, playerIdToReveal)`.
- Require revealed player IDs before `guessPlayer` can score a guess.

Completed:

- `toRoom` treats missing `revealedPlayerIds` as `[]` for old rooms.
- Room writes initialize and reset `revealedPlayerIds`.
- `revealPlayerAnswer` uses a transaction for reveal writes.
- `guessPlayer` now rejects unrevealed player IDs.

### Milestone 12.7

Planned scope:

- Change reveal authorization to answer owner only.
- Add `roundEndReason` and `scoringApplied`.
- Apply final scoring exactly once in round-ending transactions.
- Add `stopGuessing(roomCode)`.

Completed:

- `revealPlayerAnswer` now rejects Guesser reveals and non-owner reveals.
- `guessPlayer` applies final scoring only when Truth Teller is selected or all Bluffers are found.
- `stopGuessing` ends the round and banks Guesser points.
- `scoringApplied` guards against duplicate final scoring.
- Missing `roundEndReason` and `scoringApplied` read as `null` and `false`.

### Milestone 13

Planned scope:

- Improve `firestore.rules` for a private MVP.
- Keep rules honest about no-auth limitations.
- Avoid changing Firestore game schema or service behavior.

Completed:

- Added private-MVP comments.
- Initially tried simple room/player path validation.
- After testing, removed path validation because it caused permission errors during unauthenticated joins/player listing.
- Final rules are permissive under `rooms` for read/list/create/update.
- Kept room and player deletes disabled.
- Kept unrelated collections closed.
- Added explicit comments that these rules are not public-production security.
- Left Firestore service code unchanged.

### Milestone 14

Planned scope:

- Align Firebase docs with the post-Milestone 13 rules hotfix.
- Keep schema and service behavior unchanged.
- Ensure final QA covers rules publishing and deployed room flow.

Completed:

- Updated final QA to require current rules publishing before local/deployed checks.
- Updated schema/spec/deployment notes to describe permissive private-MVP rules under `rooms`.
- Confirmed no Firestore service changes were needed.

## Open Questions

- None.

## Last Updated Milestone

Milestone 14
