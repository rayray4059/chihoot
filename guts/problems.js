// The 19 Chihoot questions, reworked for a Guts round. No answers here: those live in key.js,
// which only the host page loads. Ids match the question numbers in ../index.html.
// type: "num" and "str" get a text box (hint shown above it); "choice" keeps the four options.
const P = {
  q1: { lec: 3, topic: "Strings", type: "str", hint: "The resulting string",
    text: 'Professor Chi\'s nameplate is s = "**Chi-GOAT**". What does this evaluate to?',
    code: 's.strip("*C").split("-")[0]' },
  q2: { lec: 3, topic: "Arrays", type: "num", hint: "A number",
    text: "Professor Chi's minutes per question, in array form. What does this evaluate to?",
    code: '(np.arange(5, 25, 5) * 2 - 10).mean()' },
  q3: { lec: 5, topic: "Querying", type: "str", hint: "The name of the type",
    text: "What is the data type of this expression?",
    code: 'oh.get("minutes") > 5' },
  q4: { lec: 4, topic: "DataFrames", type: "choice",
    text: "oh has the default index 0, 1, 2, … What does this return?",
    code: 'oh.sort_values("rating", ascending=False).get("student").loc[0]',
    opts: ['The student who rated Professor Chi highest', 'The student who rated Professor Chi lowest', 'The student in the first row of the original oh', 'An error'] },
  q5: { lec: 5, topic: "Querying", type: "choice",
    text: 'Which expression evaluates to the number of questions Professor Chi solved? ("solved" is a bool column)',
    opts: ['`oh.get("solved").count()`', '`oh.get("solved").sum()`', '`oh[oh.get("solved")].shape[1]`', '`oh[oh.get("solved") == True].shape`'] },
  q6: { lec: 5, topic: "Querying", type: "choice",
    text: "What happens when you run this?",
    code: 'oh[oh.get("minutes") > 5 & oh.get("rating") > 4]',
    opts: ['Questions over 5 min with rating over 4', 'Questions over 5 min OR rating over 4', 'An empty DataFrame', 'An error'] },
  q7: { lec: 6, topic: "Grouping", type: "choice",
    text: "What does this evaluate to?",
    code: 'oh.get(["location", "rating"]).groupby("location")\n  .mean().get("rating").iloc[-1]',
    opts: ['The highest average rating of any location', 'The average rating at the alphabetically last location', 'The rating in the last row of oh', 'The name of Professor Chi\'s best location'] },
  q8: { lec: 6, topic: "Visualization", type: "choice",
    text: "You want to compare the DISTRIBUTION of minutes spent on solved vs. unsolved questions. Which visualization is best?",
    opts: ['Overlaid density histograms of minutes', 'Bar chart of mean minutes, solved vs. unsolved', 'Scatter plot of minutes vs. solved', 'Line plot of minutes vs. solved'] },
  q9: { lec: 7, topic: "Histograms", type: "num", hint: "A whole number",
    text: "A density histogram of minutes for Professor Chi's 200 questions has bins [2, 4), [4, 6), [6, 10]. The [4, 6) bar has height 0.15 and the [6, 10] bar has height 0.05. How many questions took at least 2 but less than 4 minutes?" },
  q10: { lec: 7, topic: "Histograms", type: "num", hint: "A decimal",
    text: "Same 200 questions, redrawn as a density histogram with bins [2, 6), [6, 10]. What is the height of the [2, 6) bar?" },
  q11: { lec: 8, topic: "Functions & apply", type: "str", hint: "The value, as Python would display it",
    text: 'In oh.get("minutes").apply(hype), what is the entry for a 7-minute question?',
    code: 'def hype(m):\n    if m > 5:\n        print("Chi cooked")\n    else:\n        return "quick W"' },
  q12: { lec: 9, topic: "Grouping on multiple columns", type: "num", hint: "A whole number",
    text: "oh has 5 locations. Every location has solved questions, and exactly one location has NO unsolved questions. How many rows does this have?",
    code: 'oh.groupby(["location", "solved"]).count()' },
  q13: { lec: 9, topic: "Merging", type: "num", hint: "A whole number",
    text: 'In oh, "Geisel" appears 3 times, "SDSC" 2 times, "Zoom" 1 time. In snacks (snacks Professor Chi brought to OH), "Geisel" appears 2 times, "SDSC" 1 time, "Price Center" 4 times. How many rows does this have?',
    code: 'oh.merge(snacks, on="location")' },
  q14: { lec: 10, topic: "Conditionals", type: "str", hint: "The returned string",
    text: "What does glaze_level(8) return?",
    code: 'def glaze_level(m):\n    if m >= 3 or m < 6:\n        return "elite"\n    elif m >= 6:\n        return "GOAT"\n    return "great"' },
  q15: { lec: 10, topic: "Iteration", type: "num", hint: "A number",
    text: "What is rings after the loop?",
    code: 'rings = 0\nfor x in np.arange(1, 10, 3):\n    if x % 2 == 0:\n        rings = rings + x\n    else:\n        rings = rings - 1' },
  q16: { lec: 11, topic: "Probability", type: "num", hint: "A decimal, rounded to 3 places",
    text: "Each student independently has a 0.2 chance of needing Professor Chi to explain something twice. Out of 5 students, what is P(at least one needs a second explanation)?" },
  q17: { lec: 11, topic: "Probability", type: "num", hint: "A decimal",
    text: "60% of Professor Chi's questions are in person and 40% are on Zoom. In person, Professor Chi draws a diagram 25% of the time; on Zoom, 50% of the time. What is P(a random question gets a diagram)?" },
  q18: { lec: 11, topic: "Conditional probability", type: "choice",
    text: "A question is chosen at random from oh. Which expression gives P(solved | quick)?",
    code: 'is_solved = oh.get("solved")\nis_quick = oh.get("minutes") < 4',
    opts: ['`(is_solved & is_quick).sum() / oh.shape[0]`', '`(is_solved & is_quick).sum() / is_solved.sum()`', '`(is_solved & is_quick).sum() / is_quick.sum()`', '`is_solved.sum() / is_quick.sum()`'] },
  q19: { lec: 12, topic: "Simulation", type: "choice",
    text: "At the end of OH, Professor Chi shouts out 3 DIFFERENT random students. In a simulation, which call draws one set of shout-outs?",
    code: 'students = np.array(oh.get("student"))',
    opts: ['`np.random.choice(students, 3, replace=True)`', '`np.random.choice(students, 3, replace=False)`', '`np.random.choice(students, repetitions, replace=False)`', '`np.random.choice(3, students, replace=False)`'] }
};
for (const id in P) P[id].id = id;

// One topic per set, in lecture order; within a set, roughly easiest first. q9 must come
// before q10 (q10 reuses q9's data). pts is per problem. If you change the number of sets,
// extend the submitted/$set chain in database.rules.json to match.
export const SETS = [
  { name: "Strings, arrays & DataFrames", pts: 10, problems: [P.q2, P.q1, P.q4] },
  { name: "Querying", pts: 11, problems: [P.q3, P.q5, P.q6] },
  { name: "Grouping & visualization", pts: 12, problems: [P.q8, P.q7, P.q12] },
  { name: "Histograms & apply", pts: 13, problems: [P.q11, P.q9, P.q10] },
  { name: "Merging & control flow", pts: 14, problems: [P.q15, P.q14, P.q13] },
  { name: "Probability & simulation", pts: 15, problems: [P.q19, P.q16, P.q17, P.q18] }
];

export const PROBLEMS = SETS.flatMap(s => s.problems);
// Display number (P1, P2, …) and set index for each problem id
export const NUM = {}, SET_OF = {};
SETS.forEach((s, i) => s.problems.forEach(p => { SET_OF[p.id] = i; NUM[p.id] = PROBLEMS.indexOf(p) + 1; }));
