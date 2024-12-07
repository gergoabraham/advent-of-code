const solver = (input: string): string | number => {
  const map = input.split("\n").map((line) => line.split(""));
  const startIndex = input.indexOf("^");

  const startCoords = {
    x: Math.floor(startIndex / (map[0].length + 1)),
    y: startIndex % (map[0].length + 1),
  };

  let directionIndex = 0;
  let x = startCoords.x;
  let y = startCoords.y;
  const optionsSet = new Set<string>();

  while (x >= 0 && x < map.length && y >= 0 && y < map[0].length) {
    const possibleObstacleCoords = checkPossibleObstacleCoords(
      startCoords,
      { x, y },
      directionIndex,
      map
    );
    if (possibleObstacleCoords) {
      optionsSet.add(`${possibleObstacleCoords.x}-${possibleObstacleCoords.y}`);
    }

    ({ directionIndex, x, y } = getNextPosition(directionIndex, x, y, map));
  }

  optionsSet.delete(`${startCoords.x}-${startCoords.y}`);

  return optionsSet.size;
};

const directions: Array<(x: number, y: number) => { x: number; y: number }> = [
  (x, y) => ({ x: x - 1, y: y }),
  (x, y) => ({ x: x, y: y + 1 }),
  (x, y) => ({ x: x + 1, y: y }),
  (x, y) => ({ x: x, y: y - 1 }),
];

const checkPossibleObstacleCoords = (
  originalStartCorods: { x: number; y: number },
  startCoords: { x: number; y: number },
  startDirectionIndex: number,
  map: string[][]
): { x: number; y: number } | null => {
  let { directionIndex, ...obstacleCoord } = getNextPosition(
    startDirectionIndex,
    startCoords.x,
    startCoords.y,
    map
  );

  if (map[obstacleCoord.x]?.[obstacleCoord.y] === undefined) {
    return null;
  }

  map[obstacleCoord.x][obstacleCoord.y] = "#";

  let { x, y } = originalStartCorods;
  directionIndex = 0;
  let visitedSet = new Set<string>();

  while (x >= 0 && x < map.length && y >= 0 && y < map[0].length) {
    visitedSet.add(`${x}-${y}-${directionIndex}`);

    ({ directionIndex, x, y } = getNextPosition(directionIndex, x, y, map));

    if (visitedSet.has(`${x}-${y}-${directionIndex}`)) {
      map[obstacleCoord.x][obstacleCoord.y] = ".";
      return obstacleCoord;
    }
  }

  map[obstacleCoord.x][obstacleCoord.y] = ".";
  return null;
};

const getNextPosition = (
  directionIndex: number,
  x: number,
  y: number,
  map: string[][]
) => {
  let newCoords = directions[directionIndex](x, y);

  while (map[newCoords.x]?.[newCoords.y] === "#") {
    directionIndex = (directionIndex + 1) % 4;
    newCoords = directions[directionIndex](x, y);
  }

  return { directionIndex, x: newCoords.x, y: newCoords.y };
};

export default solver;
