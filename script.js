const PLAYER_X_CLASS = "x";
const PLAYER_O_CLASS = "circle";
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const cellElements = document.querySelectorAll("[data-cell]");
const boardElement = document.getElementById("board");
const winningMessageElement = document.getElementById("winningMessage");
const restartButton = document.getElementById("restartButton");
const winningMessageTextElement = document.getElementById("winningMessageText");
let isPlayer_O_Turn = false;

startGame();

restartButton.addEventListener("click", startGame);

function startGame() {
  isPlayer_O_Turn = false;
  cellElements.forEach((cell) => {
    cell.classList.remove(PLAYER_X_CLASS);
    cell.classList.remove(PLAYER_O_CLASS);
    cell.removeEventListener("click", handleCellClick);
    cell.addEventListener("click", handleCellClick, { once: true });
  });
  setBoardHoverClass();
  winningMessageElement.classList.remove("show");
}

function handleCellClick(e) {
  const cell = e.target;
  const currentClass = isPlayer_O_Turn ? PLAYER_O_CLASS : PLAYER_X_CLASS;
  placeMark(cell, currentClass); //calling placeMark function.
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setBoardHoverClass();
  }
}
//currentClass variable saves the character X or O.
//endGame() is used to check if someone has already won by comparing the winning combinations to the gameplay.

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = "It's a draw!";
  } else {
    winningMessageTextElement.innerText = `Player with ${
      isPlayer_O_Turn ? "O's" : "X's"
    } wins!`;
  }
  winningMessageElement.classList.add("show");
}

function isDraw() {
  return [...cellElements].every((cell) => {
    return (
      cell.classList.contains(PLAYER_X_CLASS) ||
      cell.classList.contains(PLAYER_O_CLASS)
    );
  });
}
//This returns the value in case the is a draw.
//the every method checks all the elements of an array to confirm a condition by returning a boolean value.
//It is usually defined as an array which tests the elements of an array and returns true(1) if they pass the test.

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}
//Places the character in the cell, currentClass being either X or O depending on whose turn it is.

function swapTurns() {
  isPlayer_O_Turn = !isPlayer_O_Turn;
}
//This function is the one which swaps the turns after the character is placed in a cell.

function setBoardHoverClass() {
  boardElement.classList.remove(PLAYER_X_CLASS);
  boardElement.classList.remove(PLAYER_O_CLASS);
  if (isPlayer_O_Turn) {
    boardElement.classList.add(PLAYER_O_CLASS);
  } else {
    boardElement.classList.add(PLAYER_X_CLASS);
  }
}
//Makes a character appear in the cells while hovering over them with the mouse cursor before placing them.

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}
//This will check if our board matches any of the winning combinations.
