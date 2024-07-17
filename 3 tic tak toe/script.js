const X_CLASS = 'x';
const O_CLASS = 'o';
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const restartButton = document.getElementById('restartButton');
const playerXScoreElement = document.getElementById('playerXScore');
const playerOScoreElement = document.getElementById('playerOScore');
const drawScoreElement = document.getElementById('drawScore');

let circleTurn;
let playerXScore = 0;
let playerOScore = 0;
let drawScore = 0;
let roundCount = 0;

startGame();

restartButton.addEventListener('click', startGame);

function startGame() {
    circleTurn = false;
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
    setBoardHoverClass();
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = circleTurn ? O_CLASS : X_CLASS;
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false, currentClass);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        setBoardHoverClass();
    }
}

function endGame(draw, currentClass) {
    if (draw) {
        drawScore++;
        drawScoreElement.innerText = drawScore;
    } else {
        if (currentClass === X_CLASS) {
            playerXScore++;
            playerXScoreElement.innerText = playerXScore;
        } else {
            playerOScore++;
            playerOScoreElement.innerText = playerOScore;
        }
    }
    roundCount++;
    if (roundCount < 5) {
        startGame();
    } else {
        declareWinner();
    }
}

function declareWinner() {
    let winner;
    if (playerXScore > playerOScore) {
        winner = 'Player X';
    } else if (playerOScore > playerXScore) {
        winner = 'Player O';
    } else {
        winner = 'No one, it\'s a draw';
    }
    alert(`${winner} wins the game!`);
    resetScores();
}

function resetScores() {
    playerXScore = 0;
    playerOScore = 0;
    drawScore = 0;
    roundCount = 0;
    playerXScoreElement.innerText = playerXScore;
    playerOScoreElement.innerText = playerOScore;
    drawScoreElement.innerText = drawScore;
    startGame();
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
    });
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function swapTurns() {
    circleTurn = !circleTurn;
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS);
    board.classList.remove(O_CLASS);
    if (circleTurn) {
        board.classList.add(O_CLASS);
    } else {
        board.classList.add(X_CLASS);
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        });
    });
}
