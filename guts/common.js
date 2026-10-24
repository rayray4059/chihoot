import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { firebaseConfig } from "./firebase-config.js";
import { esc } from "./text.js";

export { esc, md, LETTERS, sheetHTML } from "./text.js";

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

export function slug(s) { return String(s).toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 24); }

export function fmtClock(ms) {
  if (!(ms > 0)) return "0:00";
  const s = Math.ceil(ms / 1000);
  return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0");
}


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
