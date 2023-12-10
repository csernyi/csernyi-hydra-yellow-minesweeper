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
    this.BOMB = 'X';
  }

  createBomb(row, col) {
    this.bombs[row][col] = 1;
  }

  startingTable() {
    let result = '+-+-+-+\n| | | |\n+-+-+-+\n| | | |\n+-+-+-+\n| | | |\n+-+-+-+\n' + `[Sandbox 3x3] Game created`;
    console.log(result);
    return result;
  }

  currentGameStatus() {
    return '+-+-+-+\n| | | |\n+-+-+-+\n| |X| |\n+-+-+-+\n| | | |\n+-+-+-+\n';
  }

  getFinalResult() {
    let result = this.currentGameStatus();
    result += `[Sandbox 3x3] BOOM! - Game Over.`;
    console.log(result);
    return result;
  }

  step(row, col) {
    this.board[row][col] = this.BOMB;
  }
}

module.exports = MineSweeper;
