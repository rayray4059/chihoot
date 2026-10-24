// Text helpers and the data sheet. No Firebase here, so the printable pages can import this alone.
export function esc(s) { return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"); }
// `code` spans in authored strings; other HTML (like <b>) is authored by us
export function md(s) { return String(s).replace(/`([^`]+)`/g, (_, c) => "<code>" + esc(c) + "</code>"); }

export const LETTERS = "ABCD";

const SAMPLE = [
  ["Maya", "groupby", 3.5, 5.0, "Geisel", "True"],
  ["Diego", "merge", 8.0, 5.0, "SDSC", "True"],
  ["Priya", "histograms", 4.5, 4.9, "Zoom", "True"],
  ["Jordan", "for-loops", 2.0, 5.0, "Geisel", "True"],
  ["Ava", "probability", 11.5, 4.8, "Price Center", "False"]
];

export function sheetHTML() {
  return `<section class="sheet" aria-label="Data description">
    <h3>The data: <code style="font-family:var(--mono);color:var(--gold);font-size:18px;text-transform:none">oh</code></h3>
    <p>One row for every office-hours question Professor Chi answered this quarter. Assume <code>import babypandas as bpd</code> and <code>import numpy as np</code> have run.</p>
    <ul class="cols">
      <li><code>"student"</code> <span>(str) who asked</span></li>
      <li><code>"topic"</code> <span>(str) what it was about</span></li>
      <li><code>"minutes"</code> <span>(float) time Professor Chi spent on it</span></li>
      <li><code>"rating"</code> <span>(float) student's rating of the help, out of 5</span></li>
      <li><code>"location"</code> <span>(str) where OH happened</span></li>
      <li><code>"solved"</code> <span>(bool) whether it got solved</span></li>
    </ul>
    <div class="tbl-wrap"><table>
      <thead><tr><th></th><th>student</th><th>topic</th><th>minutes</th><th>rating</th><th>location</th><th>solved</th></tr></thead>
      <tbody>${SAMPLE.map((r, k) => `<tr><td>${k}</td><td>${r[0]}</td><td>${r[1]}</td><td class="num">${r[2].toFixed(1)}</td><td class="num">${r[3].toFixed(1)}</td><td>${r[4]}</td><td>${r[5]}</td></tr>`).join("")}</tbody>
    </table></div>
    <p>First five rows shown. The full DataFrame is much larger.</p>
  </section>`;
}
