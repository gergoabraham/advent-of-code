const solver = (input: string): string | number => {
  const map = input.split("\n").map((line) => line.split(""));
  const startIndex = input.indexOf("^");

  const directions: Array<(x: number, y: number) => { x: number; y: number }> =
    [
      (x, y) => ({ x: x - 1, y: y }),
      (x, y) => ({ x: x, y: y + 1 }),
      (x, y) => ({ x: x + 1, y: y }),
      (x, y) => ({ x: x, y: y - 1 }),
    ];

  let x = Math.floor(startIndex / (map[0].length + 1));
  let y = startIndex % (map[0].length + 1);
  let directionIndex = 0;

  while (x >= 0 && x < map.length && y >= 0 && y < map[0].length) {
    map[x][y] = "X";

    let newCoords = directions[directionIndex](x, y);
    if (map[newCoords.x]?.[newCoords.y] === "#") {
      directionIndex = (directionIndex + 1) % 4;
      newCoords = directions[directionIndex](x, y);
    }

    x = newCoords.x;
    y = newCoords.y;
  }

  return map
    .map((line) => line.filter((x) => x === "X").length)
    .reduce((sum, num) => sum + num);
};

export default solver;
