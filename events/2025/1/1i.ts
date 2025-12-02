const solver = (input: string): string | number => {
  const instructions = input
    .split('\n')
    .map((line) => ({ direction: line[0], steps: +line.slice(1) }));

  let pointingAt = 50;
  let numberOfZeros = 0;

  for (const { direction, steps } of instructions) {
    const stepsToTake = steps % 100;

    if (direction === 'R') {
      pointingAt = (pointingAt + stepsToTake) % 100;
    } else {
      pointingAt = (pointingAt - stepsToTake + 100) % 100;
    }

    if (pointingAt === 0) numberOfZeros++;
  }
  return numberOfZeros;
};

export default solver;
