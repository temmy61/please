/* =========================================================
   PIXEL CAT ART
   half-grid (8 cols) mirrored into a 16-col symmetric cat
   . = transparent  K = outline  W = white fur
   B = eye          P = pink blush / nose / paw
========================================================= */
const catHalf = [
  "........",
  "...K....",
  "..KWK...",
  ".KWWK...",
  ".KWWWWK.",
  "KWWWWWWW",
  "KWWWBWWW",
  "KWWWWPWW",
  "KWWWWWPP",
  "KWWWWWWW",
  ".KWWWWWW",
  "..KWWWWW",
  "..KWPWWW",
  "..KKWWWK",
];

const colorMap = {
  ".": "transparent",
  "K": "#3a1530",
  "W": "#ffffff",
  "B": "#241019",
  "P": "#ff8fc0",
};

function buildCat() {
  const container = document.getElementById("pixelCat");
  const rows = catHalf.length;
  const cols = catHalf[0].length * 2;
  container.style.gridTemplateColumns = `repeat(${cols}, 8px)`;
  container.style.gridTemplateRows = `repeat(${rows}, 8px)`;
  container.style.width = `${cols * 8}px`;
  container.style.height = `${rows * 8}px`;

  catHalf.forEach((row) => {
    const fullRow = row + row.split("").reverse().join("");
    fullRow.split("").forEach((ch) => {
      const px = document.createElement("div");
      px.className = "pixel";
      px.style.background = colorMap[ch] || "transparent";
      container.appendChild(px);
    });
  });
}
buildCat();

/* =========================================================
   SPARKLES
========================================================= */
function spawnSparkles(count = 28) {
  const layer = document.getElementById("sparkles");
  for (let i = 0; i < count; i++) {
    const s = document.createElement("div");
    s.className = "sparkle";
    s.textContent = Math.random() > 0.5 ? "✦" : "✧";
    s.style.left = `${Math.random() * 100}%`;
    s.style.top = `${Math.random() * 100}%`;
    s.style.animationDelay = `${Math.random() * 2.4}s`;
    s.style.fontSize = `${8 + Math.random() * 10}px`;
    layer.appendChild(s);
  }
}
spawnSparkles();

/* =========================================================
   CONFETTI
========================================================= */
function launchConfetti() {
  const layer = document.getElementById("confetti");
  const colors = ["#ff2f92", "#ff5fae", "#ffd6ea", "#ffffff", "#ff9ecf", "#ffb6dd"];
  const pieces = 130;

  for (let i = 0; i < pieces; i++) {
    const piece = document.createElement("div");
    piece.className = "confetti-piece";
    const size = 6 + Math.random() * 8;
    piece.style.width = `${size}px`;
    piece.style.height = `${size * 0.5}px`;
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    const duration = 2.2 + Math.random() * 1.8;
    piece.style.animationDuration = `${duration}s`;
    piece.style.animationDelay = `${Math.random() * 0.4}s`;
    layer.appendChild(piece);
    setTimeout(() => piece.remove(), (duration + 0.5) * 1000);
  }
}

/* =========================================================
   YES / NO INTERACTION LOGIC
========================================================= */
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const buttonRow = document.getElementById("buttonRow");
const taunt = document.getElementById("taunt");
const cat = document.getElementById("cat");
const frame = document.getElementById("frame");
const question = document.getElementById("question");

const YES_BASE_FONT = 13;
const YES_BASE_PAD_V = 14;
const YES_BASE_PAD_H = 22;

const NO_BASE_FONT = 11;
const NO_BASE_PAD_V = 12;
const NO_BASE_PAD_H = 18;

// Start the YES button a little smaller than its normal size
let yesScale = 0.72;
let noScale = 1;
let noClicks = 0;
let answered = false;

const taunts = [
  "Are you sure?",
  "Really sure?",
  "Please?",
  "Think again...",
  "Pretty please?",
  "Don't break my heart 💔",
  "Last chance!",
  "You know you want to.",
  "Fine... 😢",
];

const MAX_NO_CLICKS = 12;
const MAX_YES_SCALE = 5.2;

function applyYesSize() {
  const f = Math.min(yesScale, MAX_YES_SCALE);
  yesBtn.style.fontSize = `${YES_BASE_FONT * f}px`;
  yesBtn.style.padding = `${YES_BASE_PAD_V * f}px ${YES_BASE_PAD_H * f}px`;
}

function applyNoSize() {
  const f = Math.max(noScale, 0.22);
  noBtn.style.fontSize = `${NO_BASE_FONT * f}px`;
  noBtn.style.padding = `${NO_BASE_PAD_V * f}px ${NO_BASE_PAD_H * f}px`;
}

function moveNoButton() {
  const rowRect = buttonRow.getBoundingClientRect();
  const range = 90; // "nearby" jump distance
  const dx = (Math.random() - 0.5) * range;
  const dy = (Math.random() - 0.5) * range * 0.7;
  noBtn.style.position = "relative";
  noBtn.style.transform = `translate(${dx}px, ${dy}px)`;
}

function setTaunt(text, big = false) {
  taunt.textContent = text;
  taunt.classList.toggle("yay", big);
  taunt.style.animation = "none";
  // restart pop-in animation
  void taunt.offsetWidth;
  taunt.style.animation = "";
}

function triggerYes(auto = false) {
  if (answered) return;
  answered = true;

  noBtn.style.display = "none";
  question.style.display = "none";

  cat.classList.add("happy");
  frame.classList.add("happy");

  launchConfetti();

  setTaunt(auto ? "I'll take that as a YES ❤️" : "Yay!! ❤️", true);
}

yesBtn.addEventListener("click", () => triggerYes(false));

noBtn.addEventListener("click", () => {
  if (answered) return;

  noClicks++;

  // grow YES ~20%, shrink NO a little
  yesScale *= 1.2;
  noScale *= 0.85;
  applyYesSize();
  applyNoSize();
  moveNoButton();

  const msgIndex = Math.min(noClicks - 1, taunts.length - 1);
  setTaunt(taunts[msgIndex]);

  if (noClicks >= MAX_NO_CLICKS) {
    setTimeout(() => triggerYes(true), 250);
  }
});

// set the initial (smaller) YES size and normal NO size on load
applyYesSize();
applyNoSize();
