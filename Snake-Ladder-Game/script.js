let position = 1;

const snakes = {
  17: 7,
  54: 34,
  62: 19,
  64: 60,
  87: 24,
  93: 73,
  95: 75,
  99: 79,
};

const ladders = {
  1: 38,
  4: 14,
  9: 31,
  21: 42,
  71: 91,
  80: 100,
};

const player = document.getElementById("player");
const diceBox = document.getElementById("dice");
const rollBtn = document.getElementById("rollBtn");

rollBtn.onclick = () => {
  let dice = Math.floor(Math.random() * 6) + 1;

  // animate dice
  diceBox.innerHTML = "🎲";
  setTimeout(() => (diceBox.innerHTML = dice), 300);

  movePlayer(dice);
};

function movePlayer(dice) {
  let newPos = position + dice;
  if (newPos > 100) return;

  position = newPos;

  // check ladder
  if (ladders[position]) {
    position = ladders[position];
  }

  // check snake
  if (snakes[position]) {
    position = snakes[position];
  }

  updatePlayerPosition();
}

function updatePlayerPosition() {
  // number 1–100 grid
  let row = Math.floor((position - 1) / 10);
  let col = (position - 1) % 10;

  // reverse direction on alternate rows
  if (row % 2 === 1) col = 9 - col;

  let x = col * 50; // board cell size
  let y = row * 50;

  player.style.left = x + 15 + "px";
  player.style.bottom = y + 15 + "px";
}
