// Game variables
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let isGameOver = false;

// Winning combinations
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// DOM elements
const cells = document.querySelectorAll('.cell');
const newGameBtn = document.getElementById('new-game-btn');
const modal = document.getElementById('modal');
const winnerMessage = document.getElementById('winner-message');
const closeModal = document.querySelector('.close');

// Handle cell click
cells.forEach(cell => {
  cell.addEventListener('click', () => {
    const index = cell.getAttribute('data-index');

    // If cell is already filled or game is over, do nothing
    if (board[index] || isGameOver) return;

    // Update board and UI
    board[index] = currentPlayer;
    cell.textContent = currentPlayer;

    // Check for win or draw
    if (checkWin()) {
      showWinner(`${currentPlayer} Wins!`);
      isGameOver = true;
    } else if (board.every(cell => cell)) {
      showWinner(`It's a Draw!`);
      isGameOver = true;
    } else {
      // Switch player
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  });
});

// Check for win
function checkWin() {
  return winningCombinations.some(combination => {
    return combination.every(index => board[index] === currentPlayer);
  });
}

// Show winner in modal
function showWinner(message) {
  winnerMessage.textContent = message;
  modal.style.display = 'flex';
}

// Close modal
closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Start a new game
newGameBtn.addEventListener('click', () => {
  board = ['', '', '', '', '', '', '', '', ''];
  currentPlayer = 'X';
  isGameOver = false;
  cells.forEach(cell => {
    cell.textContent = '';
  });
  modal.style.display = 'none';
});
