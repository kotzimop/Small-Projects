const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';

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

const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessageTextElement = document.querySelector(
  '[data-winning-text-message]'
);
const winningMessageElement = document.getElementById('winning-message');
const restartButton = document.getElementById('restartButton');
let circleTurn;

startGame();

restartButton.addEventListener('click', startGame);

function startGame() {
  circleTurn = false;
  cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once: true });
  });
  setBoardHoverClass();
  winningMessageElement.classList.remove('show');
}

function handleClick(e) {
  const cell = e.target;

  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;

  // placeMark
  placeMark(cell, currentClass);
  // Check For Win
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setBoardHoverClass();
  }
}

function isDraw() {
  // cellElements need to be deconstructured as they are a nodeList
  //   and nodeList does not have method every - only arrays have
  return [...cellElements].every(cell => {
    return (
      cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    );
  });
}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = 'Draw!';
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} wins`;
  }
  winningMessageElement.classList.add('show');
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurns() {
  circleTurn = !circleTurn;
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(CIRCLE_CLASS);

  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}

////////////////////////////////////////////////////////////////////
// HOW checkWIN works
/*
ON winning_combinations we call some function. 
The some() method tests whether at least one element in the array passes the test implemented by the provided function. 
It returns true if, in the array, it finds an element for which the provided function returns true; 
otherwise it returns false. It doesn't modify the array.

So we seek if there is one WINNING_COMBINATION.
Then we call every method.
The every() method tests whether all elements in the array pass the test implemented by the provided function. It returns a Boolean value.
Then on every combination we pass a callback function. index is looping the WINNING_COMBINATIONS array. It starts at [0, 1, 2]
SO index becomes 0 and then 1 and finally 2. it checks cellElements[0].classList.contains(currentClass) if true index becomes 1 and instantly checks
cellElements[1].classList.contains(currentClass) if false it stops and checks the next array [3, 4, 5] so index becomes 3 and checks 
cellElements[3].classList.contains(currentClass) and so on... Until it finds a winning combination meaning e.g [0,1,2] all return true
If found 3 true values in row it declares winner

cellElements is a nodelist as it comes from document.querySelectorAll so there is cellElement[0] and so on...

*/
function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}
