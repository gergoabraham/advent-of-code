module.exports = (input = '') => {
  const [pointLines, foldLines] = input
    .split('\n\n')
    .map((lines) => lines.split('\n'));

  const points = new Map();
  pointLines.forEach((pointLine) => {
    const coords = pointLine.split(',').map((x) => Number(x));
    points.set(pointLine, coords);
  });

  const [, foldCoord, foldValue] = foldLines[0].match(/([xy])=([\d]+)/);
  const fold = [foldCoord === 'x' ? 0 : 1, Number(foldValue)];

  [...points.entries()].forEach(([key, value]) => {
    if (value[fold[0]] > fold[1]) {
      value[fold[0]] = 2 * fold[1] - value[fold[0]];
      const newKey = value.join();

      points.delete(key);
      points.set(newKey, value);
    }
  });

  return points.size;
};
