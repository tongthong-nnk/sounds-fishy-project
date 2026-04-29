# Game Rules

Last updated milestone: Milestone 16

## Minimum Player Rule

The game requires at least 4 players before the host can start.

With 4 players:

- 1 Guesser.
- 1 Truth Teller.
- 2 Bluffers.

## Game Statuses

- `lobby`: Players are joining and waiting for the host.
- `answering`: Non-guessers submit answers.
- `guessing`: Guesser reviews submitted answers and selects players.
- `result`: Roles, answers, and scores are revealed.
- `archived`: Host ended the room; final scores remain visible and gameplay actions stop.

## Player Roles

### Guesser

- Sees the question.
- Does not submit an answer.
- Does not see the correct answer during answering or guessing.
- During guessing, asks non-guessers to explain and reveal their own answers.
- Can guess only after revealing that player's answer.
- Can stop and bank current temporary points.
- Scores points for correct Bluffer guesses.

### Truth Teller

- Sees the question and correct answer.
- Submits the correct answer.
- Reveals their own submitted answer during guessing when asked.
- If selected by the Guesser, the round ends immediately.

### Bluffer

- Sees the question but not the correct answer.
- Submits a believable fake answer.
- Reveals their own submitted answer during guessing when asked.
- If selected by the Guesser, becomes eliminated for the round.

## Round Flow

1. Host starts the game from the lobby.
2. The app chooses a random unused question for that room.
3. The app assigns:
   - One Guesser.
   - One Truth Teller.
   - All remaining players as Bluffers.
4. Status changes to `answering`.
5. Truth Teller submits the correct answer.
6. Bluffers submit fake answers.
7. Guesser waits while non-guessers submit.
8. When all non-guessers submit, status changes to `guessing`.
9. All non-Guesser answer cards start hidden without roles.
10. Guesser asks a player to explain their answer.
11. Revealed cards show submitted answers, but roles remain hidden.
12. The owner of that card clicks Reveal My Answer.
13. Guesser chooses a revealed player or stops and banks points.
14. If the player is a Bluffer:
    - The Bluffer is eliminated.
    - Guesser has +1 temporary point.
    - If all Bluffers are eliminated, Guesser keeps temporary points, gets +1 bonus, and the round ends.
    - Otherwise guessing continues.
15. If the player is the Truth Teller:
    - The Guesser loses all temporary points for the round.
    - The round ends immediately.
16. If the Guesser stops:
    - Guesser keeps temporary points from caught Bluffers.
    - No all-Bluffers bonus is awarded unless all Bluffers were already caught.
17. Status changes to `result`.
18. Results reveal roles, answers, scores, and why points were awarded.
19. Host starts the next round.
20. Guesser rotates by joined order.
21. Host can end/archive the room when the group is done.

Milestone 8 implements answer submission for steps 5 through 8. The guessing UI starts in Milestone 9.

## Question Deck Rules

- The deck contains exactly 150 English bizarre fun-fact questions.
- Questions are designed to be weird, party-friendly, and easy to bluff.
- The deck emphasizes strange history, animals, food oddities, festivals, records, science, geography, language, pop culture, sports, and games.
- Source and confidence notes live in `docs/QUESTION_RESEARCH.md`.
- Each room tracks `usedQuestionIds`.
- Starting a game picks a random question that has not been used in that room.
- Starting the next round picks another random unused question.
- Questions are no longer selected by round number.
- If every question has been used, the room deck resets and starts a new used-question list with the selected question.
- Existing older rooms without `usedQuestionIds` treat the field as `[]`.

## Skip Question Rules

- Only the host can skip.
- Skip is allowed only during `answering`.
- Skip is not available during `guessing`, `result`, or `archived`.
- Skipping picks a new random unused question.
- The skipped question remains consumed so it does not immediately return while unused questions remain.
- If the deck is exhausted during skip, the deck resets and avoids immediately selecting the skipped question when possible.
- Skip keeps the same round number, Guesser, Truth Teller, and Bluffers.
- Skip clears submitted answers and submission flags for non-guessers.
- Skip keeps scores unchanged.

## Room Lifecycle Rules

- Each room tracks `lastActivityAt` for important room actions.
- Host can end/archive a room.
- Archiving sets status to `archived` and records `archivedAt`.
- Archived rooms are not deleted.
- Archived room screens show a room-ended message, final scoreboard, and Back to Home.
- Gameplay actions are not allowed after a room is archived.

## Scoring

MVP scoring:

- Guesser gets +1 temporary point for each correctly guessed Bluffer.
- If Guesser catches all Bluffers before selecting the Truth Teller, Guesser keeps temporary points and gets +1 bonus.
- If Guesser selects the Truth Teller, Guesser gets +0 for the round.
- If Guesser stops, Guesser keeps temporary points from caught Bluffers.
- Guessed Bluffers get +0.
- Unguessed Bluffers get +1 point for each player in `guessedPlayerIds` when the round ends by Truth Teller or Stop.
- Truth Teller gets points only if selected, equal to the number of uncaught Bluffers.
- Revealed cards do not affect scoring.
- No other scoring rules are included in MVP.

## Round Transition Rules

- Game can start only from `lobby`.
- Brand-new players can join only during `lobby`.
- Existing players can rejoin after the game starts by player ID or same display-name fallback.
- Answer submission is accepted only during `answering`.
- Answer reveals are accepted only during `guessing` and only by the owner of that answer.
- Guessing is accepted only during `guessing`.
- A player can be guessed only after their answer is revealed.
- Stop/Bank is accepted only during `guessing` and only by the Guesser.
- Skip Question is accepted only during `answering` and only by the host.
- Next round can start only from `result`.
- Archive Room can be used only by the host.
- Scores persist between rounds.
- Submitted answers, revealed answer IDs, guessed IDs, eliminated flags, round end reason, scoring flag, and roles reset each round.
- Guesser rotates each round based on joined order.

## Edge Cases

- Fewer than 4 players: host cannot start the game.
- Missing room: show a friendly error.
- Invalid room code: show a friendly error.
- Player not in room: show a friendly error or prompt to rejoin.
- New player tries to join after start: reject with "This game has already started. Only existing players can rejoin."
- Same browser/player ID rejoins: keep the same player and update display name plus presence.
- Missing or changed local player ID with same display name: rejoin the existing player by trimmed, case-insensitive name match.
- Disconnected player: keep the game state unchanged and allow the player to return.
- Disconnected players are not removed automatically.
- Duplicate answer submit: allow resubmission only while status is `answering`.
- Duplicate reveal: return a friendly error.
- Guesser reveal attempt: return a friendly error.
- Unrevealed guess: return a friendly error or keep the guess action disabled.
- Duplicate guess or already eliminated player: ignore or return a friendly error.
- Duplicate round-ending action: final scoring is applied only once.
- Guesser cannot guess themselves.
- Guesser cannot reveal themselves.
- Truth Teller cannot be the Guesser.
- If all Bluffers are eliminated, the round ends with the bonus.
- Refresh should preserve the current player identity through localStorage.
- Missing `usedQuestionIds`, `lastActivityAt`, or `archivedAt` on older rooms should not break gameplay.
- Used question deck exhaustion should reset the deck safely.

## Non-MVP Rules

Not included:

- Timers.
- Chat.
- Alternative scoring.
- Team modes.
- Custom question packs.
- Public matchmaking.
