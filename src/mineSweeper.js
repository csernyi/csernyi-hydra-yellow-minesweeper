class MineSweeper {
  constructor() {
    this.bombs = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
  }

  createBomb(row, col) {
    this.bombs[row][col] = 1;
  }

  startingTable() {
    let result = '+-+-+-+\n| | | |\n+-+-+-+\n| | | |\n+-+-+-+\n| | | |\n+-+-+-+\n' + `[Sandbox 3x3] Game created`;
    console.log(result);
    return result;
  }
}

module.exports = MineSweeper;
