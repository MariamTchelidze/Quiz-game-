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
  // 1
  {
    code: "<h1>Hello</h2>",
    question: "Why is this HTML code incorrect?",
    options: ["Missing attribute", "Wrong closing tag", "Wrong element", "Nothing"],
    answer: 1,
  },
  // 2
  {
    code: "<p>Paragraph",
    question: "Why is this HTML code incomplete?",
    options: ["Wrong tag", "Missing class", "Nothing", "Missing closing tag"],
    answer: 3,
  },
  // 3
  {
    code: "<img src='img.png'>",
    question: "What important attribute is missing for accessibility?",
    options: ["class", "width", "alt attribute", "Nothing"],
    answer: 2,
  },
  // 4
  {
    code: "<ul><li>Item<li></ul>",
    question: "Why is this HTML list incorrect?",
    options: ["Wrong list type", "Invalid HTML structure", "Missing closing </li> tag", "Nothing"],
    answer: 2,
  },
  // 5
  {
    code: "<button>Click</buton>",
    question: "Why is this HTML code incorrect?",
    options: ["Missing id", "Wrong text", "Typo in closing tag", "Nothing"],
    answer: 2,
  },
  // 6
  {
    code: "<input></input>",
    question: "Why is this HTML input element incorrect?",
    options: ["Wrong type", "Input is a void element and should not have a closing tag", "Missing name", "Nothing"],
    answer: 1,
  },
  // 7
  {
    code: "<a href='link'>Go",
    question: "Why is this HTML link incomplete?",
    options: ["Wrong href", "Missing target", "Nothing", "Missing closing tag"],
    answer: 3,
  },
  // 8
  {
    code: "<div><p></div></p>",
    question: "Why is this HTML structure incorrect?",
    options: ["Missing class", "Wrong tag", "Wrong nesting", "Nothing"],
    answer: 2,
  },
  // 9
  {
    code: "h1 { color red; }",
    question: "Why is this CSS rule incorrect?",
    options: ["Wrong color", "Wrong selector", "Missing colon", "Nothing"],
    answer: 2,
  },
  // 10
  {
    code: ".box { margin:10px padding:5px; }",
    question: "Why is this CSS not working correctly?",
    options: ["Wrong unit", "Missing semicolon", "Wrong selector", "Nothing"],
    answer: 1,
  },
  // 11
  {
    code: ".container { justify-content:center; }",
    question: "Why doesn't justify-content work here?",
    options: ["Wrong property", "Missing padding", "Needs display: flex", "Nothing"],
    answer: 2,
  },
  // 12
  {
    code: "p { font-size:20 }",
    question: "Why doesn't the font size work?",
    options: ["Wrong selector", "Wrong property", "Missing unit", "Nothing"],
    answer: 2,
  },
  // 13
  {
    code: ".box { width:100px; width:200px; }",
    question: "What will be the final width of the element?",
    options: ["100px", "200px", "Both apply", "It will not work"],
    answer: 1,
  },
  // 14
  {
    code: "p { color:#zzzzzz }",
    question: "Why is this color value not working?",
    options: ["Missing px", "Invalid color", "Wrong selector", "Nothing"],
    answer: 1,
  },
  // 15
  {
    code: ".container { display:flex; align-item:center; }",
    question: "Why doesn't the alignment work in this flex container?",
    options: ["Missing value", "Wrong selector", "Typo in property name", "Nothing"],
    answer: 2,
  },
  // 16
  {
    code: ".box { display:block; justify-content:center; }",
    question: "Why doesn't justify-content work in this code?",
    options: ["Needs display: flex", "Wrong property", "Missing padding", "Nothing"],
    answer: 0,
  },
  // 17
  {
    code: ".item { position: absolute; }",
    question: "What determines where this element is positioned?",
    options: ["Nearest positioned parent", "Viewport only", "Width of element", "Nothing"],
    answer: 0,
  },
  // 18
  {
    code: "* { margin: 0; padding: 0; box-sizing: border-box; }",
    question: "What does box-sizing: border-box mean?",
    options: [
      "Padding is added outside the width",
      "Width ignores padding",
      "It centers the element",
      "Padding is included in the element's width",
    ],
    answer: 3,
  },
  // 19
  {
    code: ".hidden { display:none } <div class='Hidden'>",
    question: "Why is the container still visible?",
    options: ["Wrong property", "Case mismatch", "Missing id", "Nothing"],
    answer: 1,
  },
  // 20
  {
    code: ":root { --main-color: blue; } .text { color: var(main-color); }",
    question: "Why doesn't the color apply?",
    options: ["Wrong selector", "Variable must be inside .text", "Missing -- in var()", "Nothing"],
    answer: 2,
  },
  // 21
  {
    code: "* { margin: 0; padding: 0; box-sizing: border-box; }",
    question: "What does * mean in this context?",
    options: [
      "Universal selector (selects all elements)",
      "Selects only div elements",
      "Selects elements with class *",
      "Selects the body element only",
    ],
    answer: 0,
  },
  // 22
  {
    code: ".btn:hover { color:red }",
    question: "When will the text turn red?",
    options: ["Always", "On hover", "On click", "Never"],
    answer: 1,
  },
  // 23
  {
    code: ".container { display:flex } .child { margin:auto }",
    question: "What happens to the child element inside this flex container?",
    options: [
      "It moves to the left side",
      "It stretches to full width",
      "It is centered inside the container",
      "Nothing changes",
    ],
    answer: 2,
  },
  // 24
  {
    code: ".container { } .box { height: 100%; }",
    question: "What is missing for height: 100% to work?",
    options: ["Display flex", "Parent needs height", "Padding", "Nothing"],
    answer: 1,
  },
  // 25
  {
    code: ".text { overflow: hidden; }",
    question: "What happens if the content is bigger than the container?",
    options: ["Content becomes scrollable", "Nothing changes", "Content moves outside", "Content is cut off"],
    answer: 3,
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
