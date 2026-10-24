// Answer key, loaded only by host.html. The repo is public, so this isn't secret: what keeps
// the scoreboard honest is that only the host can write scores (see database.rules.json).
// num: |answer − ans| <= tol (default 1e-9); "1/5"-style fractions are accepted.
// str: quotes, extra spaces, and case are ignored; any string in ans counts.
// choice: the letter of the correct option.
// show is what players see after the reveal; `backticks` render as code. img (optional) is
// shown under the explanation, with a path relative to the guts/ pages. glaze is the
// "Chi Watch" line from the solo game, shown in the answer key.
// Banner lines from the solo game's correct-answer reveal (RIGHT_BARS in ../index.html).
// Question qN gets RIGHT_BARS[(N - 1) % 5], the same one the solo game shows.
export const RIGHT_BARS = ["Professor Chi would be proud", "That's a Chi-level read", "Clean. Bucket.", "Certified Professor Chi student", "Cooking like Professor Chi"];

export const KEY = {
  q1: { type: "str", ans: ["hi"], show: '`"hi"`',
    glaze: "Even .strip() can't take the GOAT out of Professor Chi. It just says hi.",
    why: '`.strip("*C")` removes any leading or trailing characters in the <b>set</b> {*, C}, not the substring. The front loses "**C", the back loses "**", leaving "hi-GOAT". Split on "-" and take [0]: "hi".' },
  q2: { type: "num", ans: 15, show: "`15.0`",
    glaze: "np.arange leaves out 25. Professor Chi leaves no student behind.",
    why: '`np.arange(5, 25, 5)` is [5, 10, 15, 20] since the stop value is excluded. Times 2 minus 10 gives [0, 10, 20, 30], with mean 15. Including 25 by mistake gives 20.' },
  q3: { type: "str", ans: ["series", "pd.series", "bpd.series", "boolean series", "bool series", "pandas series", "a series"], show: "Series",
    glaze: "One True per row. Like one W per student Professor Chi helps.",
    why: 'Comparing a Series to a number works element by element, giving a Boolean Series with one True/False per row. That is what goes inside the brackets when you query.' },
  q4: { type: "choice", ans: "C",
    glaze: "Sorting Professor Chi's ratings is pointless anyway. They're all fives.",
    why: 'Sorting moves rows but they keep their index labels. `.loc[0]` finds the row <b>labeled</b> 0, which is the original first row wherever it landed. For the top-rated row you need `.iloc[0]`.' },
  q5: { type: "choice", ans: "B",
    glaze: "Spoiler: the answer is basically oh.shape[0].",
    why: 'True counts as 1 in a sum. `.count()` counts every non-missing value, so all rows. `shape[1]` is the number of <b>columns</b>, and `.shape` is a tuple, not an integer.' },
  q6: { type: "choice", ans: "D",
    glaze: "Professor Chi would have spotted the missing parentheses from across Geisel.",
    why: '`&` binds tighter than `>`, so Python tries `5 & oh.get("rating")` first, which errors. Each condition needs its own parentheses: `(cond1) & (cond2)`.' },
  q7: { type: "choice", ans: "B",
    glaze: "Trick question. Professor Chi's best location is wherever he is standing.",
    why: '`.groupby` sorts its index alphabetically. Nothing here sorts by rating, so `.iloc[-1]` is just the alphabetically last location\'s mean rating.' },
  q8: { type: "choice", ans: "A",
    glaze: "Density matters here. The unsolved group has like three questions in it.",
    why: 'The distribution of a numerical variable calls for a histogram. Overlaid <b>density</b> histograms compare groups fairly even when they have very different sizes. A bar chart of means only shows the center.' },
  q9: { type: "num", ans: 100, show: "100",
    glaze: "Half of all questions solved in under 4 minutes. Speedrun champion.",
    why: 'Area is proportion. [4, 6): 2 × 0.15 = 0.3. [6, 10]: 4 × 0.05 = 0.2. Total area is 1, so [2, 4) holds 0.5, and 0.5 × 200 = 100. Treating heights as proportions gives 160.' },
  q10: { type: "num", ans: 0.2, show: "0.2", img: "../img/q10-hist.png",
    glaze: "Professor Chi divides by the bin width in his sleep.",
  imgAlt: "Density histogram of minutes with bins [2, 6) and [6, 10]: the [2, 6) bar has height 0.2 and the [6, 10] bar has height 0.05.",
    why: '[2, 6) holds 0.5 + 0.3 = 0.8 of the data. Height = area ÷ width = 0.8 ÷ 4 = 0.2.' },
  q11: { type: "str", ans: ["none"], show: "`None`",
    glaze: "Professor Chi cooked, but the function never served it. print ≠ return.",
    why: '`print` shows text but returns nothing. A function that finishes without hitting a `return` returns `None`, and that is what `.apply` stores.' },
  q12: { type: "num", ans: 9, show: "9",
    glaze: "That flawless location with zero unsolved questions? Professor Chi's home court.",
    why: 'Grouping on two columns makes one row per combination that actually appears. 5 locations × 2 values of solved = 10 possible, minus the one missing combination = 9.' },
  q13: { type: "num", ans: 8, show: "8",
    glaze: "Brings snacks AND teaches merges. Generational.",
    why: 'Every matching pair of rows becomes a row. Geisel: 3 × 2 = 6. SDSC: 2 × 1 = 2. Zoom and Price Center have no partner. Total: 8.' },
  q14: { type: "str", ans: ["elite"], show: '`"elite"`',
    glaze: "One sneaky or, a totally different answer. Professor Chi reads every condition twice.",
    why: '`8 >= 3` is True, so the whole `or` condition is True and the function returns "elite" right away. With `or`, every number takes the first branch. It should have been `and`.' },
  q15: { type: "num", ans: 2, show: "2",
    glaze: "Two rings from one loop. Professor Chi has more than that from Week 1 OH alone.",
    why: 'x takes 1, 4, 7 (10 is excluded). 1 is odd: −1. 4 is even: 3. 7 is odd: 2. Including 10 by mistake gives 12.' },
  q16: { type: "num", ans: 0.67232, tol: 0.001, show: "1 − 0.8⁵ ≈ 0.672",
    glaze: "Asking twice is how learning works. Professor Chi is always happy to explain it again.",
    why: 'Complement: P(at least one) = 1 − P(none) = 1 − 0.8⁵ = 0.67232. Using 1 − 0.2⁵ instead is the complement of "all five need it", a different event.' },
  q17: { type: "num", ans: 0.35, show: "0.35",
    glaze: "Professor Chi's Zoom diagrams hit harder than most people's in-person ones.",
    why: 'Split into in-person-and-diagram plus Zoom-and-diagram. Multiplication rule: 0.6 × 0.25 + 0.4 × 0.5 = 0.15 + 0.20 = 0.35. Averaging 0.25 and 0.5 ignores that in-person is more common.' },
  q18: { type: "choice", ans: "C",
    glaze: "P(solved | Professor Chi) = 1. No simulation needed.",
    why: 'Given "quick", the quick questions are the whole universe, so divide by how many are quick. The numerator counts questions that are both. The second option is P(quick | solved).' },
  q19: { type: "choice", ans: "B",
    glaze: "No repeats. Professor Chi's shout-outs are limited edition.",
    why: '"Different" means no repeats, so draw 3 without replacement. The number of repetitions belongs to the for-loop, not the sample size.' }
};

function norm(s) { return String(s ?? "").trim().replace(/^["']+|["']+$/g, "").replace(/\s+/g, " ").toLowerCase(); }

function parseNum(s) {
  const t = String(s ?? "").trim().replace(/,/g, "");
  const frac = t.match(/^(-?\d*\.?\d+)\s*\/\s*(\d*\.?\d+)$/);
  if (frac) return +frac[1] / +frac[2];
  return /^-?(\d+\.?\d*|\.\d+)(e-?\d+)?$/i.test(t) ? +t : NaN;
}

export function check(id, raw) {
  const k = KEY[id];
  if (!k) return false;
  if (k.type === "num") { const x = parseNum(raw); return Number.isFinite(x) && Math.abs(x - k.ans) <= (k.tol ?? 1e-9); }
  if (k.type === "choice") return norm(raw) === k.ans.toLowerCase();
  return k.ans.includes(norm(raw));
}
