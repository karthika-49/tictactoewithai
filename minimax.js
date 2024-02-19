// Define a higher-order function for memoization
function memoize(func) {
  let cache = {}; // Cache to store computed results
  return function() {
      let args = JSON.stringify(arguments); // Convert arguments to a string for use as a cache key
      if (cache[args]) {
          return cache[args]; // If the result is already cached, return it
      } else {
          let result = func.apply(this, arguments); // Otherwise, compute the result
          cache[args] = result; // Cache the result
          return result;
      }
  };
}
let scores = {
  X: 10,
  O: -10,
  tie: 0
};
// Define your minimax function
let minimax = memoize(function(board, depth, alpha, beta, isMaximizing) {
  let result = checkWinner();
  if (result !== null) {
      return scores[result];
  }

  if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
              if (board[i][j] == '') {
                  board[i][j] = ai;
                  let score = minimax(board, depth + 1, alpha, beta, false);
                  board[i][j] = '';
                  bestScore = Math.max(score, bestScore);
                  alpha = Math.max(alpha, score);
                  if (beta <= alpha)
                      break;
              }
          }
      }
      return bestScore;
  } else {
      let bestScore = Infinity;
      for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
              if (board[i][j] == '') {
                  board[i][j] = human;
                  let score = minimax(board, depth + 1, alpha, beta, true);
                  board[i][j] = '';
                  bestScore = Math.min(score, bestScore);
                  beta = Math.min(beta, score);
                  if (beta <= alpha)
                      break;
              }
          }
      }
      return bestScore;
  }
});

// Define your bestMove function
function bestMove() {
  let bestScore = -Infinity;
  let move;
  for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
          if (board[i][j] == '') {
              board[i][j] = ai;
              let score = minimax(board, 0, -Infinity, Infinity, false);
              board[i][j] = '';
              if (score > bestScore) {
                  bestScore = score;
                  move = { i, j };
              }
          }
      }
  }
  board[move.i][move.j] = ai;
  currentPlayer = human;
}

// Define scores and other variables

// Now, you can use memoized minimax function in your code
