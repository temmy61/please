const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const message = document.getElementById("message");
const cat = document.querySelector(".cat");
const sparkles = document.getElementById("sparkles");

const messages = [
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

let noCount = 0;
let completed = false;

function createSparkles() {
  for (let i = 0; i < 24; i += 1) {
    const sparkle = document.createElement("span");
    sparkle.className = "sparkle";
    sparkle.style.left = `${Math.random() * 100}vw`;
    sparkle.style.top = `${Math.random() * 100}vh`;
    sparkle.style.animationDelay = `${Math.random() * 2}s`;
    sparkles.appendChild(sparkle);
  }
}

function launchConfetti() {
  for (let i = 0; i < 28; i += 1) {
    const piece = document.createElement("div");
    piece.className = "confetti-piece";
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.top = "-20px";
    piece.style.background = ["#ff79b0", "#fff", "#ffd166", "#ff6b6b"][i % 4];
    piece.style.setProperty("--x", `${(Math.random() - 0.5) * 180}px`);
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 1600);
  }
}

function celebrateYes() {
  if (completed) return;
  completed = true;
  document.body.classList.add("accepted");
  yesBtn.classList.add("huge");
  noBtn.classList.add("tiny");
  noBtn.style.display = "none";
  cat.classList.add("happy");
  message.textContent = "Yay!! ❤️";
  launchConfetti();
}

function handleNoClick() {
  if (completed) return;

  noCount += 1;

  if (noCount < messages.length) {
    message.textContent = messages[noCount - 1];
  } else {
    message.textContent = "Fine... 😢";
  }

  const currentScale = 1 + noCount * 0.04;
  yesBtn.style.transform = `scale(${currentScale})`;
  yesBtn.classList.add("grow");
  setTimeout(() => yesBtn.classList.remove("grow"), 180);

  noBtn.style.transform = `scale(${Math.max(0.55, 0.9 - noCount * 0.03)})`;
  noBtn.classList.add("shrink");
  setTimeout(() => noBtn.classList.remove("shrink"), 180);

  const rect = yesBtn.getBoundingClientRect();
  const moveX = (Math.random() - 0.5) * Math.min(180, 24 + noCount * 12);
  const moveY = (Math.random() - 0.5) * Math.min(120, 20 + noCount * 8);
  noBtn.style.position = "absolute";
  noBtn.style.left = `${Math.min(Math.max(rect.left + moveX, 16), window.innerWidth - 92)}px`;
  noBtn.style.top = `${Math.min(Math.max(rect.top + moveY, 16), window.innerHeight - 60)}px`;

  if (noCount >= 8) {
    yesBtn.classList.add("huge");
  }

  if (noCount >= 12) {
    message.textContent = "I'll take that as a YES ❤️";
    celebrateYes();
  }
}

yesBtn.addEventListener("click", celebrateYes);
noBtn.addEventListener("click", handleNoClick);

createSparkles();
