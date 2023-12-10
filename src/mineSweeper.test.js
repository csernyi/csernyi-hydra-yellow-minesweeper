const MineSweeper = require('./mineSweeper');

describe('US1 - Board creation', () => {
  it('(UAT-1) Given a new game When I start it Then Game created screen appears with a 3x3 empty grid. Game board: ( , , , , , , , , )', () => {
    const game = new MineSweeper();
    expect(game.startingTable()).toBe('+-+-+-+\n| | | |\n+-+-+-+\n| | | |\n+-+-+-+\n| | | |\n+-+-+-+\n[Sandbox 3x3] Game created');
  });
});
