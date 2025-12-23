const solver = (input: string): string | number => {
  const grid: (string | number)[][] = input
    .split('\n')
    .map((line) => line.split(''));

  const rows = grid.length;
  const cols = grid[0].length;

  let removedInTotal = 0;
  let removedInCurrentStep: number;
  let step = 0;

  do {
    removedInCurrentStep = 0;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (grid[row][col] === '@' && isAccessible(grid, row, col, step)) {
          removedInCurrentStep++;

          // mark removed roll with the step in which it is removed
          grid[row][col] = step;
        }
      }
    }

    removedInTotal += removedInCurrentStep;
    step++;
  } while (removedInCurrentStep > 0);

  return removedInTotal;
};

const isAccessible = (
  grid: (string | number)[][],
  row: number,
  col: number,
  step: number
): boolean =>
  neighborCoords.filter((coord) =>
    // it's either exists or removed in current step
    ['@', step].includes(grid[row + coord[0]]?.[col + coord[1]])
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
