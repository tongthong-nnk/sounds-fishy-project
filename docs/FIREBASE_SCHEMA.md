# Firebase Schema

Last updated milestone: Milestone 14

## Firestore Collections

```text
rooms/{roomCode}
rooms/{roomCode}/players/{playerId}
```

The room document stores shared game state. The players subcollection stores each player and per-round player state.

Milestone 5 writes these documents through `lib/roomService.ts`:

- `createRoom(playerName)` creates a room document and host player document in one batch.
- `joinRoom(roomCode, playerName)` verifies the room exists, then creates or updates the current player's document.
- Existing player scores are preserved when the same browser/player ID rejoins.

Milestone 6 reads these documents through realtime listeners in `lib/roomService.ts`:

- `listenToRoom(roomCode, callback)` listens to `rooms/{roomCode}`.
- `listenToPlayers(roomCode, callback)` listens to `rooms/{roomCode}/players`.

Milestone 7 updates these documents through `startGame(roomCode)`:

- Room status changes from `lobby` to `answering`.
- Room round fields are populated for round 1.
- Player roles are set to `guesser`, `truth`, or `bluffer`.
- Player per-round answer state is reset.

Milestone 8 updates these documents through `submitAnswer(roomCode, playerId, answer)`:

- The submitting non-Guesser player's `submittedAnswer` is set.
- The submitting non-Guesser player's `hasSubmitted` becomes `true`.
- The room `updatedAt` field changes.
- The room status changes to `guessing` once all non-guessers have submitted.
- The room `revealedPlayerIds` field resets to `[]` when the room enters `guessing`.

Milestone 12.6 adds reveal-one-by-one guessing:

- Room documents include `revealedPlayerIds`.
- `revealPlayerAnswer(roomCode, playerIdToReveal)` adds one non-Guesser player ID to `revealedPlayerIds`.
- `guessPlayer(roomCode, guessedPlayerId)` requires the guessed player ID to already be in `revealedPlayerIds`.
- `startGame(roomCode)` and `startNextRound(roomCode)` reset `revealedPlayerIds` to `[]`.
- Older room documents without `revealedPlayerIds` are treated as `[]`.

Milestone 12.7 adjusts reveal ownership and scoring:

- Only the owner of a non-Guesser card can reveal their own answer.
- `roundEndReason` records why the round ended.
- `scoringApplied` prevents duplicate final scoring.
- Final scoring is applied once when the Guesser selects the Truth Teller, stops, or finds all Bluffers.
- Older room documents without `roundEndReason` or `scoringApplied` are treated as `null` and `false`.

Milestone 12.5 adds rejoin and presence behavior:

- Player documents include `lastSeenAt`.
- Room clients update the current player's `lastSeenAt` about every 20 seconds while inside a room.
- Existing players can rejoin by local player ID.
- If the local player ID already exists in the room, joining updates that player document's `name` and `lastSeenAt`.
- If the local player ID is missing or not found, joining falls back to a trimmed, case-insensitive display-name match.
- Brand-new players can join only while room status is `lobby`.
- Disconnected players are not deleted automatically.

## `rooms/{roomCode}` Fields

| Field | Type | Notes |
| --- | --- | --- |
| `roomCode` | string | Uppercase room code and document ID. |
| `hostId` | string | Player ID of the host. |
| `status` | `"lobby" | "answering" | "guessing" | "result"` | Current game phase. |
| `roundNumber` | number | Starts at 0 in lobby, 1 for first round. |
| `currentQuestionId` | string | Current question ID or empty string in lobby. |
| `question` | string | Current question text or empty string in lobby. |
| `correctAnswer` | string | Current correct answer or empty string in lobby. |
| `guesserId` | string | Current Guesser player ID or empty string in lobby. |
| `truthTellerId` | string | Current Truth Teller player ID or empty string in lobby. |
| `guessedPlayerIds` | string[] | Players already guessed this round. |
| `revealedPlayerIds` | string[] | Non-Guesser players whose submitted answers have been revealed during guessing. |
| `roundEndReason` | `"truth_selected" | "guesser_stopped" | "all_bluffers_found" | null` | Why the current round ended. |
| `scoringApplied` | boolean | Whether final round scoring has already been applied. |
| `createdAt` | timestamp | Server timestamp when room was created. |
| `updatedAt` | timestamp | Server timestamp when room was last changed. |

## `rooms/{roomCode}/players/{playerId}` Fields

| Field | Type | Notes |
| --- | --- | --- |
| `playerId` | string | localStorage-backed player ID and document ID. |
| `name` | string | Display name. |
| `isHost` | boolean | Whether this player created the room. |
| `score` | number | Total score across rounds. |
| `role` | `"guesser" | "truth" | "bluffer" | null` | Current round role. |
| `submittedAnswer` | string | Current round answer. Empty until submitted. |
| `hasSubmitted` | boolean | Whether this player submitted this round. |
| `isEliminated` | boolean | Whether this player has been guessed as a Bluffer. |
| `joinedAt` | timestamp | Server timestamp when player first joined. |
| `lastSeenAt` | timestamp | Server timestamp from the most recent presence heartbeat or join/rejoin. |

## Example Room Document

```json
{
  "roomCode": "FISH42",
  "hostId": "player_abc123",
  "status": "answering",
  "roundNumber": 1,
  "currentQuestionId": "q7",
  "question": "What food was once used as currency by ancient civilizations?",
  "correctAnswer": "Cacao beans",
  "guesserId": "player_abc123",
  "truthTellerId": "player_def456",
  "guessedPlayerIds": [],
  "revealedPlayerIds": [],
  "roundEndReason": null,
  "scoringApplied": false,
  "createdAt": "serverTimestamp",
  "updatedAt": "serverTimestamp"
}
```

## Example Player Document

```json
{
  "playerId": "player_def456",
  "name": "Sam",
  "isHost": false,
  "score": 0,
  "role": "truth",
  "submittedAnswer": "Cacao beans",
  "hasSubmitted": true,
  "isEliminated": false,
  "joinedAt": "serverTimestamp",
  "lastSeenAt": "serverTimestamp"
}
```

## Indexes

No custom Firestore indexes are expected for MVP.

Players are read by subcollection listener and sorted client-side by `joinedAt` unless a later milestone chooses a simple ordered query.

## Realtime Listeners

Required listeners:

- Room document listener for `rooms/{roomCode}`.
- Players subcollection listener for `rooms/{roomCode}/players`.

Listeners are owned by `lib/roomService.ts`.

## Write Strategy

Use Firestore writes only on user actions or phase transitions:

- Create room.
- Join room.
- Start game.
- Submit answer.
- Reveal player answer.
- Guess player.
- Stop or bank Guesser points.
- Start next round.

Presence is the one scoped interval write:

- A known player in `/room/[roomCode]` updates their own `lastSeenAt` about every 20 seconds.
- The app does not write every second.
- Online/Away display is derived client-side from whether `lastSeenAt` is within 45 seconds.
- Player documents are not removed when a user is away.

Use `writeBatch` or `runTransaction` when multiple documents must update together.

## Security Rules Notes

MVP rules should support a private friend-group deployment, not a public production-grade app.

Milestone 13 rules were simplified after a permission-denied join test:

- Allow unauthenticated reads, lists, creates, and updates under the `rooms` tree.
- Keep joins, player fallback lookup, realtime player listing, transactions, and presence heartbeats working without auth.
- Avoid exposing unrelated database paths.
- Include comments explaining the private MVP tradeoff.
- Clarify that real authentication would be required for public use.
- Disable deletes for room and player documents for now.

Because this MVP intentionally has no auth, Firestore rules cannot strongly prove user identity.
