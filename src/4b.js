const { generateBoards, generateHashTableForNumbers } = require('./4a');

module.exports = (input = ['']) => {
  const drawnNumbers = input[0].split(',');

  const boards = generateBoards(input);
  const linesAndColumnsByNumbers = generateHashTableForNumbers(boards);

  // let's bingo until the last board
  const boardsInCompetition = new Set(Object.keys(boards));
  let lastWinnerBoardId, winnerNumber;

  drawnNumbers.some((number) => {
    linesAndColumnsByNumbers[number].some((item) => {
      item.mark(number);
      if (item.isWinner()) {
        boardsInCompetition.delete(item.boardId.toString());
        if (!boardsInCompetition.size) {
          lastWinnerBoardId = item.boardId;
          winnerNumber = number;
        }
      }
      return !boardsInCompetition.size;
    });

    return !boardsInCompetition.size;
  });

  const winnerBoard = boards[lastWinnerBoardId];
  const sumOfUnmarkedNumbers = winnerBoard.reduce(
    (sum, line) => sum + line.sumUnmarkedNumbers(),
    0
  );

  return winnerNumber * sumOfUnmarkedNumbers;
};
