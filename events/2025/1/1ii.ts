const solver = (input: string): string | number => {
  const instructions = input
    .split('\n')
    .map((line) => ({ direction: line[0], steps: +line.slice(1) }));

  let pointingAt = 50;
  let numberOfZeros = 0;

  for (const { direction, steps } of instructions) {
    if (direction === 'R') {
      pointingAt = pointingAt + steps;
      numberOfZeros += Math.floor(pointingAt / 100);
    } else {
      if (pointingAt === 0) {
        pointingAt = 100;
      }

      pointingAt = pointingAt - steps;

      if (pointingAt < 0) {
        numberOfZeros -= Math.floor(pointingAt / 100);
      }
      if (pointingAt % 100 === 0) numberOfZeros++;
    }

    pointingAt %= 100;
    pointingAt += 100;
    pointingAt %= 100;
  }

  return numberOfZeros;
};

export default solver;
