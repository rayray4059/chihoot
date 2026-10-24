// Answer key, loaded only by host.html. The repo is public, so this isn't secret: what keeps
// the scoreboard honest is that only the host can write scores (see database.rules.json).
// num: |answer − ans| <= tol (default 1e-9); "1/5"-style fractions are accepted.
// str: quotes, extra spaces, and case are ignored; any string in ans counts.
// choice: the letter of the correct option.
// show is what players see after the reveal; `backticks` render as code.
export const KEY = {
  q1: { type: "str", ans: ["hi"], show: '`"hi"`',
    why: '`.strip("*C")` removes any leading or trailing characters in the <b>set</b> {*, C}, not the substring. The front loses "**C", the back loses "**", leaving "hi-GOAT". Split on "-" and take [0]: "hi".' },
  q2: { type: "num", ans: 15, show: "`15.0`",
    why: '`np.arange(5, 25, 5)` is [5, 10, 15, 20] since the stop value is excluded. Times 2 minus 10 gives [0, 10, 20, 30], with mean 15. Including 25 by mistake gives 20.' },
  q3: { type: "str", ans: ["series", "pd.series", "bpd.series", "boolean series", "bool series", "pandas series", "a series"], show: "Series",
    why: 'Comparing a Series to a number works element by element, giving a Boolean Series with one True/False per row. That is what goes inside the brackets when you query.' },
  q4: { type: "choice", ans: "C",
    why: 'Sorting moves rows but they keep their index labels. `.loc[0]` finds the row <b>labeled</b> 0, which is the original first row wherever it landed. For the top-rated row you need `.iloc[0]`.' },
  q5: { type: "choice", ans: "B",
    why: 'True counts as 1 in a sum. `.count()` counts every non-missing value, so all rows. `shape[1]` is the number of <b>columns</b>, and `.shape` is a tuple, not an integer.' },
  q6: { type: "choice", ans: "D",
    why: '`&` binds tighter than `>`, so Python tries `5 & oh.get("rating")` first, which errors. Each condition needs its own parentheses: `(cond1) & (cond2)`.' },
  q7: { type: "choice", ans: "B",
    why: '`.groupby` sorts its index alphabetically. Nothing here sorts by rating, so `.iloc[-1]` is just the alphabetically last location\'s mean rating.' },
  q8: { type: "choice", ans: "A",
    why: 'The distribution of a numerical variable calls for a histogram. Overlaid <b>density</b> histograms compare groups fairly even when they have very different sizes. A bar chart of means only shows the center.' },
  q9: { type: "num", ans: 100, show: "100",
    why: 'Area is proportion. [4, 6): 2 × 0.15 = 0.3. [6, 10]: 4 × 0.05 = 0.2. Total area is 1, so [2, 4) holds 0.5, and 0.5 × 200 = 100. Treating heights as proportions gives 160.' },
  q10: { type: "num", ans: 0.2, show: "0.2",
    why: '[2, 6) holds 0.5 + 0.3 = 0.8 of the data. Height = area ÷ width = 0.8 ÷ 4 = 0.2.' },
  q11: { type: "str", ans: ["none"], show: "`None`",
    why: '`print` shows text but returns nothing. A function that finishes without hitting a `return` returns `None`, and that is what `.apply` stores.' },
  q12: { type: "num", ans: 9, show: "9",
    why: 'Grouping on two columns makes one row per combination that actually appears. 5 locations × 2 values of solved = 10 possible, minus the one missing combination = 9.' },
  q13: { type: "num", ans: 8, show: "8",
    why: 'Every matching pair of rows becomes a row. Geisel: 3 × 2 = 6. SDSC: 2 × 1 = 2. Zoom and Price Center have no partner. Total: 8.' },
  q14: { type: "str", ans: ["elite"], show: '`"elite"`',
    why: '`8 >= 3` is True, so the whole `or` condition is True and the function returns "elite" right away. With `or`, every number takes the first branch. It should have been `and`.' },
  q15: { type: "num", ans: 2, show: "2",
    why: 'x takes 1, 4, 7 (10 is excluded). 1 is odd: −1. 4 is even: 3. 7 is odd: 2. Including 10 by mistake gives 12.' },
  q16: { type: "num", ans: 0.67232, tol: 0.001, show: "1 − 0.8⁵ ≈ 0.672",
    why: 'Complement: P(at least one) = 1 − P(none) = 1 − 0.8⁵ = 0.67232. Using 1 − 0.2⁵ instead is the complement of "all five need it", a different event.' },
  q17: { type: "num", ans: 0.35, show: "0.35",
    why: 'Split into in-person-and-diagram plus Zoom-and-diagram. Multiplication rule: 0.6 × 0.25 + 0.4 × 0.5 = 0.15 + 0.20 = 0.35. Averaging 0.25 and 0.5 ignores that in-person is more common.' },
  q18: { type: "choice", ans: "C",
    why: 'Given "quick", the quick questions are the whole universe, so divide by how many are quick. The numerator counts questions that are both. The second option is P(quick | solved).' },
  q19: { type: "choice", ans: "B",
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
