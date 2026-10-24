// Answer cards laid out like the solo game's reveal: question, then a banner, the answer,
// the explanation, and Chi Watch. Used by answer-key.html and the host's projector view.
import { NUM } from "./problems.js";
import { KEY, RIGHT_BARS } from "./key.js";
import { esc, md, LETTERS } from "./text.js";

export function shortAnswer(p) {
  const k = KEY[p.id];
  if (!k) return '<span class="err">missing from key.js</span>';
  if (k.type === "choice") return `<b>${k.ans}</b> · ${md(p.opts[LETTERS.indexOf(k.ans)])}`;
  return md(k.show);
}

export function accepted(p) {
  const k = KEY[p.id];
  if (!k) return "";
  if (k.type === "num") return k.tol ? `Accepts anything within ±${k.tol} of ${k.ans}.` : `Accepts ${k.ans} written any way (e.g. ${k.ans}.0, or a fraction).`;
  if (k.type === "str") return `Accepts: ${k.ans.map(a => `<code>${esc(a)}</code>`).join(", ")} (case and quotes ignored).`;
  return "";
}

// extra: optional HTML placed under the answer line (the host uses it for team results).
export function answerCardHTML(p, set, extra = "") {
  const k = KEY[p.id] || {};
  const n = +p.id.slice(1);
  const choices = p.type === "choice"
    ? `<ol>${p.opts.map((o, i) => `<li class="${LETTERS[i] === k.ans ? "right" : ""}">${md(o)}${LETTERS[i] === k.ans ? " ✓" : ""}</li>`).join("")}</ol>` : "";
  return `<article class="ak">
    <div class="pmeta">P${NUM[p.id]} · ${set.pts} pts · Lecture ${p.lec} · ${esc(p.topic)} · Chihoot Q${n}</div>
    <h3>${md(esc(p.text))}</h3>
    ${p.code ? `<pre>${esc(p.code)}</pre>` : ""}
    ${choices}
    <section class="ak-reveal">
      <div class="bar"><span>${esc(RIGHT_BARS[(n - 1) % RIGHT_BARS.length])}</span><span>+${set.pts}</span></div>
      <div class="body">
        <div class="ans">Answer: <b>${shortAnswer(p)}</b>${p.type === "choice" ? "" : `<br><small class="muted">${accepted(p)}</small>`}</div>
        ${extra}
        ${k.why ? `<p class="why">${md(k.why)}</p>` : ""}
        ${k.img ? `<img class="why-img" src="${esc(k.img)}" alt="${esc(k.imgAlt || "")}">` : ""}
        ${k.glaze ? `<p class="glaze"><span class="avatar" aria-hidden="true">PC</span><span><span class="lbl">Chi Watch</span>${esc(k.glaze)}</span></p>` : ""}
      </div>
    </section>
  </article>`;
}
