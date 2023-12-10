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
    this.firstStep = true;
    this.stepResult = '';
    this.stepOnBomb = false;
    this.BOMB = 'X';
    this.FLAG = '*';
    this.NOBOMBSNEAR = '_';
  }

  createBomb(row, col) {
    this.bombs[row][col] = 1;
  }

  startingTable() {
    let result = this.currentGameStatus() + `[Sandbox 3x3] Game created`;
    console.log(result);
    return result;
  }

  noEmptySpaceLeft() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.board[i][j] === ' ' && !this.bombs[i][j]) {
          return false;
        }
      }
    }
    return true;
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
    if (this.stepOnBomb) {
      result += `[Sandbox 3x3] BOOM! - Game Over.`;
    }
    if (this.noEmptySpaceLeft()) {
      result += `[Sandbox 3x3] the land is cleared! GOOD JOB!`;
    }
    console.log(result);
    return result;
  }

  step(row, col) {
    if (this.checkIfStepOnBomb(row, col)) {
      return;
    }
    if (this.firstStep == false) {
      console.log(this.currentGameStatus() + this.stepResult);
    }
    this.firstStep = false;
    this.neighbouringBombs(row, col);
    this.noBombsNearby(row, col);
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
    if (numberOfBombs > 0 && !this.noEmptySpaceLeft()) {
      this.board[row][col] = numberOfBombs;
      this.stepResult = `[Sandbox 3x3] ` + numberOfBombs + ` bombs around your square.`;
    }
  }

  noBombsNearby(row, col) {
    if (this.numberOfBombs(row, col) === 0) {
      this.board[row][col] = this.NOBOMBSNEAR;
      this.checkNeighbours(row, col);
    }
  }

  checkNeighbours(row, col) {
    for (let i = Math.max(row - 1, 0); i <= Math.min(row + 1, 2); i++) {
      for (let j = Math.max(col - 1, 0); j <= Math.min(col + 1, 2); j++) {
        if (this.board[i][j] === ' ' && !this.bombs[i][j]) {
          this.step(i, j);
        }
      }
    }
  }

  putFlag(row, col) {
    this.board[row][col] = this.FLAG;
    this.stepResult = `[Sandbox 3x3] Square flagged as bomb.`;
    this.getStepResult();
  }

  botPlay(numberOfBombs) {
    console.log(`Bot play started`);
    if (numberOfBombs > 3) {
      console.log(`Error: Max bomb number for 3x3 grid is 3`);
    } else {
      for (let i = 0; i < numberOfBombs; i++) {
        this.createBomb(0, i);
      }
      this.startingTable();
      this.step(1, 0);
    }
  }
}

module.exports = MineSweeper;
