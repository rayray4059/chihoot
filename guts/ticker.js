// The CHI WIRE news ticker from the solo game (GLAZE_TICKER in ../index.html). Fills #ticker on load.
const GLAZE_TICKER = [
  "<b>BREAKING:</b> Professor Chi answered a babypandas question before the student finished typing it",
  "<b>CONFIRMED:</b> Professor Chi's office hours run in O(1) time",
  "Professor Chi doesn't use <b>.loc</b> or <b>.iloc</b>. The rows come to Professor Chi.",
  "<b>REPORT:</b> Professor Chi fixed a KeyError just by looking at it",
  "Professor Chi can explain a merge in one sentence and a diagram",
  "The midterm is scared of Professor Chi, not the other way around",
  "<b>STAT:</b> 0 merges have ever had the wrong row count in Professor Chi's presence",
  "Professor Chi once explained density histograms so well the bars got shorter out of respect",
];

const el = document.getElementById("ticker");
if (el) el.innerHTML = GLAZE_TICKER.map(s => "<span>" + s + "</span>").join("");
