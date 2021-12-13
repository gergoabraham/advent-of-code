module.exports = (input = '') => {
  const [pointLines, foldLines] = getSeparatedInputCategories(input);
  const pointsMap = createPointsMap(pointLines);

  foldLines.forEach((foldLine) => {
    const fold = parseFold(foldLine);

    [...pointsMap.entries()].forEach((pointEntry) => {
      performFoldOnPointEntry(pointEntry, fold, pointsMap);
    });
  });

  const canvas = generateEmptyCanvas(pointsMap);
  drawPointsOnCanvas(pointsMap, canvas);

  return createDisplayableCanvas(canvas);
};

const getSeparatedInputCategories = (input) => {
  return input.split('\n\n').map((lines) => lines.split('\n'));
};

const createPointsMap = (pointLines) => {
  const points = new Map();
  pointLines.forEach((pointLine) => {
    const coords = pointLine.split(',').map((x) => Number(x));
    points.set(pointLine, coords);
  });
  return points;
};

const parseFold = (foldLine) => {
  const [, foldCoord, foldValue] = foldLine.match(/([xy])=([\d]+)/);
  const fold = [foldCoord === 'x' ? 0 : 1, Number(foldValue)];
  return fold;
};

const performFoldOnPointEntry = (pointEntry, fold, pointsMap) => {
  const [pointString, pointCoords] = pointEntry;
  const [foldAxes, foldValue] = fold;

  if (pointCoords[foldAxes] > foldValue) {
    pointCoords[foldAxes] = 2 * foldValue - pointCoords[foldAxes];
    const newPointString = pointCoords.join();

    pointsMap.delete(pointString);
    pointsMap.set(newPointString, pointCoords);
  }
};

const generateEmptyCanvas = (points) => {
  const canvasSize = calculateCanvasSize(points);

  return new Array(canvasSize.maxY + 1)
    .fill(0)
    .map(() => new Array(canvasSize.maxX + 1).fill('.'));
};

const calculateCanvasSize = (points) => {
  return [...points.entries()].reduce(
    (boundaries, [, coords]) => {
      boundaries.maxX = Math.max(boundaries.maxX, coords[0]);
      boundaries.maxY = Math.max(boundaries.maxY, coords[1]);
      return boundaries;
    },
    { maxX: -Infinity, maxY: -Infinity }
  );
};

const drawPointsOnCanvas = (points, canvas) => {
  points.forEach(([x, y]) => {
    canvas[y][x] = '#';
  });
};

const createDisplayableCanvas = (canvas) => {
  canvas.unshift(['']);
  const canvasToDisplay = canvas.map((line) => line.join('')).join('\n');
  return canvasToDisplay;
};
