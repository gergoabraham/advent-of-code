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
    const y1 = +a.y;
    const y2 = +b.y;
    const x1 = +a.x;
    const x2 = +b.x;

    const numberOfSteps = Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1));

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
