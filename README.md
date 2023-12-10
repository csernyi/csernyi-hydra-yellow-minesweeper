# Mine Sweeper

The exercise involves developing a Mine Sweeper game strictly adhering to the TDD, ATDD rules.

Mine Sweeper - Game Rules:
You are presented with a board of squares. Some squares contain mines (bombs), others don't. If you step
on a square containing a bomb, you lose. If you manage to clear all the squares (without clicking on any
bombs) you win.
Clearing a square which doesn't have a bomb reveals the number of neighbouring squares containing bombs.
If you guess a square contains a bomb mark it with a flag.
A squares "neighbours" are the squares adjacent above, below, left, right, and all 4 diagonals. Squares on the
sides of the board or in a corner have fewer neighbors. The board does not wrap around the edges. If you
clear a square with 0 neighboring bombs, all its neighbors will automatically open; recursively.
The first square you open could be a bomb.
You don't have to mark all the bombs to win; you just need to open all non-bomb squares.

Kata objective:
The game runs in BOT mode to print on the screen all the moves until we got a victory or game over. The test
suite can simulate the game without having an executable. In that case the test suite will print on console
the scenario; or in a log file with a clean test report [red/green style].

npm test -- --watchAll --collect-coverage --verbose

## Legend

- ⚠ TODO
- 🚧 IN PROGRESS
- ✅ DONE

## Backlog

✅ US #1 As a Mine Sweeper game spectator I want to have a blank starting board drawn so that I can enjoy the game visually.
✅ Scenario #1 (UAT-1) Given a new game When I start it Then Game created screen appears with a 3x3 empty grid. Game board: ( , , , , , , , , )

✅ US #2 As a Mine Sweeper game spectator I want to be able to place a bomb and trigger it so that I can verify that the game has lose conditions fulfilled.
✅ Scenario #1 Given an empty board When I add bomb to 1,1 Then bomb is registered on the bomb table. Bomb board: (0,0,0,0,1,0,0,0,0)
✅ Scenario #2 (UAT-2) Given a board with bombs (1,1) When I step on 1,1 Then Game Over screen appears. Game board: ( , , , ,X, , , , )

✅ US #3 As a Mine Sweeper game spectator I want to be able to reveal numbered fields next to bombs and mark the bombs next to it so that I will have a chance to win the game.
✅ Scenario #1 Given a board with bombs (1,1) When I step on 1,0 Then 1 bombs around your square screen appears. Game board: ( , , ,1, , , , , )
✅ Scenario #2 (UAT-3) Given a board with bombs (0,1 1,0 1,1) When I step on 0,0 Then 3 bombs around your square screen appears. Game board: ( , , , , , ,3, , )
✅ Scenario #3 (UAT-4) Given a board with bombs (0,1 1,0 1,1) When I step on 0,0 and flag bomb fields around Then Square flagged as bomb screen appears. Game board: ( , , ,_,_, ,3,\*, )

✅ US #4 As a Mine Sweeper game spectator I want win conditions to be implemented so that I can verify that the player won the game.
✅ Scenario #1 Given a board with bombs (0,0 0,1 0,2 1,0 1,2 2,0 2,1 2,2) When I step on 1,1 Then the land is cleared! GOOD JOB! screen appears. Game board: ( , , , ,8, , , , )
✅ Scenario #2 (UAT-5) Given a board with bombs (0,1 1,0 1,1) When I step on 0,0, flag bomb fields around and step to all the remaining fields Then the land is cleared! GOOD JOB! screen appears. Game board: (2,2,1,_,_,2,3,\*,2)
✅ Scenario #3 (UAT-6) Given a board with bombs (2,2) When I step on 0,0 Then the recursive check should run and the land is cleared! GOOD JOB! screen appears. Game board: (_,1, ,_,1,1,_,_,\_)

🚧 US #5 As a Mine Sweeper game spectator I want to run the game in bot mode so that I can watch an automated match.
✅ Scenario #1 Given a botplay with bomb number validation When I enter a number greater than 3 (4), Then it displays an error message (log contains 'Error: Max bomb number for 3x3 grid is 3').
✅ Scenario #2 Given a botplay with end-to-end play When I start it with a valid bomb number (1) Then the start screen appears (log contains 'Game created').
✅ Scenario #3 Given a botplay with end-to-end play When I start it with a valid bomb number (1) Then one bomb is added to the bomb table. Bomb board is not: (0,0,0,0,0,0,0,0,0).
✅ Scenario #4 Given a botplay with end-to-end play When I start it with a valid bomb number (2) Then the bot makes at least one move. Board is not: ( , , , , , , , , ).
⚠ Scenario #5 Given a botplay with end-to-end play When I start it with a valid bomb number (3) Then the end screen is reached (last log contains '!').
