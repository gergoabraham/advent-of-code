const solver = (input: string): string | number => {
  const map = input.split("\n");

  let numberOfXmases = 0;

  for (let x = 0; x < map.length; x++) {
    for (let y = 0; y < map[0].length; y++) {
      if (isXMas(map, { x, y })) {
        numberOfXmases++;
      }
    }
  }

  return numberOfXmases;
};

const isXMas = (map: string[], { x, y }: { x: number; y: number }): boolean => {
  if (map[x][y] !== "A") {
    return false;
  }

  const topLeft = map[x - 1]?.[y - 1];
  const topRight = map[x - 1]?.[y + 1];
  const bottomLeft = map[x + 1]?.[y - 1];
  const bottomRight = map[x + 1]?.[y + 1];

  const isSlashMAS =
    (topLeft === "S" && bottomRight === "M") ||
    (topLeft === "M" && bottomRight === "S");
  const isBackslashMAS =
    (bottomLeft === "S" && topRight === "M") ||
    (bottomLeft === "M" && topRight === "S");

  return isSlashMAS && isBackslashMAS;
};

export default solver;
