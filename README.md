# Chihoot

A Kahoot-style review game for the **DSC 10 (Fall 2026) midterm** at UC San Diego, themed as a glaze of Professor Peter Chi.

19 multiple-choice questions cover Lectures 1–12: strings, arrays, DataFrames, querying, grouping, visualization, histograms, functions and `.apply`, merging, conditionals, loops, probability and simulation. Each one is modeled on a trap from past DSC 10 midterms at [practice.dsc10.com](https://practice.dsc10.com), aiming for roughly 60–70% correctness.

## Play

Open `index.html` in any browser, or play the hosted version on GitHub Pages (see below).

- Each question has a timer. Faster correct answers earn up to 1,000 points, plus a streak bonus.
- After each answer you get an explanation of the trap and a "Chi Watch" line.
- The final screen shows a box score by topic and lists your misses with their lecture numbers.
- Turn the timer off on the start screen for study mode.
- Keyboard: press 1–4 to answer, Enter to continue.

Your best score is saved in your browser's local storage. Nothing is sent anywhere.

## Host it on GitHub Pages

1. In this repo, go to **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to "Deploy from a branch", pick `main` and `/ (root)`, and save.
3. After a minute the game is live at `https://<your-username>.github.io/chihoot/`.

## Edit the questions

Everything lives in `index.html`; there is no build step. The questions are the `QS` array in the `<script>` block. Each entry looks like this:

```js
{ lec: 3, topic: "Arrays", t: 30,                // lecture, topic label, seconds
  text: "What does this evaluate to?",           // question
  code: '(np.arange(5, 25, 5) * 2 - 10).mean()', // optional code block
  opts: ['`15.0`', '`20.0`', '`12.5`', '`30.0`'],// four choices; `backticks` render as code
  a: 0,                                          // index of the correct choice
  why: "Explanation shown after answering.",
  glaze: "The Chi Watch line." }
```

The news-ticker lines are in `GLAZE_TICKER`, and the end-of-game ranks are in `rankFor`.

## Guts mode (live team round)

`guts/` is a separate, hosted version of the game: a Guts round like the ones at math competitions. The solo game above doesn't depend on it.

- Teams of up to 4 join on their own devices with a game PIN and a team name. Everyone on a team shares one answer sheet that syncs live.
- The same 19 questions are split into 6 sets that get harder as you go, worth 10, 11, 12, 13, 14 and 15 points per problem (240 total). Submitting a set locks it and unlocks the next one. Everyone plays against a single game clock.
- Answers are short answers, graded automatically. Questions that only make sense as multiple choice keep their four options.
- The host console shows the PIN, the clock, every team's answers and a live scoreboard. It also has a projector view, a reveal-answers button for after the game and a CSV export.

Players go to `https://<your-username>.github.io/chihoot/guts/`. The host goes to `…/guts/host.html`.

### One-time setup (Firebase, free plan)

Guts mode needs a small realtime database so devices can see each other. It uses Firebase, so the site can stay on GitHub Pages with no server to run.

1. Create a project at [console.firebase.google.com](https://console.firebase.google.com). Google Analytics isn't needed.
2. **Build → Realtime Database → Create database.** Pick any location and start in locked mode.
3. **Realtime Database → Rules:** replace the rules with the contents of `guts/database.rules.json` and click **Publish**.
4. **Build → Authentication → Get started.** Under **Sign-in method**, enable **Anonymous** (for players) and **Email/Password** (for the host).
5. **Authentication → Users → Add user:** create the host account. This email and password are the host login. Copy the account's **User UID**.
6. **Realtime Database → Data:** add a child `hosts`, and under it a child named with that UID, set to the value `true`. That's what makes the account a host.
7. **Authentication → Settings → Authorized domains:** add `<your-username>.github.io`.
8. **Project settings → Your apps → Web (`</>`):** register an app. Leave "Firebase Hosting" unchecked, because GitHub Pages does the hosting. Then copy the values from its `firebaseConfig` into `guts/firebase-config.js` and skip the SDK and CLI steps. If the snippet has no `databaseURL`, copy it from the top of the Realtime Database → Data tab. The config isn't a secret; the rules are what protect the data.

To test locally, run `python3 -m http.server` in the repo and open `http://localhost:8000/guts/`. The pages use ES modules, so opening the files directly from disk won't work.

### Running a game

1. Sign in at `guts/host.html`, choose a length (45 minutes by default) and create the game.
2. Put the join link and PIN on screen. **Projector view** hides the answers and controls.
3. When the teams are in, click **Start game**. You can add or remove time in 5-minute steps.
4. Keep the host tab open. It does the grading, so scores only update while it's open.
5. The game ends on its own when time runs out, or when you click **End game now**. When the clock hits zero, each team's current set is submitted automatically with whatever they've drafted. Then click **Reveal answers** so teams can see explanations, and **Export CSV** if you want a record.

**Limits:** the free plan allows 100 devices connected at the same time, and the console shows how many are connected. For a full lecture hall, have each team use one device or upgrade to the pay-as-you-go plan, which costs about nothing at this scale.

### Editing Guts problems

- `guts/problems.js` holds the problems and the sets (no answers).
- `guts/key.js` holds the answers. Each one is `num` (with an optional `tol`), `str` (a list of accepted strings; case and quotes are ignored) or `choice` (a letter).
- If you change the number of sets, extend the `submitted/$set` chain in `guts/database.rules.json` to match and publish the rules again.
- The answer key is public in the repo, like the solo game's. What the rules prevent is teams writing their own scores or changing a set after submitting it.

## Credits

Questions are original, written in the style of past DSC 10 exams. This is an unofficial, fan-made study tool and is not affiliated with the course staff.
