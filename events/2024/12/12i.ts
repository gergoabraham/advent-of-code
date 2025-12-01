const solver = (input: string): string | number => {
  const map = input.split("\n");
  const isVisited = new Array(map.length)
    .fill(0)
    .map(() => new Array(map[0].length).fill(false));

  const traverse = (x: number, y: number) => {
    isVisited[x][y] = true;

    const neighborCoords = [
      { x: x + 1, y: y },
      { x: x, y: y + 1 },
      { x: x - 1, y: y },
      { x: x, y: y - 1 },
    ];

    let area = 1;
    let perimeter = 0;
    for (const next of neighborCoords) {
      if (map[next.x]?.[next.y] !== map[x][y]) {
        perimeter++;
      }

      if (!isVisited[next.x]?.[next.y] && map[next.x]?.[next.y] === map[x][y]) {
        const res = traverse(next.x, next.y);
        area += res.area;
        perimeter += res.perimeter;
      }
    }

    return { area, perimeter };
  };

  let acc = 0;
  for (let x = 0; x < map.length; x++) {
    for (let y = 0; y < map[0].length; y++) {
      if (!isVisited[x][y]) {
        const results = traverse(x, y);
        acc += results.area * results.perimeter;
      }
    }
  }

  return acc;
};

export default solver;
