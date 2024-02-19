let board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];

let w; 
let h; 

let ai = 'X';
let human = 'O';
let currentPlayer = human;
let winningCombination = null;

function setup() {
  createCanvas(400, 400);
  w = width / 3;
  h = height / 3;
  bestMove();
}

function equals3(a, b, c) {
  return a == b && b == c && a != '';
}

function checkWinner() {
  let winner = null;

  // horizontal
  for (let i = 0; i < 3; i++) {
    if (equals3(board[i][0], board[i][1], board[i][2])) {
      winner = board[i][0];
      winningCombination = [[i, 0], [i, 1], [i, 2]];
    }
  }

  // Vertical
  for (let i = 0; i < 3; i++) {
    if (equals3(board[0][i], board[1][i], board[2][i])) {
      winner = board[0][i];
      winningCombination = [[0, i], [1, i], [2, i]];
    }
  }

  // Diagonal
  if (equals3(board[0][0], board[1][1], board[2][2])) {
    winner = board[0][0];
    winningCombination = [[0, 0], [1, 1], [2, 2]];
  }
  if (equals3(board[2][0], board[1][1], board[0][2])) {
    winner = board[2][0];
    winningCombination = [[2, 0], [1, 1], [0, 2]];
  }

  let openSpots = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] == '') {
        openSpots++;
      }
    }
  }

  if (winner == null && openSpots == 0) {
    return 'tie';
  } else {
    return winner;
  }
}

function mousePressed() {
  console.log(mouseX, mouseY);
  if (currentPlayer == human) {
    // Human make turn
    let i = floor(mouseY / h);
    let j = floor(mouseX / w);
    console.log("human ", i, j)
    // If valid turn
    if (board[i][j] == '') {
      board[i][j] = human;
      currentPlayer = ai;
      bestMove();
    }
  }
}

function draw() {
  background(255);
  strokeWeight(4);

  line(w, 0, w, height);
  line(w * 2, 0, w * 2, height);
  line(0, h, width, h);
  line(0, h * 2, width, h * 2);

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let y = w * i + w / 2;
      let x = h * j + h / 2;

      let spot = board[i][j];
      textSize(32);
      let r = w / 4;
      if (spot == human) {
        noFill();
        ellipse(x, y, r * 2);
      } else if (spot == ai) {
        line(x - r, y - r, x + r, y + r);
        line(x + r, y - r, x - r, y + r);
      }
    }
  }

  let result = checkWinner();
  if (result != null) {
    noLoop();
    let resultP = createP('');
    resultP.style('font-size', '40px');
    resultP.style('color', '#000099');
    resultP.style('font-size', '50px');

    if (result == 'tie') {
      resultP.html('Its a tie!');
    } else {
      resultP.html(`${result} won!`);
      if (winningCombination !== null) {
        strokeWeight(10);
        stroke(0, 255, 0);
        noFill();
        beginShape();
        for (let [i, j] of winningCombination) {
          let y = w * i + w / 2;
          let x = h * j + h / 2;
          vertex(x, y);
        }
        endShape();
      }
    }
  }
}
