const levelsContainer = document.getElementById("levels");
const detective = document.getElementById("detective");

const quizBox = document.getElementById("quizBox");
const codeEl = document.getElementById("code");
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");

const winScreen = document.getElementById("win");
const gameOverScreen = document.getElementById("gameOver");

let currentLevel = 0;
let unlockedLevel = 0;
let answered = false;

// Introscreen
function startGame() {
  const intro = document.getElementById("introScreen");

  intro.style.opacity = "0";

  setTimeout(() => {
    intro.style.display = "none";

    const game = document.getElementById("game");
    game.classList.remove("hidden");
  }, 400);

  highlightLevel(0);
  goToLevel(0);
}
/* POSITIONS */
const positions = [
  { x: 500, y: 650 }, // 1

  { x: 350, y: 600 },
  { x: 650, y: 600 }, // 2-3

  { x: 250, y: 550 },
  { x: 750, y: 550 }, // 4-5

  { x: 400, y: 500 },
  { x: 600, y: 500 }, // 6-7

  { x: 200, y: 450 },
  { x: 800, y: 450 }, // 8-9

  { x: 350, y: 400 },
  { x: 650, y: 400 }, // 10-11

  { x: 150, y: 350 },
  { x: 850, y: 350 }, // 12-13

  { x: 300, y: 300 },
  { x: 700, y: 300 }, // 14-15

  { x: 450, y: 250 },
  { x: 550, y: 250 }, // 16-17

  { x: 350, y: 200 },
  { x: 650, y: 200 }, // 18-19

  { x: 500, y: 150 }, // 20

  { x: 400, y: 110 },
  { x: 600, y: 110 }, // 21-22

  { x: 450, y: 70 }, // 23

  { x: 550, y: 70 }, // 24 🆕

  { x: 500, y: 30 }, // 25 🆕 (top boss level)
];
/* CREATE LEVELS */
positions.forEach((pos, i) => {
  const lvl = document.createElement("div");
  lvl.classList.add("level");
  lvl.textContent = i + 1;

  lvl.style.left = pos.x + "px";
  lvl.style.top = pos.y + "px";

  lvl.onclick = () => {
    if (i <= unlockedLevel) {
      goToLevel(i);
    }
  };

  levelsContainer.appendChild(lvl);
});

/* MOVE */
function goToLevel(index) {
  currentLevel = index;

  const pos = positions[index];

  detective.style.left = pos.x + 30 + "px";
  detective.style.top = pos.y + 25 + "px";

  highlightLevel(index);
  showQuestion(index);
}

/* HIGHLIGHT */
function highlightLevel(index) {
  document.querySelectorAll(".level").forEach((lvl, i) => {
    lvl.classList.toggle("active", i === index);

    if (i > unlockedLevel) {
      lvl.classList.add("locked");
    } else {
      lvl.classList.remove("locked");
    }
  });
}

/* QUESTIONS */
const questions = [
  {
    code: "<h1>Hello</h2>",
    question: "What is wrong?",
    options: [
      "Wrong closing tag",
      "Missing attribute",
      "Wrong element",
      "Nothing",
    ],
    answer: 0,
  },
  {
    code: "<p>Paragraph",
    question: "What is wrong?",
    options: ["Missing closing tag", "Wrong tag", "Missing class", "Nothing"],
    answer: 0,
  },
  {
    code: "<img src='img.png'>",
    question: "What is missing?",
    options: ["alt attribute", "class", "width", "Nothing"],
    answer: 0,
  },
  {
    code: "<ul><li>Item<li></ul>",
    question: "What is wrong?",
    options: ["Missing closing li tag", "Wrong list", "Wrong HTML", "Nothing"],
    answer: 0,
  },
  {
    code: "<button>Click</buton>",
    question: "What is wrong?",
    options: ["Typo", "Missing id", "Wrong text", "Nothing"],
    answer: 0,
  },
  {
    code: "<input></input>",
    question: "What is wrong?",
    options: ["Should not close", "Wrong type", "Missing name", "Nothing"],
    answer: 0,
  },
  {
    code: "<a href='link'>Go",
    question: "What is wrong?",
    options: ["Missing closing tag", "Wrong href", "Missing target", "Nothing"],
    answer: 0,
  },
  {
    code: "<div><p></div></p>",
    question: "What is wrong?",
    options: ["Wrong nesting", "Missing class", "Wrong tag", "Nothing"],
    answer: 0,
  },
  {
    code: "h1 { color red; }",
    question: "What is wrong?",
    options: ["Missing colon", "Wrong color", "Wrong selector", "Nothing"],
    answer: 0,
  },
  {
    code: ".box { margin:10px padding:5px; }",
    question: "What is wrong?",
    options: ["Missing semicolon", "Wrong unit", "Wrong selector", "Nothing"],
    answer: 0,
  },
  {
    code: ".container { justify-content:center; }",
    question: "Why no effect?",
    options: ["Needs flex", "Wrong property", "Missing padding", "Nothing"],
    answer: 0,
  },
  {
    code: "p { font-size:20 }",
    question: "What is wrong?",
    options: ["Missing unit", "Wrong selector", "Wrong property", "Nothing"],
    answer: 0,
  },
  {
    code: ".box { width:100px; width:200px; }",
    question: "Issue?",
    options: ["Override", "Wrong unit", "Missing height", "Nothing"],
    answer: 0,
  },
  {
    code: "p { color:#zzzzzz }",
    question: "What is wrong?",
    options: ["Invalid color", "Missing px", "Wrong selector", "Nothing"],
    answer: 0,
  },
  {
    code: ".container { display:flex; align-item:center; }",
    question: "What is wrong?",
    options: ["Typo", "Missing value", "Wrong selector", "Nothing"],
    answer: 0,
  },
  {
    code: ".box { display:block; justify-content:center; }",
    question: "Why no work?",
    options: ["Needs flex", "Wrong property", "Missing padding", "Nothing"],
    answer: 0,
  },
  {
    code: ".item { position:absolute; }",
    question: "Missing?",
    options: ["Parent position", "Wrong property", "Missing width", "Nothing"],
    answer: 0,
  },
  {
    code: ".box { width:100%; padding:20px; }",
    question: "Why overflow?",
    options: ["Box-sizing", "Wrong width", "Missing margin", "Nothing"],
    answer: 0,
  },
  {
    code: ".container { display:flex } .item { width:100% }",
    question: "Issue?",
    options: ["Flex overflow", "Wrong display", "Missing padding", "Nothing"],
    answer: 0,
  },
  {
    code: ".hidden { display:none } <div class='Hidden'>",
    question: "Why visible?",
    options: ["Case mismatch", "Wrong property", "Missing id", "Nothing"],
    answer: 0,
  },
  {
    code: ".box { z-index:10 }",
    question: "Why no work?",
    options: ["Needs position", "Wrong value", "Missing px", "Nothing"],
    answer: 0,
  },
  {
    code: ".btn:hover { color:red }",
    question: "Issue?",
    options: ["Only hover", "Wrong color", "Missing px", "Nothing"],
    answer: 0,
  },
  {
    code: ".container { display:flex } .child { margin:auto }",
    question: "Result?",
    options: [
      "Centers element",
      "Wrong selector",
      "Missing padding",
      "Nothing",
    ],
    answer: 0,
  },
  {
    code: ".box { height:100% }",
    question: "Why no height?",
    options: ["Parent no height", "Wrong property", "Missing px", "Nothing"],
    answer: 0,
  },
  {
    code: ".text { overflow:hidden }",
    question: "What happens?",
    options: ["Content cut", "Wrong property", "Missing padding", "Nothing"],
    answer: 0,
  },
];

/* SHOW */
function showQuestion(index) {
  const q = questions[index];

  answered = false;

  quizBox.classList.remove("hidden");

  codeEl.textContent = q.code;
  questionEl.textContent = q.question;
  answersEl.innerHTML = "";

  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.textContent = opt;

    btn.onclick = () => checkAnswer(btn, i, index);

    answersEl.appendChild(btn);
  });
}

/* CHECK */
function checkAnswer(btn, selected, index) {
  if (answered) return;

  answered = true;

  const correct = questions[index].answer;
  const buttons = answersEl.querySelectorAll("button");

  buttons.forEach((b) => (b.disabled = true));

  if (selected === correct) {
    btn.classList.add("correct");

    if (currentLevel === unlockedLevel) unlockedLevel++;

    setTimeout(() => {
      /* 🔥 აქ ხდება WIN CHECK */
      if (currentLevel === positions.length - 1) {
        showWin();
      } else {
        goToLevel(currentLevel + 1);
      }
    }, 600);
  } else {
    btn.classList.add("wrong");
    buttons[correct].classList.add("correct");

    setTimeout(() => {
      showGameOver();
    }, 1000);
  }
}

/* GAME OVER */
function showGameOver() {
  quizBox.classList.add("hidden");
  document.getElementById("lotrGameOver").classList.remove("hidden");
}

/* RESET */
function resetGame() {
  gameOverScreen.classList.add("hidden");

  currentLevel = 0;
  unlockedLevel = 0;

  highlightLevel(0);
  goToLevel(0);
}

/* WIN */
function showWin() {
  quizBox.classList.add("hidden");
  document.getElementById("lotrWin").classList.remove("hidden");
}

/* START */
highlightLevel(0);
goToLevel(0);
