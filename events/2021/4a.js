module.exports = (input = ['']) => {
  const drawnNumbers = input[0].split(',');

  const boards = generateBoards(input);
  const linesAndColumnsByNumbers = generateHashTableForNumbers(boards);

  // let's bingo
  let winnerBoardId, winnerNumber;
  drawnNumbers.some((number) =>
    linesAndColumnsByNumbers[number].some((item) => {
      item.mark(number);
      if (item.isWinner()) {
        winnerBoardId = item.boardId;
        winnerNumber = number;
        return true;
      }
    })
  );

  const winnerBoard = boards[winnerBoardId];
  const sumOfUnmarkedNumbers = winnerBoard.reduce(
    (sum, line) => sum + line.sumUnmarkedNumbers(),
    0
  );

  return winnerNumber * sumOfUnmarkedNumbers;
};

function generateHashTableForNumbers(boards) {
  const linesAndColumnsByNumbers = {};
  boards.forEach((board, boardId) => {
    // add line Items to items
    board.forEach((line) => line.addThisToCollection(linesAndColumnsByNumbers));

    // create and add column Items to items
    board[0].numbers.forEach((_, columnIndex) => {
      const columnArray = [];
      board.forEach((line) => {
        columnArray.push(line.numbers[columnIndex]);
      });
      const column = new Item(columnArray, boardId, 'column');
      column.addThisToCollection(linesAndColumnsByNumbers);
    });
  });
  return linesAndColumnsByNumbers;
}

function generateBoards(input) {
  const numberOfBoards = (input.length - 1) / 6;
  const boards = [];
  for (let i = 0; i < numberOfBoards; i++) {
    const startIndex = i * 6 + 2;

    const board = new Array(5)
      .fill(null)
      .map((_, bi) => new Item(input[startIndex + bi].trim().split(/ +/), i));
    boards[i] = board;
  }
  return boards;
}

class Item {
  /**
   * @param {string[]} numbers
   * @param {number} boardId
   * @param {'line' | 'column'} type
   */
  constructor(numbers, boardId = 0, type = 'line') {
    this.numbers = numbers;
    this.marked = new Array(numbers.length).fill(false);
    this.boardId = boardId;
    this.type = type;
  }

  isWinner() {
    return this.marked.reduce((prev, current) => prev && current);
  }

  mark(number) {
    this.numbers.forEach((num, i) => {
      this.marked[i] ||= num === number;
    });
  }

  sumUnmarkedNumbers() {
    return this.numbers.reduce(
      (sum, number, i) => sum + (!this.marked[i] ? +number : 0),
      0
    );
  }

  addThisToCollection(collection) {
    this.numbers.forEach((number) => {
      if (collection[number]) {
        collection[number].push(this);
      } else {
        collection[number] = [this];
      }
    });
  }
}

module.exports.generateBoards = generateBoards;
module.exports.generateHashTableForNumbers = generateHashTableForNumbers;
