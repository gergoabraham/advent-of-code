const SIZE = 1000;

module.exports = (input = ['']) => {
  const area = new Array(SIZE).fill(0).map(() => new Array(SIZE).fill(0));

  const lines = input.map((line) =>
    line.split(' -> ').map((coord) => {
      const [x, y] = coord.split(',');
      return { x, y };
    })
  );

  let numberOfAtLeastTwos = 0;

  lines.forEach(([a, b]) => {
    const isVerticalOrHorizontal = a.x === b.x || a.y === b.y;

    if (!isVerticalOrHorizontal) {
      return;
    }

    const y1 = Math.min(a.y, b.y);
    const y2 = Math.max(a.y, b.y);
    const x1 = Math.min(a.x, b.x);
    const x2 = Math.max(a.x, b.x);

    const numberOfSteps = Math.max(x2 - x1, y2 - y1);

    for (let i = 0; i <= numberOfSteps; i++) {
      const x = x1 + ((x2 - x1) / numberOfSteps) * i;
      const y = y1 + ((y2 - y1) / numberOfSteps) * i;

      area[y][x]++;
      if (area[y][x] === 2) {
        numberOfAtLeastTwos++;
      }
    }
  });

  return numberOfAtLeastTwos;
};
