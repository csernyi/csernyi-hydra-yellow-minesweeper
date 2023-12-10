const MineSweeper = require('./mineSweeper');

describe('US1 - Board creation', () => {
  it('(UAT-1) Given a new game When I start it Then Game created screen appears with a 3x3 empty grid. Game board: ( , , , , , , , , )', () => {
    const game = new MineSweeper();
    expect(game.startingTable()).toBe('+-+-+-+\n| | | |\n+-+-+-+\n| | | |\n+-+-+-+\n| | | |\n+-+-+-+\n[Sandbox 3x3] Game created');
  });
});

describe('US2 - Bomb placement and lose cases', () => {
  it('Given an empty board When I add bomb to 1,1 Then bomb is registered on the bomb table. Bomb board: (0,0,0,0,1,0,0,0,0)', () => {
    const game = new MineSweeper();
    game.createBomb(1, 1);
    expect(game.bombs).toEqual(
      expect.arrayContaining([
        [0, 0, 0],
        [0, 1, 0],
        [0, 0, 0],
      ]),
    );
  });
  it('(UAT-2) Given a board with bombs (1,1) When I step on 1,1 Then Game Over screen appears. Game board: ( , , , ,X, , , , )', () => {
    const game = new MineSweeper();
    game.startingTable();
    game.createBomb(1, 1);
    game.step(1, 1);
    expect(game.getFinalResult()).toBe('+-+-+-+\n| | | |\n+-+-+-+\n| |X| |\n+-+-+-+\n| | | |\n+-+-+-+\n[Sandbox 3x3] BOOM! - Game Over.');
  });
});

describe('US3 - Revealing numbered fields next to bombs and marking the bombs', () => {
  it('Given a board with bombs (1,1) When I step on 1,0 Then 1 bombs around your square screen appears. Game board: ( , , ,1, , , , , )', () => {
    const game = new MineSweeper();
    game.startingTable();
    game.createBomb(1, 1);
    game.step(1, 0);
    expect(game.getStepResult()).toBe('+-+-+-+\n| | | |\n+-+-+-+\n|1| | |\n+-+-+-+\n| | | |\n+-+-+-+\n[Sandbox 3x3] 1 bombs around your square.');
  });
});
