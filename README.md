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

## Credits

Questions are original, written in the style of past DSC 10 exams. This is an unofficial, fan-made study tool and is not affiliated with the course staff.
