const solver = (input: string): string | number => {
  const map = input.split("\n").map((line) => line.split("").map((c) => +c));

  let sumOfScores = 0;
  for (let x = 0; x < map.length; x++) {
    for (let y = 0; y < map[0].length; y++) {
      if (map[x][y] === 0) {
        sumOfScores += calculateScore(map, { x, y });
      }
    }
  }

  return sumOfScores;
};

const calculateScore = (
  map: number[][],
  { x, y }: { x: number; y: number },
  visited = new Set<string>()
): number => {
  visited.add(`${x}-${y}`);

  if (map[x][y] === 9) {
    return 1;
  }

  const nextLevel = map[x][y] + 1;
  return [
    { x: x + 1, y: y },
    { x: x - 1, y: y },
    { x: x, y: y + 1 },
    { x: x, y: y - 1 },
  ]
    .map((neighbor) =>
      map[neighbor.x]?.[neighbor.y] === nextLevel &&
      !visited.has(`${neighbor.x}-${neighbor.y}`)
        ? calculateScore(map, neighbor, visited)
        : 0
    )
    .reduce((sum, num) => sum + num);
};

export default solver;
