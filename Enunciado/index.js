const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('#gameStatus');
const restartBtn = document.querySelector('#restartBtn');
const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let options = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let running = false;

initializeGame();

function initializeGame() {
  cells.forEach((cell) => cell.addEventListener('click', cellClicked));
  restartBtn.addEventListener('click', restartGame);
  statusText.textContent = `É a vez do ${currentPlayer}`;
  running = true;
}

function cellClicked() {
  const cellIndex = this.getAttribute('cellIndex');

  if (options[cellIndex] != '' || !running) {
    return;
  }

  updateCell(this, cellIndex);
  checkWinner();
}

function updateCell(cell, index) {
  options[index] = currentPlayer;
  cell.textContent = currentPlayer;
}

function changePlayer() {
  currentPlayer = currentPlayer == 'X' ? 'O' : 'X';
  statusText.textContent = `É a vez do ${currentPlayer}`;
}

function checkWinner() {
  let roundWon = false;

  // Verificar se estão reunidas as condições para haver um vencedor
  for (let combo of winConditions) {
    const [a, b, c] = combo;
    const cellA = options[a];
    const cellB = options[b];
    const cellC = options[c];
    if (cellA == '' || cellB == '' || cellC == ''){
        continue
    }
    if (cellA && cellA === cellB && cellA === cellC) {
        roundWon = true;
        break;
    }
  }

  if (roundWon) {
    statusText.textContent = `${currentPlayer} ganhou o jogo!`;
  } else if (!options.includes('')) {
    statusText.textContent = 'Empate';
  } else {
    changePlayer();
  }
}

function restartGame() {
  currentPlayer = 'X';
  options = ['', '', '', '', '', '', '', '', ''];
  statusText.textContent = `É a vez do ${currentPlayer}`;
  cells.forEach((cell) => (cell.textContent = ''));
  running = true;
}
