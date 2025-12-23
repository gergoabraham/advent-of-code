const solver = (input: string): string | number => {
  const grid = input.split('\n');

  const rows = grid.length;
  const cols = grid[0].length;
  let numberOfAccessibleRolls = 0;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (grid[row][col] === '@' && isAccessible(grid, row, col)) {
        numberOfAccessibleRolls++;
      }
    }
  }

  return numberOfAccessibleRolls;
};

const isAccessible = (grid: string[], row: number, col: number): boolean =>
  neighborCoords.filter(
    (coord) => grid[row + coord[0]]?.[col + coord[1]] === '@'
  ).length < 4;

const neighborCoords = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

export default solver;
