const solver = (input: string): string | number => {
  const map = input.split("\n");
  const isVisited = new Array(map.length)
    .fill(0)
    .map(() => new Array(map[0].length).fill(false));

  const get = ({ x, y }: { x: number; y: number }) => map[x]?.[y];

  const traverse = (x: number, y: number) => {
    isVisited[x][y] = true;

    let area = 1;
    let corners = 0;

    const cornerCoords = [
      {
        base: { x: x, y: y },
        next1: { x: x - 1, y: y },
        diag: { x: x - 1, y: y - 1 },
        next2: { x: x, y: y - 1 },
      },
      {
        base: { x: x, y: y },
        next1: { x: x - 1, y: y },
        diag: { x: x - 1, y: y + 1 },
        next2: { x: x, y: y + 1 },
      },
      {
        base: { x: x, y: y },
        next1: { x: x + 1, y: y },
        diag: { x: x + 1, y: y - 1 },
        next2: { x: x, y: y - 1 },
      },
      {
        base: { x: x, y: y },
        next1: { x: x + 1, y: y },
        diag: { x: x + 1, y: y + 1 },
        next2: { x: x, y: y + 1 },
      },
    ];
    for (const cornerCoord of cornerCoords) {
      const base = get(cornerCoord.base);
      const next1 = get(cornerCoord.next1);
      const next2 = get(cornerCoord.next2);
      const diag = get(cornerCoord.diag);

      const isConvexCorner = base !== next1 && base !== next2 && base !== diag;
      const isConcaveCorner = base === next1 && base === next2 && base !== diag;
      const areTwoCornersMeeting =
        base === diag && base !== next1 && base !== next2;

      if (isConvexCorner || isConcaveCorner || areTwoCornersMeeting) {
        corners++;
      }
    }

    const neighborCoords = [
      { x: x + 1, y: y },
      { x: x, y: y + 1 },
      { x: x - 1, y: y },
      { x: x, y: y - 1 },
    ];
    for (const next of neighborCoords) {
      if (!isVisited[next.x]?.[next.y] && map[next.x]?.[next.y] === map[x][y]) {
        const res = traverse(next.x, next.y);
        area += res.area;
        corners += res.sides;
      }
    }

    return { area, sides: corners };
  };

  let acc = 0;
  for (let x = 0; x < map.length; x++) {
    for (let y = 0; y < map[0].length; y++) {
      if (!isVisited[x][y]) {
        const results = traverse(x, y);
        acc += results.area * results.sides;
      }
    }
  }

  return acc;
};

export default solver;
