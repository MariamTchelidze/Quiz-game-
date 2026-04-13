const levelsContainer = document.getElementById("levels");
const frodo = document.getElementById("frodo");

const quizBox = document.getElementById("quizBox");
const codeEl = document.getElementById("code");
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");

const winScreen = document.getElementById("lotrWin");
const gameOverScreen = document.getElementById("lotrGameOver");

let currentLevel = 0;
let unlockedLevel = 0;
let answered = false;
let lives = 3;

const bgMusic = document.getElementById("bgMusic");
const effectMusic = document.getElementById("effectMusic");
let hasSwitchedToBattle = false;

// Introduction pop-up:
function startGame() {
  const intro = document.getElementById("introScreen");

  intro.style.opacity = "0";

  setTimeout(() => {
    intro.style.display = "none";

    const game = document.getElementById("game");
    game.classList.remove("hidden");
  }, 400);
  document.getElementById("introScreen").classList.add("hidden");

  //  Music:
  bgMusic.src = "./assets/Audios/main theme - The Lord Of The Rings.mp3";
  bgMusic.volume = 0.3;
  bgMusic.currentTime = 0;
  bgMusic.play().catch(() => {});
  highlightLevel(0);
  goToLevel(0);
}

// Level positioning on tree:
const positions = [
  { x: 50, y: 88 },

  { x: 35, y: 85 },
  { x: 65, y: 85 },

  { x: 25, y: 78 },
  { x: 75, y: 78 },

  { x: 40, y: 70 },
  { x: 60, y: 70 },

  { x: 20, y: 64 },
  { x: 80, y: 64 },

  { x: 35, y: 57 },
  { x: 65, y: 57 },

  { x: 15, y: 50 },
  { x: 85, y: 50 },

  { x: 30, y: 43 },
  { x: 70, y: 43 },

  { x: 45, y: 43 },
  { x: 67, y: 30 },

  { x: 35, y: 28 },
  { x: 25, y: 28 },

  { x: 50, y: 20 },

  { x: 20, y: 15 },
  { x: 70, y: 15 },

  { x: 30, y: 10 },

  { x: 65, y: 10 },

  { x: 50, y: 8 },
];

// Levels:
positions.forEach((pos, i) => {
  const lvl = document.createElement("div");
  lvl.classList.add("level");
  lvl.textContent = i + 1;
  lvl.style.left = pos.x + "%";
  lvl.style.top = pos.y + "%";
  lvl.onclick = () => {
    if (i <= unlockedLevel) {
      goToLevel(i);
    }
  };
  levelsContainer.appendChild(lvl);
});

// frodo mover to next level:
function goToLevel(index) {
  currentLevel = index;
  const pos = positions[index];
  frodo.style.left = pos.x + "%";
  frodo.style.top = pos.y + "%";
  highlightLevel(index);
  showQuestion(index);
}

// level circle highlight:
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
// 25 Question:
const questions = [
  {
    code: "<h1>Hello</h2>",
    question: "What is wrong?",
    options: ["Wrong closing tag", "Missing attribute", "Wrong element", "Nothing"],
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
    options: ["Centers element", "Wrong selector", "Missing padding", "Nothing"],
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

// Questions changer
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

// Answer Checker: true/false
function checkAnswer(btn, selected) {
  if (answered) return;

  answered = true;

  const correct = questions[currentLevel].answer;
  const buttons = answersEl.querySelectorAll("button");

  buttons.forEach((b) => (b.disabled = true));

  // Progress
  if (currentLevel === unlockedLevel) {
    unlockedLevel++;
  }

  if (selected === correct) {
    btn.classList.add("correct");
  } else {
    btn.classList.add("wrong");
    buttons[correct].classList.add("correct");

    lives--;
    updateLivesUI();

    //  Music Changer -- hope youtube will not sue me :D
    if (!hasSwitchedToBattle) {
      bgMusic.src = "assets/Audios/main theme-After Mistake-King of The Dead.mp3";
      bgMusic.volume = 0.4;
      bgMusic.currentTime = 0;
      bgMusic.play();
      hasSwitchedToBattle = true;
    }
  }

  setTimeout(() => {
    if (lives === 0) {
      showGameOver();
      return;
    }

    if (currentLevel === positions.length - 1) {
      showWin();
    } else {
      answered = false;
      goToLevel(currentLevel + 1);
    }
  }, 700);
}
// lives tracker
function updateLivesUI() {
  const livesEls = document.querySelectorAll(".life");
  livesEls.forEach((el, index) => {
    if (index >= lives) {
      el.classList.add("lost");
    } else {
      el.classList.remove("lost");
    }
  });

  if (lives === 1) {
    const warning = document.getElementById("warningText");
    warning.textContent = "Take heed, my friend… but one chance remains. The shadow of the Dark Lord draws near.";
    warning.classList.remove("hidden");
  }
}
// Sauron Wins - The game is over: pop up window
function showGameOver() {
  quizBox.classList.add("hidden");
  document.getElementById("lotrGameOver").classList.remove("hidden");

  // Sauron audio plays
  bgMusic.pause();
  effectMusic.src = "assets/Audios/Theme song - Game Over - There is no life in the void only death.mp3";
  effectMusic.volume = 0.6;
  effectMusic.currentTime = 0;
  effectMusic.play();
}

// After 3 mistakes, fellowship loses... player starts the game from 1st level:
function resetGame() {
  /* stop all audio */
  bgMusic.pause();
  bgMusic.currentTime = 0;

  effectMusic.pause();
  effectMusic.currentTime = 0;

  /* reset game state */
  hasSwitchedToBattle = false;

  /* main theme player */
  bgMusic.src = "assets/Audios/ambient.mp3"; // 🔥 გირჩევ rename
  bgMusic.volume = 0.3;
  bgMusic.play().catch(() => {});

  /* reset game state */
  currentLevel = 0;
  unlockedLevel = 0;
  lives = 3;
  answered = false;

  /* HIDE POPUPS */
  document.getElementById("lotrGameOver").classList.add("hidden");
  document.getElementById("lotrWin").classList.add("hidden");

  /* show quiz */
  quizBox.classList.remove("hidden");

  /* reset lives */
  const livesEls = document.querySelectorAll(".life");
  livesEls.forEach((el) => el.classList.remove("lost"));

  /* Warning text reset*/
  const warning = document.getElementById("warningText");
  if (warning) {
    warning.classList.add("hidden");
    warning.textContent = ""; // 🔥 ძალიან მნიშვნელოვანია
  }

  /* Back to first level */
  highlightLevel(0);
  goToLevel(0);
}

// Winner's pop up window
function showWin() {
  quizBox.classList.add("hidden");
  document.getElementById("lotrWin").classList.remove("hidden");
  // Victory Audio - Aragorn words "You bow to no one"
  bgMusic.pause();
  effectMusic.src = "assets/Audios/main theme - Winner - You bow to no one.mp3";
  effectMusic.volume = 0.6;
  effectMusic.currentTime = 0;
  effectMusic.play();
}
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    // if music was playing before hiding, we want to resume it when the user comes back
    wasPlayingBeforeHide = !bgMusic.paused;

    bgMusic.pause();
    effectMusic.pause();
  } else {
    const isGameOverVisible = !document.getElementById("lotrGameOver").classList.contains("hidden");

    const isWinVisible = !document.getElementById("lotrWin").classList.contains("hidden");

    if (isGameOverVisible || isWinVisible) return;

    // if music was playing before hiding, we want to resume it when the user comes back
    if (wasPlayingBeforeHide) {
      bgMusic.play().catch(() => {});
    }
  }
});
// Game starting
highlightLevel(0);
goToLevel(0);
