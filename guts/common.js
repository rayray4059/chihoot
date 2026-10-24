import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { firebaseConfig } from "./firebase-config.js";

export { signInAnonymously, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
export { ref, onValue, get, set, update, remove, serverTimestamp, onDisconnect } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

export const configured = !/PASTE_/.test(JSON.stringify(firebaseConfig));

// Each page gets its own named app so a host login and a player's anonymous login
// in the same browser don't overwrite each other.
export function connect(name) {
  const app = initializeApp(firebaseConfig, name);
  const db = getDatabase(app);
  let offset = 0;
  onValue(ref(db, ".info/serverTimeOffset"), s => { offset = s.val() || 0; });
  return { auth: getAuth(app), db, serverNow: () => Date.now() + offset };
}

export function esc(s) { return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;"); }
// `code` spans in authored strings; other HTML (like <b>) is authored by us
export function md(s) { return String(s).replace(/`([^`]+)`/g, (_, c) => "<code>" + esc(c) + "</code>"); }

export function slug(s) { return String(s).toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 24); }

export function fmtClock(ms) {
  if (!(ms > 0)) return "0:00";
  const s = Math.ceil(ms / 1000);
  return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0");
}

export const LETTERS = "ABCD";

export const SHAPES = [
  '<svg class="shape" viewBox="0 0 30 30" aria-hidden="true"><path d="M15 3 L28 26 H2 Z" fill="#1b1024"/></svg>',
  '<svg class="shape" viewBox="0 0 30 30" aria-hidden="true"><path d="M15 2 L28 15 L15 28 L2 15 Z" fill="#1b1024"/></svg>',
  '<svg class="shape" viewBox="0 0 30 30" aria-hidden="true"><circle cx="15" cy="15" r="12" fill="#1b1024"/></svg>',
  '<svg class="shape" viewBox="0 0 30 30" aria-hidden="true"><rect x="4" y="4" width="22" height="22" fill="#1b1024"/></svg>'
];

// Higher score first; ties go to the team whose last submission came earlier.
export function ranked(board) {
  return Object.entries(board || {}).map(([id, b]) => ({ id, ...b })).sort((a, b) =>
    (b.score || 0) - (a.score || 0) || (a.last || Infinity) - (b.last || Infinity) || String(a.name).localeCompare(String(b.name)));
}

export function boardHTML(board, mine, nSets) {
  const rows = ranked(board);
  if (!rows.length) return '<p class="muted">No teams yet.</p>';
  return `<ol class="lb">${rows.map((r, i) => `<li class="${r.id === mine ? "me" : ""}">
    <span class="rk">${i + 1}</span><span class="nm">${esc(r.name || r.id)}</span>
    <span class="pg">${r.progress || 0}/${nSets} sets</span><span class="sc">${r.score || 0}</span></li>`).join("")}</ol>`;
}

export function setupHTML() {
  return `<section class="panel"><div class="eyebrow">Setup needed</div>
    <h2 class="title">Guts mode isn't connected yet</h2>
    <p class="muted">Paste your Firebase config into <code>guts/firebase-config.js</code>. The README's "Guts mode" section walks through it.</p></section>`;
}

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
