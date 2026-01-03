const solver = (input: string): string | number => {
  const diagram = input.split('\n').map((line) => line.split(''));

  const isSplitFromCoord = (x: number, y: number) =>
    diagram[x - 1]?.[y] === '|' && diagram[x][y] === '^';

  let numberOfSplits = 0;

  for (let x = 1; x < diagram.length; x++) {
    for (let y = 0; y < diagram[0].length; y++) {
      if (diagram[x][y] === '^') continue;

      const isComingFromAbove = ['S', '|'].includes(diagram[x - 1]?.[y]);
      const isSplitFromLeft = isSplitFromCoord(x, y - 1);
      const isSplitFromRight = isSplitFromCoord(x, y + 1);

      if (isSplitFromLeft) numberOfSplits += 0.5;
      if (isSplitFromRight) numberOfSplits += 0.5;

      if (isComingFromAbove || isSplitFromLeft || isSplitFromRight)
        diagram[x][y] = '|';
    }
  }

  return numberOfSplits;
};

export default solver;
