# GAME_LOGIC_AGENT

Last updated milestone: Milestone 17

## Responsibility

- Owns game rules.
- Owns role assignment.
- Owns guesser rotation.
- Owns scoring.
- Owns round transitions.
- Owns game edge cases.
- Ensures implemented behavior matches `docs/GAME_RULES.md`.

## Current Decisions

- Minimum players: 4.
- Roles per round: 1 Guesser, 1 Truth Teller, remaining players Bluffers.
- First Guesser should be based on joined order.
- Guesser rotates by joined order in later rounds.
- Truth Teller must not be the Guesser.
- Bluffers see the correct answer during answering so they can craft stronger fake answers.
- Guesser still cannot see the correct answer during answering or guessing.
- MVP scoring now includes Guesser, Bluffer, and Truth Teller outcomes:
  - +1 temporary point for each Bluffer correctly guessed.
  - +1 bonus if all Bluffers are guessed before the Truth Teller.
- Selecting the Truth Teller ends the round immediately.
- Room questions are selected randomly from unused question IDs, not by round number.
- Host Skip Question keeps the same round number, roles, and scores.
- The final local deck target is exactly 150 Thai-localized bizarre fun-fact questions.
- Question research and confidence notes live in `docs/QUESTION_RESEARCH.md`.

## Constraints

- Do not add timers.
- Do not add extra scoring rules.
- Do not add non-MVP variants.
- Pure calculations belong in `lib/gameLogic.ts`.
- Firestore writes belong in `lib/roomService.ts`.

## Milestone Notes

### Milestone 0

Documented MVP game rules and edge cases.

### Milestone 2

Completed:

- Implement room code generation.
- Implement question selection.
- Implement joined-order sorting.
- Implement Guesser rotation.
- Implement role assignment.
- Implement submission and Bluffer elimination checks.
- Keep all helpers pure and independent from Firebase.
- Added 32 sample questions across the requested categories.

### Milestone 5

Completed:

- Reuse `generateRoomCode()` for room creation.
- No scoring, role assignment, or phase transition logic in this milestone.
- Confirm room creation starts in `lobby` with neutral round fields.
- Role and scoring helpers were not changed.

### Milestone 7

Completed:

- Use `getNextGuesser(players)` for the first round.
- Use `assignRoles(players, guesserId)` for role distribution.
- Use `getNextQuestion(1)` for the first question.
- Confirm Truth Teller is never the Guesser.
- Confirm all remaining players are Bluffers.

### Milestone 8

Completed:

- Use `areAllNonGuessersSubmitted(players, guesserId)` after applying the current submission.
- Preserve the rule that Guesser does not submit.
- Keep scoring and elimination untouched.

### Milestone 9

Planned scope:

- Apply MVP scoring in `guessPlayer`.
- Correct Bluffer guess gives the Guesser +1.
- Guessed Bluffers become eliminated.
- Selecting the Truth Teller moves the room to `result`.
- Guessing all Bluffers gives the Guesser a bonus and moves to `result`.
- Prevent invalid guesses against the Guesser or already guessed players.

Completed:

- Bluffer guesses award +1 and mark the player eliminated.
- Final Bluffer guess ends the round and applies the all-Bluffers bonus.
- Truth Teller guesses end the round immediately.
- Invalid guesses against the Guesser, guessed players, eliminated players, or non-active players are rejected.

### Milestone 10

Planned scope:

- Display the already-computed round result.
- Reveal roles exactly as assigned by the current room state.
- Show scores without changing them.
- Do not add new result scoring rules.

Completed:

- Revealed roles from current player documents.
- Revealed the correct answer from the room document.
- Displayed scores without changing scoring behavior.
- Added no new game rules.

### Milestone 12.5

Planned scope:

- Clarify that brand-new players cannot join after the game starts.
- Clarify that disconnected players remain in the game state.
- Do not add automated skips, removals, timers, or penalties.

Completed:

- Documented no-new-players-after-start behavior.
- Documented disconnected-player behavior in `docs/GAME_RULES.md`.
- No scoring or role-assignment rules changed.

Scoped revert:

- Clarified that saved-player-ID rejoin may update the existing player's display name.
- Removed the same-browser different-display-name restriction from game-rule notes.

### Milestone 12.6

Planned scope:

- Add reveal-before-guess rule.
- Keep MVP scoring unchanged.
- Keep roles hidden until ResultPhase.
- Reset revealed card state each round.

Completed:

- Guesser must reveal a non-Guesser answer before guessing that player.
- Revealing does not expose roles.
- Bluffer and Truth Teller scoring/end conditions are unchanged.
- ResultPhase remains the full reveal for all roles and answers.

### Milestone 12.7

Planned scope:

- Replace immediate permanent Guesser scoring with final round scoring.
- Add Stop / Bank.
- Add Bluffer and Truth Teller scoring.
- Keep scoring based on guessed players, not revealed players.

Completed:

- Guesser gets +0 if Truth Teller is selected.
- Guesser banks caught-Bluffer points when stopping.
- Guesser gets +1 bonus when all Bluffers are found.
- Unguessed Bluffers score by `guessedPlayerIds.length`.
- Truth Teller scores uncaught Bluffer count only when selected.

### Milestone 11

Planned scope:

- Rotate Guesser by joined order using the previous Guesser.
- Assign roles for the new round.
- Pick the next question, preferably not the previous question.
- Keep scores unchanged.
- Reset round-only player state.

Completed:

- Used `getNextGuesser(players, room.guesserId)` for rotation.
- Used `assignRoles(players, guesserId)` for the new round.
- Used `getNextQuestion(nextRoundNumber, room.currentQuestionId)` for question selection.
- Preserved scores and reset only round-specific player state.

### Milestone 15

Planned scope:

- Replace round-number question order with random unused question selection.
- Track per-room `usedQuestionIds`.
- Reset the room deck after all questions are used.
- Avoid immediately repeating the skipped question when possible.
- Keep Guesser, Truth Teller, Bluffers, scores, and round number unchanged when skipping.
- Expand the question pool to at least 120 suitable bluffing questions.

Completed:

- Replaced round-number question selection with `getNextQuestion(usedQuestionIds, avoidQuestionId)`.
- Added normalized used-question tracking and exhausted-deck reset behavior.
- Preserved current roles, score, and round number during Skip Question.
- Expanded the deck to 120 original bluff-friendly questions.

### Milestone 16

Planned scope:

- Replace weak or generic questions with bizarre fun-fact prompts.
- Keep IDs sequential from `q1` to `q150`.
- Keep answers concise and suitable for bluffing.
- Exclude low-confidence myths.
- Do not change game logic unless the new deck count requires it.

Completed:

- Replaced the deck with exactly 150 sourced English fun-fact prompts.
- Preserved the existing `Question` type and local `lib/questions.ts` structure.
- Created `docs/QUESTION_RESEARCH.md` to track category, source, confidence, and bluffing value.
- No game logic changes were required for the new deck count.

### Post-Milestone 16 Scoped Answer Visibility Adjustment

Completed:

- Updated answering rules so Bluffers can see the correct answer as context.
- Kept the Guesser unable to see the correct answer during answering or guessing.
- Kept scoring, reveal flow, room lifecycle, and question logic unchanged.
- Added a UI guard so Bluffers cannot submit the exact correct answer from the normal answer form.

### Milestone 17

Planned scope:

- Localize question and answer strings into natural Thai.
- Keep all facts, IDs, scoring, role assignment, and room transitions unchanged.
- Preserve the existing `Question` type.

Completed:

- Localized all 150 playable question and answer strings in `lib/questions.ts`.
- Kept IDs sequential from `q1` through `q150`.
- No pure game logic changes were required.

## Open Questions

- None.

## Last Updated Milestone

Milestone 17
