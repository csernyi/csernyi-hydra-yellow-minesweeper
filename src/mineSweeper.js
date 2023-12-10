class MineSweeper {
  startingTable() {
    let result = '+-+-+-+\n| | | |\n+-+-+-+\n| | | |\n+-+-+-+\n| | | |\n+-+-+-+\n' + `[Sandbox 3x3] Game created`;
    console.log(result);
    return result;
  }
}

module.exports = MineSweeper;
