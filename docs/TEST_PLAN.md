# Test Plan

Last updated milestone: Milestone 18.3

## Local Test Plan

Each milestone ends with exact local test steps. General local workflow:

```powershell
cd E:\sounds-fishy-project
npm.cmd install
npm.cmd run dev
```

Build verification after code milestones:

```powershell
cd E:\sounds-fishy-project
npm.cmd run build
```

PowerShell note: this environment blocks the `npm.ps1` shim, so `npm.cmd` is the safest command form on Windows.

Milestone 0 has no app runtime yet. Its test plan is file and documentation verification only.

## Milestone 0 Checkpoint

Run:

```powershell
cd E:\sounds-fishy-project
Get-Location
Test-Path docs
Test-Path docs\agents
Test-Path README.md
Test-Path docs\DEVELOPMENT_CHECKLIST.md
Test-Path docs\agents\MAIN_AGENT.md
```

Expected:

- `Get-Location` shows `E:\sounds-fishy-project`.
- All `Test-Path` commands return `True`.
- `docs\DEVELOPMENT_CHECKLIST.md` lists all milestones.
- `docs\agents\MAIN_AGENT.md` documents the multi-agent workflow.

## Milestone 1 Checkpoint

Run:

```powershell
cd E:\sounds-fishy-project
npm.cmd install
npm.cmd run lint
npm.cmd run build
npm.cmd run dev
```

Then open:

```text
http://localhost:3000
```

Expected:

- `npm.cmd install` completes successfully.
- `npm.cmd run lint` completes without errors.
- `npm.cmd run build` completes without errors.
- The home page renders with the `Sounds Fishy` heading.
- No Firebase setup is required yet.

## Milestone 2 Checkpoint

Run:

```powershell
cd E:\sounds-fishy-project
npm.cmd run lint
npm.cmd run build
(Select-String -Path lib\questions.ts -Pattern 'id: "q').Count
Select-String -Path lib\*.ts -Pattern 'firebase|firestore' -SimpleMatch
```

Expected:

- Lint passes.
- Build passes.
- Question count is at least `30`.
- Firebase/Firestore scan returns no matches.
- No Firebase setup is required yet.

## Milestone 3 Checkpoint

Run:

```powershell
cd E:\sounds-fishy-project
Test-Path lib\firebase.ts
Test-Path .env.example
Test-Path firestore.rules
npm.cmd ls firebase --depth=0
npm.cmd audit --audit-level=moderate
npm.cmd run lint
npm.cmd run build
```

Expected:

- All `Test-Path` commands return `True`.
- `npm.cmd ls firebase --depth=0` shows the installed Firebase package.
- Audit reports `found 0 vulnerabilities`.
- Lint passes.
- Build passes even without `.env.local`.
- No room creation or game flow exists yet.

## Milestone 4 Checkpoint

Run:

```powershell
cd E:\sounds-fishy-project
npm.cmd run lint
npm.cmd run build
npm.cmd run dev
```

Then open `http://localhost:3000`.

Manual browser checks:

- Enter a display name.
- Refresh the page.
- Confirm the display name persists.
- Type a lowercase room code such as `fish12`.
- Confirm it becomes `FISH12`.
- Clear the display name and click `Create Room`.
- Confirm an error appears.
- Enter a display name and click `Create Room`.
- Confirm placeholder feedback appears.
- Clear the room code and click `Join Room`.
- Confirm a room-code error appears.
- Confirm layout remains readable at 1366x768 and 1440x900.

Expected:

- Local name persistence works.
- Room code input uppercases automatically.
- Buttons do not create or join Firestore rooms yet.
- Lint and build pass.

## Milestone 5 Checkpoint

Prerequisites:

- Firebase project created.
- Firestore Database enabled.
- `firestore.rules` published in Firebase Console.
- `.env.local` created from `.env.example` with Firebase web app values.
- Restart `npm.cmd run dev` after creating or editing `.env.local`.

Run:

```powershell
cd E:\sounds-fishy-project
npm.cmd run lint
npm.cmd run build
npm.cmd run dev
```

Manual browser checks:

- Open `http://localhost:3000`.
- Enter a display name.
- Click `Create Room`.
- Confirm the browser navigates to `/room/{ROOMCODE}`.
- In Firebase Console, confirm `rooms/{ROOMCODE}` exists.
- Confirm `rooms/{ROOMCODE}/players/{playerId}` exists for the host.
- Open another browser or incognito window.
- Open `http://localhost:3000`.
- Enter a different display name.
- Enter the same room code.
- Click `Join Room`.
- Confirm the second browser navigates to `/room/{ROOMCODE}`.
- In Firebase Console, confirm a second player document appears.

Expected:

- Room document has `status: "lobby"`, `roundNumber: 0`, `hostId`, and empty round fields.
- Host player has `isHost: true`, `score: 0`, and `role: null`.
- Joining player has `isHost: false`, `score: 0`, and `role: null`.
- The room route shows a simple placeholder landing page only; realtime lobby comes in Milestone 6.

## Milestone 6 Checkpoint

Prerequisites:

- Firebase project and `.env.local` are configured.
- Firestore rules are published.
- At least one test room can be created from the home page.

Run:

```powershell
cd E:\sounds-fishy-project
npm.cmd run lint
npm.cmd run build
npm.cmd run dev
```

Manual browser checks:

- Open host browser at `http://localhost:3000`.
- Create a room.
- Confirm the room page shows Lobby, room code, and host player.
- Click `Copy Room Code`.
- Confirm copied feedback appears.
- Open incognito or another browser.
- Join the same room code with a different display name.
- Confirm both browsers show both player names without refresh.
- Confirm only the host browser shows the Start Game button.
- Confirm Start Game is disabled with fewer than 4 players.
- Confirm the host player is marked Host.
- Confirm the current browser's player is marked You.
- Open a fake room URL such as `/room/ZZZZZZ`.
- Confirm a friendly room-not-found error appears.
- Check 1366x768 and 1440x900 layouts for readability.

Expected:

- Lobby player list updates realtime across sessions.
- No game start occurs yet.
- Room code copy works on localhost.
- Missing room errors are friendly.

## Milestone 7 Checkpoint

Prerequisites:

- Firebase project and `.env.local` are configured.
- Firestore rules are published.
- You can create and join a room from multiple browser sessions.

Run:

```powershell
cd E:\sounds-fishy-project
npm.cmd run lint
npm.cmd run build
npm.cmd run dev
```

Manual browser checks:

- Create a room as host.
- Join the same room from at least 3 additional browser sessions, or manually add test player docs if needed.
- Confirm Start Game is disabled with fewer than 4 players.
- With 4 players, host clicks `Start Game`.
- Confirm all clients move from lobby to answering.
- Confirm Firestore room status is `answering`.
- Confirm round number is `1`.
- Confirm room has a question, correct answer, Guesser ID, and Truth Teller ID.
- Confirm exactly one player has role `guesser`.
- Confirm exactly one player has role `truth`.
- Confirm remaining players have role `bluffer`.
- Confirm Truth Teller and Bluffer screens show the correct answer.
- Confirm the Guesser sees a waiting message and no answer input.
- Confirm Bluffers see fake-answer instructions that tell them not to submit the exact correct answer.

Expected:

- Role assignment matches `docs/GAME_RULES.md`.
- Answer submission is not available yet; it starts in Milestone 8.

## Milestone 8 Checkpoint

Prerequisites:

- Firebase project and `.env.local` are configured.
- Firestore rules are published.
- You can start a room with at least 4 players.

Run:

```powershell
cd E:\sounds-fishy-project
npm.cmd run lint
npm.cmd run build
npm.cmd run dev
```

Manual browser checks:

- Start a game with 4 players.
- In the Truth Teller browser, confirm the correct answer is prefilled.
- Submit the Truth Teller answer.
- In Bluffer browsers, enter fake answers and submit.
- In the Guesser browser, confirm submission status updates realtime.
- Confirm submitted answers are stored on player documents in Firestore.
- Confirm non-guessers can update their answer before all non-guessers submit.
- After the last non-Guesser submits, confirm room status changes to `guessing`.
- Confirm all clients leave the answering form and show the placeholder for the next phase.

Expected:

- Only non-guessers can submit.
- Empty answers are rejected.
- All non-guessers submitted moves the room to `guessing`.
- The actual guessing interface begins in Milestone 9.

## Milestone 9 Checkpoint

Prerequisites:

- Firebase project and `.env.local` are configured.
- Firestore rules are published.
- You can start a room with at least 4 players.
- You can submit answers from all non-guessers.

Run:

```powershell
cd E:\sounds-fishy-project
npm.cmd run lint
npm.cmd run build
npm.cmd run dev
```

Manual browser checks:

- Start a game with 4 players.
- Submit the Truth Teller answer and both Bluffer answers.
- Confirm all clients move to the guessing screen.
- Confirm submitted answers are hidden until card owners reveal them.
- Confirm Truth Teller and Bluffer roles are not displayed during guessing.
- In a non-Guesser browser, confirm hidden cards show waiting text.
- Have the card owner reveal, then select a Bluffer in the Guesser browser.
- Confirm that player is marked eliminated and the Guesser temporary bank increases by 1.
- Select the Truth Teller in the Guesser browser.
- Confirm all clients move to the result placeholder.
- Start a separate test round or reset the room, then have the Guesser select all Bluffers before the Truth Teller.
- Confirm the final Bluffer guess moves to result and awards final all-Bluffers scoring.
- Check the guessing layout at 1366x768 and 1440x900 for answer comparison readability.

Expected:

- Only the Guesser can make guesses.
- Invalid or duplicate guesses are rejected.
- Correct Bluffer guesses keep the phase in `guessing` until all Bluffers are eliminated.
- Truth Teller guesses end the round immediately.
- Scores update realtime across clients.
- Result reveal UI is still a placeholder until Milestone 10.

## Milestone 10 Checkpoint

Prerequisites:

- Firebase project and `.env.local` are configured.
- Firestore rules are published.
- You can complete a round through the guessing phase.

Run:

```powershell
cd E:\sounds-fishy-project
npm.cmd run lint
npm.cmd run build
npm.cmd run dev
```

Manual browser checks:

- Start a game with 4 players.
- Submit all non-Guesser answers.
- As Guesser, choose the Truth Teller or find all Bluffers to move to result.
- Confirm all clients show the result screen.
- Confirm the question and correct answer are visible.
- Confirm the Guesser and Truth Teller names are visible.
- Confirm every player row shows name, role, submitted answer, score, and guessed/eliminated state.
- Confirm the Guesser row says they did not submit an answer.
- Confirm the scoreboard is sorted by score descending.
- Confirm only the host sees the disabled Next Round button.
- Confirm the result layout remains readable at 1366x768 with minimal scrolling.

Expected:

- Result phase reveals roles and answers clearly.
- Scores match the scoring from the guessing phase.
- No next round starts yet; wiring that button is Milestone 11.

## Milestone 11 Checkpoint

Prerequisites:

- Firebase project and `.env.local` are configured.
- Firestore rules are published.
- You can complete one full round through the result screen.

Run:

```powershell
cd E:\sounds-fishy-project
npm.cmd run lint
npm.cmd run build
npm.cmd run dev
```

Manual browser checks:

- Create a room with at least 4 players.
- Complete round 1 through the result screen.
- Confirm only the host sees the Next Round button.
- In the host browser, click `Next Round`.
- Confirm all clients move to `answering`.
- Confirm `roundNumber` increments from `1` to `2`.
- Confirm the new Guesser is the next player by joined order.
- Confirm exactly one new Truth Teller is assigned and is not the Guesser.
- Confirm remaining non-guessers are Bluffers.
- Confirm a new question appears and is not the same as the previous question when possible.
- Confirm scores from round 1 persist.
- Confirm submitted answers are reset to empty strings.
- Confirm `hasSubmitted` is reset to `false`.
- Confirm `isEliminated` is reset to `false`.
- Confirm `guessedPlayerIds` is reset to an empty array.
- Play at least 2 full rounds.

Expected:

- Host can advance from result to the next answering phase.
- Non-hosts cannot start the next round.
- Round state resets while scores persist.
- Guesser rotation follows joined order.

## Milestone 12 Checkpoint

Prerequisites:

- Firebase project and `.env.local` are configured.
- Firestore rules are published.
- You can complete the app flow through at least two rounds.

Run:

```powershell
cd E:\sounds-fishy-project
npm.cmd run lint
npm.cmd run build
npm.cmd run dev
```

Manual browser checks:

- Create a room and confirm the lobby shows Back to Home.
- Click `Copy Room Code` and confirm copied feedback appears.
- Click `Copy Room Link` and confirm copied feedback appears.
- Join the room in another browser using the copied room link or code.
- Refresh during lobby and confirm the current player is still recognized.
- Start the game and confirm the answering screen shows room code, phase, round, and clear current-role badge.
- Refresh during answering and confirm player identity remains recognized.
- Submit answers and confirm guessing uses the consistent score-sorted scoreboard.
- Click guesses quickly and confirm only one guess is processed at a time.
- Refresh during guessing and confirm player identity remains recognized.
- Finish the round and confirm result role badges, Back to Home, and host Next Round action remain clear.
- Refresh during result and confirm player identity remains recognized.
- Try double-clicking Start Game; expected behavior is a single game start or a friendly "already started" error.
- Open a room URL in a browser that never joined and confirm the missing-player notice tells the user to join from Home.
- Check 1366x768, 1440x900, and 1920x1080 layouts for readable phase headers, answer cards, player lists, and scoreboard.
- Check a phone-width viewport and confirm the content stacks without cut-off critical actions.

Expected:

- The app remains the same MVP game, with clearer navigation and phase context.
- Duplicate action clicks are guarded by UI pending state or Firestore transaction validation.
- The current browser keeps its player identity after refresh.
- Desktop remains the priority, with mobile usable as a fallback.

## Milestone 12.5 Checkpoint

Prerequisites:

- Firebase project and `.env.local` are configured.
- Firestore rules are published.
- You can create a room and start a game with at least 4 players.

Run:

```powershell
cd E:\sounds-fishy-project
npm.cmd run lint
npm.cmd run build
npm.cmd run dev
```

Manual browser checks:

- Create a room as Host.
- Confirm the host player document has `lastSeenAt`.
- Join with Player A in a second browser.
- Confirm Player A has `lastSeenAt`.
- Refresh Player A's room tab and confirm no duplicate player is created.
- In the same browser/profile as Player A, go back to Home, enter a different display name, enter the same room code, and click Join Room.
- Confirm the join succeeds and returns to the room.
- Confirm the same player document now uses the new display name.
- Confirm no duplicate player document is created.
- Confirm Player A's `lastSeenAt` updates after entering the room and again after about 20 seconds.
- Clear or change Player A's localStorage player ID in a separate browser/profile, keep the same display name, and join the same room.
- Confirm the app reuses Player A's existing player document and does not create a duplicate.
- Confirm the reused player ID is saved back into localStorage.
- Start the game.
- From a new browser/profile with a new display name, try to join the room.
- Confirm the join is rejected with: `This game has already started. Only existing players can rejoin.`
- From an existing player browser/profile, rejoin after the game starts and confirm entry is allowed.
- Close or leave one player tab idle for more than 45 seconds.
- Confirm PlayerList or Scoreboard shows that player as Away.
- Reopen or focus that player's room page and wait for the heartbeat.
- Confirm the player returns to Online.
- Confirm the away player document is not removed from Firestore.

Expected:

- localStorage player ID remains the primary identity.
- A saved local player ID can rejoin and update its display name.
- Display name fallback is used only when the local player ID is missing or not found in the room.
- New players cannot join `answering`, `guessing`, or `result` phases.
- Presence writes happen about every 20 seconds, not every second.
- Online/Away badges are visible without changing game state.

## Milestone 12.6 Checkpoint

Prerequisites:

- Firebase project and `.env.local` are configured.
- Firestore rules are published.
- You can create a room and start a game with at least 4 players.

Run:

```powershell
cd E:\sounds-fishy-project
npm.cmd run lint
npm.cmd run build
npm.cmd audit --audit-level=moderate
npm.cmd run dev
```

Manual browser checks:

- Start a 4-player game.
- Submit answers from the Truth Teller and both Bluffers.
- Confirm the room moves to `guessing`.
- Confirm the room document has `revealedPlayerIds: []`.
- Confirm all answer cards are hidden initially and show `Answer hidden`.
- As the owner of one card, reveal that player's own card.
- Confirm only that card's submitted answer becomes visible.
- Confirm non-guessers can see which card is revealed without seeing roles.
- Confirm the Guesser cannot reveal cards.
- Confirm the Guesser cannot guess unrevealed cards.
- Guess a revealed Bluffer.
- Confirm the Guesser temporary bank increases by 1 and that Bluffer is marked eliminated.
- Reveal and guess the remaining Bluffer.
- Confirm the final Bluffer guess awards the +1 all-Bluffers bonus and moves the room to `result`.
- Start a separate run, reveal the Truth Teller, and guess them.
- Confirm the round ends immediately.
- Confirm ResultPhase reveals all roles and all answers.
- From result, host clicks Next Round.
- Confirm `revealedPlayerIds` resets to `[]` for the new round.

Expected:

- `revealedPlayerIds` starts empty during each guessing phase.
- Only card owners can reveal cards.
- Only revealed cards expose submitted answers during guessing.
- Guesses are available only for revealed cards.
- Roles remain hidden until result.
- Result still reveals every role and answer.

## Milestone 12.7 Checkpoint

Prerequisites:

- Firebase project and `.env.local` are configured.
- Firestore rules are published.
- You can create a room and start a game with at least 4 players.

Run:

```powershell
cd E:\sounds-fishy-project
npm.cmd run lint
npm.cmd run build
npm.cmd audit --audit-level=moderate
npm.cmd run dev
```

Manual test case 1: Guesser selects Truth Teller after catching one Bluffer.

- Start a 4-player game.
- Submit answers.
- In guessing, each non-Guesser reveals their own answer when asked.
- Guesser guesses one revealed Bluffer.
- Guesser then guesses the revealed Truth Teller.
- Confirm Guesser gets +0 for the round.
- Confirm guessed Bluffer gets +0.
- Confirm unguessed Bluffer gets +2 because `guessedPlayerIds` count is 2.
- Confirm Truth Teller gets +1 because 1 Bluffer was uncaught.
- Confirm result screen explains the scoring.

Manual test case 2: Guesser catches all Bluffers.

- Start a 4-player game.
- Reveal answers by card owners.
- Guesser guesses both Bluffers before Truth Teller.
- Confirm Guesser gets +1 per Bluffer +1 bonus, for +3 total.
- Confirm Bluffers get +0.
- Confirm Truth Teller gets +0.
- Confirm `roundEndReason` is `all_bluffers_found`.

Manual test case 3: Guesser stops early.

- Start a 5-player game if possible, or test with available player count.
- Guesser correctly guesses at least one Bluffer.
- Guesser clicks Stop / Bank Points.
- Confirm Guesser keeps +1 per correctly guessed Bluffer.
- Confirm no all-Bluffers bonus unless all Bluffers were already caught.
- Confirm unguessed Bluffers get +1 per `guessedPlayerIds` count.
- Confirm Truth Teller gets +0.
- Confirm room moves to result with `roundEndReason` as `guesser_stopped`.

Manual test case 4: Reveal ownership.

- Start a 4-player game.
- Move to guessing.
- Confirm Guesser cannot reveal cards.
- Confirm each non-Guesser can reveal only their own card.
- Confirm Guesser cannot guess unrevealed cards.
- Confirm once a card is revealed, Guesser can guess it.

Manual test case 5: Double click and refresh safety.

- During guessing, click guess or Stop / Bank Points quickly multiple times.
- Confirm scores are awarded only once.
- Refresh the result page.
- Confirm scores do not change again.

Expected:

- `revealedPlayerIds` only controls visibility.
- `guessedPlayerIds` drives scoring.
- `roundEndReason` explains why the round ended.
- `scoringApplied` becomes `true` after final scoring.
- Result screen explains Guesser, Bluffer, and Truth Teller points.

## Milestone 13 Checkpoint

Run:

```powershell
cd E:\sounds-fishy-project
npm.cmd run lint
npm.cmd run build
npm.cmd audit --audit-level=moderate
```

Documentation checks:

- Open `firestore.rules`.
- Confirm the rules include private-MVP comments.
- Confirm room and player reads/lists/creates/updates are allowed under `rooms`.
- Confirm room and player deletes are blocked.
- Confirm unrelated collections are closed.
- Open `.env.example`.
- Confirm every required `NEXT_PUBLIC_FIREBASE_*` key is present.
- Open `README.md`.
- Confirm the quick start includes install, `.env.local`, local run, validation, Firebase setup, and Vercel deployment.
- Open `docs\DEPLOYMENT_GUIDE.md`.
- Confirm it covers Firebase setup, Firestore rules publishing, GitHub push, Vercel import, Vercel environment variables, friend testing, and common errors.

Expected:

- Lint passes.
- Build passes.
- Audit reports no moderate-or-higher vulnerabilities.
- Deployment documentation is complete enough to follow without rereading chat.
- Vercel deployment should work after Firebase environment variables are added.

## Milestone 14 Checkpoint

Run:

```powershell
cd E:\sounds-fishy-project
npm.cmd run lint
npm.cmd run build
npm.cmd audit --audit-level=moderate
```

Documentation checks:

- Open this file and confirm the Final End-To-End QA Checklist covers the complete MVP flow.
- Open `docs\DEVELOPMENT_CHECKLIST.md` and confirm Milestone 14 is marked complete.
- Open `docs\agents\QA_AGENT.md` and confirm Milestone 14 final QA ownership is documented.
- Open `docs\agents\DEPLOYMENT_AGENT.md` and confirm Vercel deployment behavior is included in final QA.

Expected:

- Lint passes.
- Build passes.
- Audit reports no moderate-or-higher vulnerabilities.
- Final manual QA can be run from this document without relying on chat history.

## Milestone 15 Checkpoint

Run:

```powershell
cd E:\sounds-fishy-project
npm.cmd run lint
npm.cmd run build
npm.cmd audit --audit-level=moderate
npm.cmd run dev
```

Manual tests:

- Create a new room and start the game.
- Confirm the first question is not always the same across multiple new rooms.
- Play several rounds and confirm questions do not repeat within the same room while unused questions remain.
- Confirm `usedQuestionIds` grows after each selected question.
- During answering, host clicks `Skip Question`.
- Confirm the confirmation says current submitted answers will be cleared.
- Confirm the question changes.
- Confirm the same `roundNumber` is kept.
- Confirm the same Guesser, Truth Teller, and Bluffers are kept.
- Confirm submitted answers are cleared.
- Confirm scores are unchanged.
- Confirm the skipped question does not immediately appear again when unused questions remain.
- Confirm non-host players cannot see or trigger Skip Question.
- Confirm Skip Question is not available during `guessing` or `result`.
- In Firestore, simulate `usedQuestionIds` containing all question IDs and confirm the next selection resets the deck safely.
- Confirm `lastActivityAt` updates after create, join, start game, submit answer, reveal answer, guess, stop/bank, skip, next round, and archive.
- As host, click `End Game`.
- Confirm the archive confirmation appears.
- Confirm all clients see the archived room screen.
- Confirm final scoreboard is visible.
- Confirm gameplay actions no longer continue in the archived room.
- Confirm no Firestore delete is required.

Expected:

- Question selection is random and room-local.
- The used-question deck resets only after exhaustion.
- Skip Question is host-only, answering-only, and transactional.
- Archived rooms preserve final room/player data and stop play.
- Lint, build, and audit pass.

## Milestone 16 Checkpoint

Run:

```powershell
cd E:\sounds-fishy-project
npm.cmd run lint
npm.cmd run build
npm.cmd audit --audit-level=moderate
```

Question deck validation:

```powershell
cd E:\sounds-fishy-project
(Select-String -Path lib\questions.ts -Pattern 'id: "q').Count
Select-String -Path lib\questions.ts -Pattern 'id: "q' | ForEach-Object { $_.Line.Trim() } | Sort-Object | Group-Object | Where-Object Count -gt 1
Select-String -Path lib\questions.ts -Pattern 'question: "' | ForEach-Object { $_.Line.Trim() } | Sort-Object | Group-Object | Where-Object Count -gt 1
Select-String -Path lib\questions.ts -Pattern 'answer: ""'
```

Manual review:

- Open `lib\questions.ts` and confirm there are exactly 150 questions.
- Confirm IDs are sequential from `q1` through `q150`.
- Confirm all answers are short and non-empty.
- Confirm no question text is duplicated.
- Open `docs\QUESTION_RESEARCH.md`.
- Confirm each question has a category, answer, bluffing value, source title or URL, and confidence.
- Confirm only high or medium confidence facts appear in the final deck.
- Confirm excluded myths are documented.
- Sample at least 25 questions aloud and confirm they feel bizarre, funny, and bluffable rather than generic school trivia.

Expected:

- The question count is exactly 150.
- Duplicate ID and duplicate question checks return no rows.
- Empty answer check returns no rows.
- The research ledger category distribution totals 150.
- Lint, build, and audit pass.

## Milestone 17 Checkpoint

Run:

```powershell
cd E:\sounds-fishy-project
npm.cmd run lint
npm.cmd run build
npm.cmd audit --audit-level=moderate
```

Thai deck validation:

```powershell
cd E:\sounds-fishy-project
(Select-String -Path lib\questions.ts -Pattern 'id: "q').Count
Select-String -Path lib\questions.ts -Pattern 'id: "q' | ForEach-Object { $_.Line.Trim() } | Sort-Object | Group-Object | Where-Object Count -gt 1
Select-String -Path lib\questions.ts -Pattern 'question: "' | ForEach-Object { $_.Line.Trim() } | Sort-Object | Group-Object | Where-Object Count -gt 1
Select-String -Path lib\questions.ts -Pattern 'answer: ""'
```

Manual Thai review:

- Open `lib\questions.ts` and confirm there are exactly 150 questions.
- Confirm IDs are sequential from `q1` through `q150`.
- Confirm all playable `question` and `answer` fields are Thai-localized where natural.
- Confirm proper nouns remain in English only where they help recognition.
- Confirm Thai answers are concise and do not include explanations.
- Open `docs\QUESTION_RESEARCH.md` and confirm the English source/confidence ledger is preserved.
- Confirm the Thai Localization Ledger has one row for each `q1` through `q150`.
- Read at least 25 Thai questions aloud and confirm they feel casual, clear, weird, funny, and bluffable.

Expected:

- The question count is exactly 150.
- Duplicate ID and duplicate Thai question checks return no rows.
- Empty answer check returns no rows.
- Lint, build, and audit pass.

## Milestone 18 Checkpoint

Run:

```powershell
cd E:\sounds-fishy-project
npm.cmd run lint
npm.cmd run build
npm.cmd audit --audit-level=moderate
npm.cmd run dev
```

Manual visual and audio checks:

- Open `http://localhost:3000`.
- Confirm the home page shows the playful ocean/fish theme, rounded typography, layered background, and themed Create Room / Join Room buttons.
- Confirm the UI no longer reads as a generic dashboard.
- Check 1366x768, 1440x900, and 1920x1080 desktop viewports.
- Check a phone-width viewport and confirm stacked content remains usable.
- Create a room and join with 4 players.
- Confirm Lobby player cards, room code, Online/Away badges, host/current-player badges, copy buttons, Start Game, and End Game are readable.
- Start the game.
- Confirm Answering phase role cards, phase pill, correct-answer card, Skip Question, and answer form are readable.
- Confirm Truth Teller and Bluffers see the correct answer.
- Confirm the Guesser does not see the correct answer.
- Submit answers and move to Guessing.
- Confirm hidden answer cards look face-down and playful.
- Confirm owner-only `Reveal My Answer` still works.
- Confirm revealed answers are readable and Guesser Guess / Stop controls are visually distinct.
- Finish a round.
- Confirm Result screen scoring summary, role badges, answer reveal, scoreboard, Next Round, and End Game are readable.
- Host clicks End Game and confirms the archived room screen looks polished and shows final scoreboard.
- Click the bottom-right music control.
- Confirm music starts only after user interaction.
- Adjust the volume slider.
- Mute the music.
- Refresh the page and confirm volume/mute preference is remembered by the control.
- Confirm the music does not autoplay loudly after refresh.
- Confirm browser console has no errors during the flow.

Expected:

- Visual theme is colorful, playful, fish/ocean themed, and original.
- Core gameplay behavior is unchanged.
- Audio is optional, instrumental, browser-generated, and user-started.
- Lint, build, and audit pass.

## Milestone 18.1 Checkpoint

Run:

```powershell
cd E:\sounds-fishy-project
npm.cmd run lint
npm.cmd run build
npm.cmd audit --audit-level=moderate
npm.cmd run dev
```

Manual visual fix checks:

- Open `http://localhost:3000` at 1366x768.
- Confirm no large fish or background decoration appears before the actual page content.
- Confirm title, description, and Create/Join form are visible in the first viewport.
- Confirm the background is colorful/ocean-themed and not plain white.
- Confirm the Create/Join form has a clear framed game-card style.
- Confirm display-name and room-code inputs have visible styled borders, background, and focus states.
- Confirm Create Room and Join Room buttons are colorful, rounded, raised, and obviously clickable.
- Confirm hover and active states feel button-like.
- Confirm the bottom-right music control looks like a deliberate floating panel.
- Confirm the music button has a clear frame, Music On/Off label, and styled slider.
- Confirm mute/unmute and volume still work and preferences still persist.
- Create a room and join with 4 players.
- Confirm Lobby, PlayerList, and Scoreboard are layered and readable.
- Start the game.
- Confirm AnswerPhase has clear role, correct-answer, host-control, answer-form, and submission panels.
- Confirm no background decoration pushes game content downward.
- Move to Guessing.
- Confirm hidden answer cards look like face-down game cards.
- Confirm revealed cards look opened/active.
- Confirm Reveal My Answer, Guess, and Stop / Bank buttons are clearly styled.
- Move to Result.
- Confirm the Result screen is layered, readable, and celebratory.
- Archive/end the room and confirm the Archived Room screen is polished.
- Repeat quick layout checks at 1440x900 and 1920x1080.
- Check a phone-width viewport and confirm the app stacks without breaking core actions.
- Confirm no console errors.

Expected:

- Decorative background elements never create scroll before content.
- The app reads as a colorful party game UI instead of a plain dashboard.
- Music control no longer looks like raw browser controls.
- Gameplay behavior remains unchanged.
- Lint, build, and audit pass.

## Milestone 18.2 Checkpoint

Run:

```powershell
cd E:\sounds-fishy-project
npm.cmd run lint
npm.cmd run build
npm.cmd audit --audit-level=moderate
npm.cmd run dev
```

Manual final visual/audio checks:

- Open `http://localhost:3000` at 1366x768.
- Confirm there is no visible MVP badge.
- Confirm the bottom decoration no longer looks like broken or repeating seaweed icons.
- Confirm the background remains colorful, ocean-themed, and behind content.
- Confirm home content still fits without scrolling.
- Confirm the music control defaults visually to Music On on first visit.
- Click the page if needed and confirm music starts or resumes without console errors.
- Mute music and refresh; confirm the muted preference is respected.
- Adjust volume and refresh; confirm the volume preference is reflected.
- Confirm subtle button sound effects play when audio is on.
- Confirm sound effects do not play when muted.
- Create a room.
- Confirm lobby content is vertically centered and polished.
- Join with other players and confirm the player list still grows naturally.
- Start game.
- In AnswerPhase, click Skip Question.
- Confirm a themed modal appears instead of a browser confirm.
- Cancel skip and confirm nothing changes.
- Open skip modal again and confirm Skip Question works.
- Click End Game.
- Confirm a themed End Game modal appears instead of a browser confirm.
- Cancel and confirm the room continues.
- Confirm End Game and verify the archived screen appears.
- Confirm no default browser confirm appears in these flows.
- Confirm no console errors.
- Confirm layout still works at 1440x900 and 1920x1080.
- Confirm mobile width is usable as a fallback.

Expected:

- Bottom decoration is subtle and non-distracting.
- Music is enabled by default visually, starts only after interaction if needed, and respects saved mute/volume.
- UI sound effects are subtle and obey mute/volume.
- Skip Question and End Game use themed confirmation dialogs.
- Gameplay behavior remains unchanged.
- Lint, build, and audit pass.

## Milestone 18.3 Checkpoint

Run:

```powershell
cd E:\sounds-fishy-project
npm.cmd run lint
npm.cmd run build
npm.cmd audit --audit-level=moderate
```

Manual audio and lobby copy checks:

- Open the home page.
- Turn Music Off.
- Click Create Room or another action button.
- Confirm button/UI sound effects still play while Music is Off.
- Turn Music On and confirm background music can play or resume after interaction.
- Create a room and inspect the lobby.
- Confirm copy buttons say `Copy Code` and `Copy Link`.
- Confirm both labels stay on one line at desktop widths.
- Click Copy Code and confirm status says only `Copied`.
- Click Copy Link and confirm status says only `Copied`.
- Confirm the copied badge is compact and does not push the lobby layout awkwardly.
- Confirm lobby layout remains clean at 1366x768 and 1440x900.
- Confirm no console errors.

Expected:

- Music On/Off controls background music only.
- UI sound effects are still procedural and play only from user actions.
- Lobby copy buttons are shorter, nowrap, and cleaner.
- Lint, build, and audit pass.

## Multi-Browser Test Plan

Later gameplay milestones should be tested with multiple browser sessions:

- Host in the normal browser window.
- Friend 1 in an incognito/private window.
- Friend 2 in a different browser if available.
- Friend 3 in a separate browser profile, a different browser, or a manually created Firestore test player when needed.
- Browser sessions that share the same localStorage will reuse the saved local player ID and may update that same player's display name.

Target multiplayer checks:

- Room creation appears in Firestore.
- Joining player appears realtime.
- Lobby updates across clients.
- Game phase transitions update across clients.
- Scores update across clients.
- Refresh preserves the local player identity.

## Desktop Viewport Test Plan

Primary viewport checks:

- 1366x768.
- 1440x900.
- 1920x1080.

For each viewport:

- Home page is readable.
- Lobby fits without excessive scrolling.
- Question, player list, and controls are visible.
- Answering phase makes role and instructions clear.
- Guessing phase makes answer comparison comfortable.
- Result phase reveals roles and scores clearly.

## Secondary Mobile Sanity Check

Mobile is secondary. The app should remain usable on a phone-sized screen:

- Inputs are reachable.
- Buttons are large enough to tap.
- Content stacks cleanly.
- No critical text is cut off.
- Core actions are still possible.

## Phase-By-Phase Test Checkpoints

### Lobby

- Create room.
- Join room with another session.
- Confirm player list updates realtime.
- Confirm host is marked.
- Confirm Start Game is host-only.
- Confirm Start Game is disabled with fewer than 4 players.

### Answering

- Start game with at least 4 players.
- Confirm exactly one Guesser.
- Confirm exactly one Truth Teller.
- Confirm remaining players are Bluffers.
- Confirm Truth Teller and Bluffers see the correct answer during answering.
- Confirm Bluffers can submit fake answers but not the exact correct answer.
- Confirm Guesser waits and sees submission status.

### Guessing

- Confirm submitted answers start hidden.
- Confirm card owners can reveal their own answer cards one by one.
- Confirm only revealed submitted answers are shown.
- Confirm roles are hidden.
- Confirm only Guesser can select revealed players.
- Confirm unrevealed players cannot be guessed.
- Guess a Bluffer and confirm the temporary bank increases by 1.
- Stop early and confirm banked scoring.
- Guess the Truth Teller and confirm result transition.
- Guess all Bluffers and confirm +1 all-Bluffers bonus.

### Result

- Confirm correct answer is visible.
- Confirm roles are revealed.
- Confirm all submitted answers are visible.
- Confirm scoreboard is correct.
- Confirm only host sees Next Round.

### Next Round

- Confirm round number increments.
- Confirm Guesser rotates.
- Confirm new Truth Teller is assigned.
- Confirm scores persist.
- Confirm previous submitted answers and eliminated flags reset.

## Final End-To-End QA Checklist

Run this checklist for final MVP acceptance.

### Setup

- [ ] Firebase project exists.
- [ ] Firestore Database is enabled.
- [ ] Current `firestore.rules` is published in Firebase Console.
- [ ] `.env.local` contains all `NEXT_PUBLIC_FIREBASE_*` values.
- [ ] Local dependencies are installed with `npm.cmd install`.
- [ ] `npm.cmd run lint` passes.
- [ ] `npm.cmd run build` passes.
- [ ] `npm.cmd audit --audit-level=moderate` reports no moderate-or-higher vulnerabilities.

### Create Room

- [ ] Open `http://localhost:3000`.
- [ ] Enter a display name for the host.
- [ ] Click `Create Room`.
- [ ] Confirm the browser navigates to `/room/{ROOMCODE}`.
- [ ] Confirm Firestore has `rooms/{ROOMCODE}`.
- [ ] Confirm Firestore has one host player under `rooms/{ROOMCODE}/players`.

### Join Room

- [ ] Open at least 3 additional browser sessions, profiles, browsers, or devices.
- [ ] Enter unique display names for Friend 1, Friend 2, and Friend 3.
- [ ] Join the host room with the room code.
- [ ] Confirm each friend reaches `/room/{ROOMCODE}`.
- [ ] Confirm each friend appears in Firestore under `rooms/{ROOMCODE}/players`.
- [ ] Confirm all players appear in the lobby without refreshing.

### Lobby Realtime

- [ ] Confirm the room code is visible.
- [ ] Confirm `Copy Room Code` works.
- [ ] Confirm `Copy Room Link` works.
- [ ] Confirm the host is marked as host.
- [ ] Confirm the current player is marked as you.
- [ ] Confirm Online/Away badges are visible.
- [ ] Confirm lobby player updates appear realtime across sessions.

### Minimum Player Validation

- [ ] Create a separate test room with fewer than 4 players.
- [ ] Confirm the host cannot start the game.
- [ ] Confirm the Start Game control explains that 4 players are required.
- [ ] Add enough players to reach 4.
- [ ] Confirm the host can now start.

### Start Game And Role Visibility

- [ ] Host clicks `Start Game`.
- [ ] Confirm every browser moves to `answering`.
- [ ] Confirm exactly one player is Guesser.
- [ ] Confirm exactly one player is Truth Teller.
- [ ] Confirm remaining players are Bluffers.
- [ ] Confirm the Truth Teller sees the correct answer.
- [ ] Confirm Bluffers also see the correct answer during answering.
- [ ] Confirm Bluffers are instructed to use it as context and submit a believable fake.
- [ ] Confirm the Guesser sees waiting/submission status and no answer input.
- [ ] Confirm roles are clear only to the current player during answering.

### Answer Submission

- [ ] Truth Teller submits the prefilled correct answer.
- [ ] Each Bluffer submits a fake answer.
- [ ] Confirm empty Bluffer answers are rejected.
- [ ] Confirm the exact correct answer is rejected for Bluffers.
- [ ] Confirm the Guesser sees submitted status update realtime.
- [ ] Confirm player documents store submitted answers and `hasSubmitted`.

### Transition To Guessing

- [ ] After the last non-Guesser submits, confirm every browser moves to `guessing`.
- [ ] Confirm `revealedPlayerIds` is `[]` in the room document.
- [ ] Confirm all answer cards start hidden.
- [ ] Confirm roles are hidden during guessing.

### Reveal Ownership

- [ ] Confirm the Guesser cannot reveal answer cards.
- [ ] Confirm each non-Guesser can reveal only their own card.
- [ ] Reveal one non-Guesser card.
- [ ] Confirm only that answer becomes visible to everyone.
- [ ] Confirm unrevealed cards still say the answer is hidden.

### Correct Guess

- [ ] Guesser guesses a revealed Bluffer.
- [ ] Confirm the Bluffer is marked eliminated.
- [ ] Confirm Guesser temporary bank increases by 1.
- [ ] Confirm the round stays in `guessing` if other Bluffers remain.

### Wrong Guess

- [ ] In a separate run, reveal the Truth Teller card.
- [ ] Guesser guesses the revealed Truth Teller.
- [ ] Confirm the round moves to `result`.
- [ ] Confirm Guesser gets +0 for the round.
- [ ] Confirm unguessed Bluffers receive points based on `guessedPlayerIds` count.
- [ ] Confirm Truth Teller receives points equal to uncaught Bluffers.

### All Bluffers Guessed

- [ ] In a separate run, reveal all Bluffer cards.
- [ ] Guesser guesses every Bluffer before selecting the Truth Teller.
- [ ] Confirm the round moves to `result`.
- [ ] Confirm Guesser receives +1 per Bluffer plus +1 bonus.
- [ ] Confirm Bluffers and Truth Teller receive +0 for that round.
- [ ] Confirm `roundEndReason` is `all_bluffers_found`.

### Stop And Bank

- [ ] In a separate run, Guesser correctly guesses at least one Bluffer.
- [ ] Guesser clicks `Stop / Bank Points`.
- [ ] Confirm the round moves to `result`.
- [ ] Confirm Guesser keeps one point per guessed Bluffer.
- [ ] Confirm no all-Bluffers bonus is awarded unless all Bluffers were already caught.
- [ ] Confirm unguessed Bluffers receive points based on `guessedPlayerIds` count.
- [ ] Confirm Truth Teller receives +0.

### Result Reveal

- [ ] Confirm the question and correct answer are visible.
- [ ] Confirm Guesser and Truth Teller are named.
- [ ] Confirm every player role is revealed.
- [ ] Confirm every submitted answer is visible.
- [ ] Confirm eliminated state is visible.
- [ ] Confirm scoreboard is sorted by score descending.
- [ ] Confirm round scoring summary explains why points were awarded.

### Next Round

- [ ] Confirm only the host sees and can use Next Round.
- [ ] Host clicks `Next Round`.
- [ ] Confirm all clients move to `answering`.
- [ ] Confirm round number increments.
- [ ] Confirm Guesser rotates by joined order.
- [ ] Confirm new Truth Teller is assigned and is not the Guesser.
- [ ] Confirm scores persist.
- [ ] Confirm `submittedAnswer`, `hasSubmitted`, `isEliminated`, `guessedPlayerIds`, `revealedPlayerIds`, `roundEndReason`, and `scoringApplied` reset for the new round.
- [ ] Play at least two full rounds.

### Question Deck, Skip, And Archive

- [ ] Create multiple new rooms and confirm the first question is not predictably the same each time.
- [ ] Play several rounds in one room and confirm selected questions do not repeat while unused questions remain.
- [ ] Confirm `usedQuestionIds` grows after Start Game, Skip Question, and Next Round.
- [ ] During answering, host clicks `Skip Question`.
- [ ] Confirm the confirmation dialog appears before submissions are cleared.
- [ ] Confirm the question changes while round number, Guesser, Truth Teller, Bluffers, and scores stay unchanged.
- [ ] Confirm submitted answers and submission flags are cleared after skipping.
- [ ] Confirm non-host players do not see Skip Question.
- [ ] Confirm Skip Question is not available during guessing or result.
- [ ] Confirm `lastActivityAt` updates after important room actions.
- [ ] Host clicks `End Game`.
- [ ] Confirm all clients move to the archived room screen.
- [ ] Confirm final scoreboard remains visible and no gameplay actions continue.
- [ ] Confirm no room or player documents are deleted.

### Rejoin And Presence

- [ ] Refresh the host browser during lobby and confirm the host is still recognized.
- [ ] Refresh a player during answering and confirm the current role still appears.
- [ ] Refresh the Guesser during guessing and confirm guessing controls still work.
- [ ] Refresh during result and confirm scores do not change.
- [ ] Rejoin by the same display name from a browser/profile with missing local player ID and confirm no duplicate player is created.
- [ ] Try to join as a brand-new player after the game starts and confirm the friendly rejection appears.
- [ ] Leave a player idle for more than 45 seconds and confirm they show Away.
- [ ] Return that player and confirm they show Online after heartbeat.
- [ ] Confirm away players are not removed automatically.

### Desktop Viewports

- [ ] Test 1366x768.
- [ ] Confirm Home, Lobby, Answering, Guessing, Result, Archived Room, and Next Round screens are readable.
- [ ] Test 1440x900.
- [ ] Confirm the question, role, answer cards, player list, and scoreboard are visible without excessive scrolling.
- [ ] Test 1920x1080.
- [ ] Confirm horizontal space is used cleanly and text is not oversized.
- [ ] Confirm the ocean background, fish decorations, cards, and fixed music control do not hide important actions.

### Audio Sanity

- [ ] Confirm music is visually On by default on first visit.
- [ ] Confirm audio starts only after user interaction if the browser blocks autoplay.
- [ ] Click the music control and confirm a light instrumental loop starts.
- [ ] Adjust the volume slider and confirm volume changes.
- [ ] Mute and confirm audio stops.
- [ ] Refresh and confirm saved music preference is reflected in the control.
- [ ] Confirm button/reveal/guess/success/warning sound effects play only when audio is on.
- [ ] Confirm the control does not cover core game buttons on desktop or mobile.

### Secondary Mobile Sanity Check

- [ ] Test a phone-width viewport.
- [ ] Confirm inputs are reachable.
- [ ] Confirm buttons are tappable.
- [ ] Confirm content stacks cleanly.
- [ ] Confirm no critical action is cut off.
- [ ] Confirm the app remains usable even though desktop is the priority.

### Vercel Deployment Behavior

- [ ] Push the latest code to GitHub.
- [ ] Import or redeploy the project on Vercel.
- [ ] Add all `NEXT_PUBLIC_FIREBASE_*` variables in Vercel Project Settings.
- [ ] Redeploy after adding variables.
- [ ] Open the Vercel deployment URL.
- [ ] Create a room on the deployed app.
- [ ] Join from at least one separate browser/profile/device.
- [ ] Complete one full round on the deployed app.
- [ ] Confirm realtime updates, scoring, result reveal, and next round work on deployment.

### Final Acceptance Criteria

- [ ] A host can create a room.
- [ ] At least 3 friends can join.
- [ ] Host can start the game.
- [ ] Roles are assigned correctly.
- [ ] Truth Teller sees the correct answer.
- [ ] Bluffers see the correct answer during answering so they can create better fake answers.
- [ ] Guesser does not see roles during guessing.
- [ ] All non-guessers can submit answers.
- [ ] Game moves to guessing automatically.
- [ ] Non-Guessers reveal their own answer cards.
- [ ] Guesser can select only revealed players.
- [ ] Score updates correctly at round end.
- [ ] Round ends correctly for Truth Teller selection, Stop / Bank, and all Bluffers found.
- [ ] Result screen reveals roles.
- [ ] Host can start next round.
- [ ] Questions are random and do not repeat within a room until the deck resets.
- [ ] Host can skip a bad question during answering.
- [ ] Host can archive/end a room without deleting data.
- [ ] App works after refresh.
- [ ] App builds successfully.
- [ ] App can be deployed to Vercel.
