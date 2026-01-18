const solver = (input: string): string | number => {
  const tiles = parseTiles(input);

  // 'shrinking' coordinates to be able to draw on a grid with
  // a managable size
  const maxX = shrinkTilesOnOneAxis('x', tiles);
  const maxY = shrinkTilesOnOneAxis('y', tiles);

  const grid = generateEmptyGrid(maxY, maxX);
  drawPolygonOutline(tiles, grid);
  fillPolygon(grid);

  const maximumArea = findValidRectangleWithMaximumArea(tiles, grid);

  return maximumArea;
};

const parseTiles = (input: string) =>
  input.split('\n').map((line) => {
    const [x, y] = line.split(',').map((x) => +x);

    return { x, y, _x: 0, _y: 0 };
  });

const shrinkTilesOnOneAxis = (
  axis: 'x' | 'y',
  _tiles: { x: number; y: number; _x: number; _y: number }[]
) => {
  const shrinkedAxis = axis === 'x' ? '_x' : '_y';

  const tiles = [..._tiles];
  tiles.sort((a, b) => a[axis] - b[axis]);

  tiles[0][shrinkedAxis] = 1;

  for (let i = 1; i < tiles.length; i++) {
    const difference = tiles[i][axis] - tiles[i - 1][axis];

    if (difference === 0) {
      tiles[i][shrinkedAxis] = tiles[i - 1][shrinkedAxis];
    } else if (difference === 1) {
      tiles[i][shrinkedAxis] = tiles[i - 1][shrinkedAxis] + 1;
    } else {
      tiles[i][shrinkedAxis] = tiles[i - 1][shrinkedAxis] + 2;
    }
  }
  const maxValue = tiles[tiles.length - 1][shrinkedAxis];

  return maxValue;
};

const generateEmptyGrid = (maxY: number, maxX: number) =>
  new Array(maxY + 1).fill(null).map(() => new Array(maxX + 1).fill('.'));

const drawPolygonOutline = (
  tiles: { x: number; y: number; _x: number; _y: number }[],
  grid: any[][]
) => {
  for (let i = 0; i < tiles.length; i++) {
    const A = tiles[i];
    const B = tiles[(i + 1) % tiles.length];

    grid[A._y][A._x] = '#';

    const xStep = (B._x - A._x) / Math.abs(B._x - A._x) || 0;
    const yStep = (B._y - A._y) / Math.abs(B._y - A._y) || 0;

    for (
      let x = A._x + xStep, y = A._y + yStep;
      !(x === B._x && y === B._y);
      x += xStep, y += yStep
    ) {
      grid[y][x] = '#';
    }
  }
};

const fillPolygon = (grid: any[][]) => {
  for (let y = 0; y < grid.length; y++) {
    let draw = false;
    let onEdge = false;
    let edgeFromUp = false;

    for (let x = 0; x < grid.length; x++) {
      const enteringEdge = grid[y][x] === '#' && !onEdge;
      const exitingEdge = grid[y][x] !== '#' && onEdge;

      if (enteringEdge) {
        const tileAbove = grid[y - 1]?.[x];
        const tileBelow = grid[y + 1]?.[x];
        const isVerticalEdge = tileAbove === '#' && tileBelow === '#';

        if (isVerticalEdge) {
          draw = !draw;
        } else if (tileAbove === '#') {
          edgeFromUp = true;
          onEdge = true;
        } else {
          edgeFromUp = false;
          onEdge = true;
        }
      } else if (exitingEdge) {
        const titleLeftDown = grid[y + 1]?.[x - 1];
        const titleLeftUp = grid[y - 1]?.[x - 1];
        if (
          (edgeFromUp && titleLeftDown === '#') ||
          (!edgeFromUp && titleLeftUp === '#')
        ) {
          draw = !draw;
        }
        onEdge = false;
      }

      if (grid[y][x] === '.' && draw) {
        grid[y][x] = 'X';
      }
    }
  }
};

const findValidRectangleWithMaximumArea = (
  tiles: { x: number; y: number; _x: number; _y: number }[],
  grid: any[][]
) => {
  let maximumArea = 0;

  for (let i = 0; i < tiles.length - 1; i++) {
    for (let j = i + 1; j < tiles.length; j++) {
      const A = tiles[i];
      const B = tiles[j];
      const areaCandidate =
        (Math.abs(A.x - B.x) + 1) * (Math.abs(A.y - B.y) + 1);

      if (areaCandidate > maximumArea) {
        let isValid = true;

        const xDiff = (B._x - A._x) / Math.abs(B._x - A._x) || 0;
        const yDiff = (B._y - A._y) / Math.abs(B._y - A._y) || 0;

        for (let x = A._x; isValid && x !== B._x; x += xDiff) {
          for (let y = A._y; isValid && y !== B._y; y += yDiff) {
            if (grid[y][x] === '.') {
              isValid = false;
            }
          }
        }

        if (isValid) {
          maximumArea = areaCandidate;
        }
      }
    }
  }
  return maximumArea;
};

export default solver;
