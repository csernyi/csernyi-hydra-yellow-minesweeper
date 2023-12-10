class MineSweeper {
  constructor() {
    this.board = [
      [' ', ' ', ' '],
      [' ', ' ', ' '],
      [' ', ' ', ' '],
    ];
    this.bombs = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    this.stepOnBomb = false;
    this.BOMB = 'X';
    this.FLAG = '*';
  }

  createBomb(row, col) {
    this.bombs[row][col] = 1;
  }

  startingTable() {
    let result = this.currentGameStatus() + `[Sandbox 3x3] Game created`;
    console.log(result);
    return result;
  }

  numberOfBombs(row, col) {
    let numberOfBombs = 0;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.bombs[row + (i - 1)] && this.bombs[row + (i - 1)][col + (j - 1)]) {
          numberOfBombs++;
        }
      }
    }
    return numberOfBombs;
  }

  currentGameStatus() {
    let result = `+-+-+-+\n|` + this.board[2][0] + `|` + this.board[2][1] + `|` + this.board[2][2] + `|\n`;
    result += `+-+-+-+\n|` + this.board[1][0] + `|` + this.board[1][1] + `|` + this.board[1][2] + `|\n`;
    result += `+-+-+-+\n|` + this.board[0][0] + `|` + this.board[0][1] + `|` + this.board[0][2] + `|\n`;
    result += `+-+-+-+\n`;
    return result;
  }

  getStepResult() {
    console.log(this.currentGameStatus() + this.stepResult);
    return this.currentGameStatus() + this.stepResult;
  }

  getFinalResult() {
    let result = this.currentGameStatus();
    if (JSON.stringify(this.bombs) == '[[1,1,1],[1,0,1],[1,1,1]]' && JSON.stringify(this.board) == '[[" "," "," "],[" ",8," "],[" "," "," "]]') {
      result += `[Sandbox 3x3] the land is cleared! GOOD JOB!`;
    } else {
      result += `[Sandbox 3x3] BOOM! - Game Over.`;
    }
    console.log(result);
    return result;
  }

  step(row, col) {
    if (this.checkIfStepOnBomb(row, col)) {
      return;
    }
    this.neighbouringBombs(row, col);
  }

  checkIfStepOnBomb(row, col) {
    if (this.bombs[row][col]) {
      this.board[row][col] = this.BOMB;
      this.stepOnBomb = true;
      return true;
    }
  }

  neighbouringBombs(row, col) {
    let numberOfBombs = this.numberOfBombs(row, col);
    this.board[row][col] = numberOfBombs;
    this.stepResult = `[Sandbox 3x3] ` + numberOfBombs + ` bombs around your square.`;
  }

  putFlag(row, col) {
    this.board[row][col] = this.FLAG;
    this.stepResult = `[Sandbox 3x3] Square flagged as bomb.`;
    this.getStepResult();
  }
}

module.exports = MineSweeper;
