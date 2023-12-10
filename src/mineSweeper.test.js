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
  it('(UAT-3) Given a board with bombs (0,1 1,0 1,1) When I step on 0,0 Then 3 bombs around your square screen appears. Game board: ( , , , , , ,3, , )', () => {
    const game = new MineSweeper();
    game.startingTable();
    game.createBomb(0, 1);
    game.createBomb(1, 0);
    game.createBomb(1, 1);
    game.step(0, 0);
    expect(game.getStepResult()).toBe('+-+-+-+\n| | | |\n+-+-+-+\n| | | |\n+-+-+-+\n|3| | |\n+-+-+-+\n[Sandbox 3x3] 3 bombs around your square.');
  });
  it('(UAT-4) Given a board with bombs (0,1 1,0 1,1) When I step on 0,0 and flag bomb fields around Then Square flagged as bomb screen appears. Game board: ( , , ,*,*, ,3,*, )', () => {
    const game = new MineSweeper();
    game.startingTable();
    game.createBomb(0, 1);
    game.createBomb(1, 0);
    game.createBomb(1, 1);
    game.step(0, 0);
    game.putFlag(0, 1);
    game.putFlag(1, 0);
    game.putFlag(1, 1);
    expect(game.getStepResult()).toBe('+-+-+-+\n| | | |\n+-+-+-+\n|*|*| |\n+-+-+-+\n|3|*| |\n+-+-+-+\n[Sandbox 3x3] Square flagged as bomb.');
  });
});

describe('US4 - Win cases', () => {
  it('Given a board with bombs (0,0 0,1 0,2 1,0 1,2 2,0 2,1 2,2) When I step on 1,1 Then the land is cleared! GOOD JOB! screen appears. Game board: ( , , , ,8, , , , )', () => {
    const game = new MineSweeper();
    game.startingTable();
    game.createBomb(0, 0);
    game.createBomb(0, 1);
    game.createBomb(0, 2);
    game.createBomb(1, 0);
    game.createBomb(1, 2);
    game.createBomb(2, 0);
    game.createBomb(2, 1);
    game.createBomb(2, 2);
    game.step(1, 1);
    expect(game.getFinalResult()).toBe('+-+-+-+\n| | | |\n+-+-+-+\n| |8| |\n+-+-+-+\n| | | |\n+-+-+-+\n[Sandbox 3x3] the land is cleared! GOOD JOB!');
  });
  it('(UAT-5) Given a board with bombs (0,1 1,0 1,1) When I step on 0,0, flag bomb fields around and step to all the remaining fields Then the land is cleared! GOOD JOB! screen appears. Game board: (2,2,1,*,*,2,3,*,2)', () => {
    const game = new MineSweeper();
    game.startingTable();
    game.createBomb(0, 1);
    game.createBomb(1, 0);
    game.createBomb(1, 1);
    game.step(0, 0);
    game.putFlag(0, 1);
    game.putFlag(1, 0);
    game.putFlag(1, 1);
    game.step(2, 0);
    game.step(2, 1);
    game.step(2, 2);
    game.step(1, 2);
    game.step(0, 2);
    expect(game.getFinalResult()).toBe('+-+-+-+\n|2|2|1|\n+-+-+-+\n|*|*|2|\n+-+-+-+\n|3|*|2|\n+-+-+-+\n[Sandbox 3x3] the land is cleared! GOOD JOB!');
  });
  it('(UAT-6) Given a board with bombs (2,2) When I step on 0,0 Then the recursive check should run and the land is cleared! GOOD JOB! screen appears. Game board: (_,1, ,_,1,1,_,_,_)', () => {
    const game = new MineSweeper();
    game.startingTable();
    game.createBomb(2, 2);
    game.step(0, 0);
    expect(game.getFinalResult()).toBe('+-+-+-+\n|_|1| |\n+-+-+-+\n|_|1|1|\n+-+-+-+\n|_|_|_|\n+-+-+-+\n[Sandbox 3x3] the land is cleared! GOOD JOB!');
  });
});

describe('US5 - Auto game mode', () => {
  it('Given a botplay with bomb number validation When I enter a number greater than 3 (4), Then it displays an error message (log contains Error: Max bomb number for 3x3 grid is 3).', () => {
    const logSpy = jest.spyOn(global.console, 'log');
    const game = new MineSweeper();
    game.botPlay(4);
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('Error: Max bomb number for 3x3 grid is 3'));
    logSpy.mockRestore();
  });
});
