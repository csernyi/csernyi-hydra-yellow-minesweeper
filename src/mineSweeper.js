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
  }

  createBomb(row, col) {
    this.bombs[row][col] = 1;
  }

  startingTable() {
    let result = this.currentGameStatus() + `[Sandbox 3x3] Game created`;
    console.log(result);
    return result;
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
    result += `[Sandbox 3x3] BOOM! - Game Over.`;
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
    let numberOfBombs = this.bombs[0].filter((x) => x == 1).length + this.bombs[1].filter((x) => x == 1).length + this.bombs[2].filter((x) => x == 1).length;
    this.board[row][col] = numberOfBombs;
    this.stepResult = `[Sandbox 3x3] ` + numberOfBombs + ` bombs around your square.`;
  }
}

module.exports = MineSweeper;
