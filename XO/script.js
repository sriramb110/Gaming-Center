const board = document.getElementById("board");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("resetBtn");

let currentPlayer = "X";
let gameActive = false;
let mode = ""; // "player" or "system"

let gameState = ["", "", "", "", "", "", "", "", ""];

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// ----------------------------
//     SET GAME MODE
// ----------------------------
function setMode(selectedMode) {
  mode = selectedMode;
  statusText.textContent = mode === "player" ? "2 Player Mode: Player X Turn" : "Playing vs System: Your Turn (X)";
  createBoard();
  gameActive = true;
}

// ----------------------------
//     CREATE BOARD
// ----------------------------
function createBoard() {
  board.innerHTML = "";
  gameState = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.setAttribute("data-index", i);
    cell.addEventListener("click", handleCellClick);
    board.appendChild(cell);
  }
}

// ----------------------------
//     HANDLE CELL CLICK
// ----------------------------
function handleCellClick(event) {
  if (!gameActive || mode === "") return;

  const index = event.target.getAttribute("data-index");

  if (gameState[index] !== "") return;

  gameState[index] = currentPlayer;
  event.target.textContent = currentPlayer;

  if (checkResult()) return;

  // If playing with system, let system play after user (X)
  if (mode === "system" && currentPlayer === "X") {
    currentPlayer = "O";
    statusText.textContent = "System Thinking...";
    setTimeout(systemMove, 500); // delay for real feel
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer} Turn`;
  }
}

// ----------------------------
//     SYSTEM (AI) MOVE
// ----------------------------
function systemMove() {
  if (!gameActive) return;

  // 1. Pick random empty cell
  const emptyCells = gameState.map((val, idx) => (val === "" ? idx : null)).filter((val) => val !== null);

  const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];

  // 2. Make move
  gameState[randomIndex] = "O";
  document.querySelector(`[data-index="${randomIndex}"]`).textContent = "O";

  // 3. Check win/draw
  if (checkResult()) return;

  currentPlayer = "X";
  statusText.textContent = "Your Turn (X)";
}

// ----------------------------
//     CHECK RESULT
// ----------------------------
function checkResult() {
  for (let combo of winningCombos) {
    const [a, b, c] = combo;

    if (gameState[a] && gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
      statusText.textContent = `Player ${currentPlayer} Wins! 🎉`;
      gameActive = false;
      return true;
    }
  }

  if (!gameState.includes("")) {
    statusText.textContent = "It's a Draw! 😐";
    gameActive = false;
    return true;
  }

  return false;
}

// ----------------------------
//     RESET GAME
// ----------------------------
resetBtn.addEventListener("click", () => {
  if (mode === "") {
    statusText.textContent = "Select Game Mode";
    return;
  }
  createBoard();
  gameActive = true;

  statusText.textContent = mode === "player" ? "2 Player Mode: Player X Turn" : "Playing vs System: Your Turn (X)";
});
