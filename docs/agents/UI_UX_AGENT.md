# UI_UX_AGENT

Last updated milestone: Milestone 18.3

## Responsibility

- Owns desktop-first UI.
- Optimizes for 1366x768, 1440x900, and 1920x1080.
- Ensures mobile is usable as secondary support.
- Owns layout readability.
- Owns role badges, phase indicators, and game screens.
- Ensures important info is visible without excessive scrolling.

## Current Decisions

- Desktop and laptop screens are the priority.
- Use Tailwind CSS only.
- No extra UI library.
- Use large readable buttons.
- Use rounded cards.
- Use horizontal room for player lists, scoreboards, and phase details.
- Keep question, current role, player list, answers, and scoreboard easy to see.
- Keep Skip Question and End Game controls compact and host-only.
- Use an original playful ocean/fish party-game style.
- Use role color language: gold Guesser, coral Bluffer, blue Truth Teller.
- Keep optional music controls small, fixed bottom-right, and out of the way of core actions.

## Constraints

- Mobile should not be the main layout target, but must remain usable.
- Avoid excessive scrolling on laptop screens.
- Do not add decorative complexity that slows MVP progress.
- Keep UI text clear and compact.

## Milestone Notes

### Milestone 0

Documented desktop-first UX direction and target viewports.

### Milestone 1

Completed:

- Create a simple baseline home page.
- Establish global styles and readable desktop-first defaults.
- Keep the page intentionally minimal because HomeForm belongs to Milestone 4.
- Used a simple responsive two-column desktop layout.
- Did not add interactive home form controls early.

### Milestone 4

Completed:

- Replace the placeholder home page with a functional display-name and room-code form.
- Use a desktop-first two-column layout.
- Keep actions clear and readable on laptop screens.
- Show friendly placeholder messaging for Create Room and Join Room until Milestone 5.
- Keep mobile stacked and usable.
- Used clear labels, large buttons, and visible validation states.
- Kept cards to simple 8px rounded corners.

### Milestone 6

Completed:

- Build a desktop-first lobby layout.
- Put room info and host actions on one side.
- Put realtime player list on the other side.
- Make room code easy to copy.
- Clearly mark host and current player.
- Keep Start Game visible only to host and disabled until at least 4 players.

### Milestone 7

Completed:

- Wire Start Game button for hosts when enough players are present.
- Add a role-aware AnswerPhase layout.
- Show correct answer to the Truth Teller and Bluffers.
- Show waiting state for Guesser.
- Show fake-answer instruction for Bluffers.

### Milestone 8

Completed:

- Add answer input for Truth Teller and Bluffers.
- Prefill Truth Teller answer with the correct answer.
- Keep Guesser on a waiting/status view.
- Show realtime submitted/waiting state for non-guessers.

### Milestone 9

Planned scope:

- Add a desktop-first guessing layout.
- Keep the question prominent.
- Show answer cards from non-guessers without role labels.
- Make the Guesser action clear and keyboard-accessible.
- Show eliminated states for guessed Bluffers.
- Provide a compact side panel with score and player context.

Completed:

- Added a desktop-first guessing screen with question, answer cards, and side panels.
- Kept Truth Teller and Bluffer roles hidden during guessing.
- Used real buttons for Guesser selections and disabled waiting states for non-guessers.
- Added eliminated and guessed status labels.
- Added compact score and player-status side panels without creating the Milestone 10 `Scoreboard` component.

### Milestone 10

Planned scope:

- Add a desktop-first result layout.
- Make the correct answer, Guesser, and Truth Teller immediately visible.
- Reveal each player's role, answer, score, and eliminated state.
- Add a clear scoreboard sorted by score.
- Show a host-only Next Round button as a disabled placeholder.

Completed:

- Added a desktop-first result layout with round summary cards.
- Made correct answer, Guesser, and Truth Teller prominent.
- Revealed every player's role, submitted answer, score, and guessed/eliminated state.
- Added the score-sorted scoreboard side panel.
- Added a host-only disabled Next Round button.

### Milestone 12

Planned scope:

- Add simple navigation back to the home screen.
- Add room link copy support in the lobby.
- Improve phase indicators and role badges.
- Improve missing-player notices.
- Keep desktop/laptop density readable without redesigning the app.
- Confirm mobile still stacks usefully.

Completed:

- Added Back to Home links to lobby, answering, guessing, and result.
- Added Copy Room Link beside Copy Room Code in lobby.
- Added room code context to active phase headers.
- Improved role badge styling in answering and result reveal.
- Improved missing-player notices across active phases.
- Kept responsive grid layouts intact for desktop-first play and mobile fallback.

### Milestone 12.5

Planned scope:

- Show Online/Away status in player-facing lists where useful.
- Keep badges small and desktop-friendly.
- Show friendly join rejection through existing HomeForm error flow.

Completed:

- Added Online/Away badges to `PlayerList`.
- Added Online/Away status to `Scoreboard`.
- Kept the layout unchanged aside from compact presence badges.

Scoped revert:

- Removed the forced reset to the previous saved display name after join errors.
- Removed the same-browser different-display-name blocking message from the join flow.

### Milestone 12.6

Planned scope:

- Update GuessingPhase without a large redesign.
- Show all non-Guesser cards face-down at first.
- Give the Guesser a Reveal button for hidden cards.
- Give the Guesser a Guess action only after a card is revealed.
- Let non-guessers see hidden/revealed state without roles.

Completed:

- GuessingPhase now shows hidden cards with `Answer hidden`.
- Revealed cards show submitted answer text and a `Guess as Bluffer` action for the Guesser.
- Non-guessers see `Not revealed yet` or waiting state.
- Side status labels now show Hidden, Revealed, or Guessed.

### Milestone 12.7

Planned scope:

- Replace Guesser reveal controls with owner reveal controls.
- Add Stop / Bank for the Guesser.
- Show a simple temporary bank count.
- Add result scoring explanation without redesigning the screen.

Completed:

- Non-Guessers see `Reveal My Answer` only on their own hidden card.
- Guesser sees guidance to ask players to explain and reveal.
- Guesser sees Stop / Bank and current banked temporary points.
- ResultPhase shows round end reason and scoring summary cards.

### Milestone 15

Planned scope:

- Add compact host-only Skip Question control during answering.
- Confirm before clearing submitted answers.
- Add host-only End Game / Archive Room control.
- Add a clear archived-room screen with final scoreboard and Back to Home.
- Avoid a large redesign.

Completed:

- Added host controls to AnswerPhase with Skip Question and End Game actions.
- Added confirmation before Skip Question clears submitted answers.
- Added reusable host archive button for lobby, active phases, and result.
- Added archived room screen with ended-room message, final scoreboard, and Back to Home.
- Kept the existing desktop-first layout structure.

### Post-Milestone 16 Scoped Answer Visibility Adjustment

Completed:

- AnswerPhase now shows the correct answer to Bluffers as context.
- Bluffer copy tells players to submit a believable fake answer, not the exact correct answer.
- Guesser still sees only waiting/submission status during answering.
- Guessing and result layouts were not redesigned.

### Milestone 17

Planned scope:

- Make the playable deck easier for Thai friends to read aloud in Discord.
- Keep questions casual, concise, and bluffable in Thai.
- Keep proper nouns in English when that improves recognition.

Completed:

- Localized all playable questions and answers into Thai where natural.
- Kept important proper nouns such as BBC, NASA, Play-Doh, Bubble Wrap, and Monty Python in English.
- No layout changes were required.

### Milestone 18

Planned scope:

- Replace the plain dashboard feeling with a playful original fish/ocean theme.
- Improve home, lobby, answering, guessing, result, archived room, player list, scoreboard, buttons, cards, and badges.
- Add layered background elements with CSS/SVG instead of copyrighted artwork.
- Add optional cheerful instrumental background music controls.
- Keep desktop-first readability and mobile fallback.

Completed:

- Added layered ocean background, waves, bubbles, and subtle original fish illustrations.
- Added rounded Thai-friendly typography and stronger title treatment.
- Restyled cards, buttons, inputs, phase labels, role badges, player lists, scoreboard, answer cards, result screen, and archived room.
- Made hidden guessing cards feel face-down while keeping roles hidden.
- Added a fixed bottom-right music control with mute/resume and volume slider.
- Kept gameplay flow and UI copy behavior intact.

### Milestone 18.1

Planned scope:

- Fix observed manual-review issues with oversized decorations, plain home form, plain backgrounds, weak card framing, stiff typography, and raw-looking music controls.
- Keep first-viewport content visible at 1366x768.
- Keep desktop-first playability intact.

Completed:

- Reduced and fixed background decorations behind content so users no longer scroll past large fish.
- Tightened home hero spacing and mascot size.
- Strengthened game-card, soft-panel, input, button, role badge, and hidden-card styling.
- Restyled the music control as an obvious compact floating control with visible status, button, and custom slider.
- Switched display typography from Mitr to Mali for a more playful Thai-supported feel.

### Milestone 18.2

Planned scope:

- Replace the awkward bottom decoration with a subtler ocean layer.
- Remove visible MVP labels.
- Make music feel enabled by default without breaking autoplay rules.
- Add subtle sound effects for important UI actions.
- Replace browser confirm popups with themed dialogs.
- Center the lobby layout vertically.

Completed:

- Reworked bottom wave styling into soft background bands instead of repeating icon-like shapes.
- Removed the visible home MVP badge.
- Updated music control behavior so first visits show Music On and saved mute/volume preferences are respected.
- Added subtle procedural sound effects that obey the music mute/volume setting.
- Added themed Skip Question and End Game confirmation dialogs.
- Updated Lobby to center content in the viewport on desktop/laptop sizes.

### Milestone 18.3

Planned scope:

- Make button sounds feel responsive even when background music is off.
- Shorten lobby copy controls so they stay clean and single-line.
- Keep the improved Milestone 18.1/18.2 visual styling.

Completed:

- UI sound effects now play independently from the Music On/Off background toggle.
- Lobby copy controls now read `Copy Code` and `Copy Link`.
- Copy buttons use nowrap and compact minimum widths.
- Copy feedback now says only `Copied`.

## Open Questions

- None.

## Last Updated Milestone

Milestone 18.3
