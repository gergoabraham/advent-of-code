const solver = (input: string): string | number => {
  const map = input.split("\n");

  let numberOfWords = 0;

  for (let x = 0; x < map.length; x++) {
    for (let y = 0; y < map[0].length; y++) {
      numberOfWords += findXmasWords(map, { x, y });
    }
  }

  return numberOfWords;
};

const allDirections: Array<(x: number, y: number) => { x: number; y: number }> =
  [
    (x, y) => ({ x: x + 1, y: y }),
    (x, y) => ({ x: x + 1, y: y + 1 }),
    (x, y) => ({ x: x, y: y + 1 }),
    (x, y) => ({ x: x - 1, y: y + 1 }),
    (x, y) => ({ x: x - 1, y: y }),
    (x, y) => ({ x: x - 1, y: y - 1 }),
    (x, y) => ({ x: x, y: y - 1 }),
    (x, y) => ({ x: x + 1, y: y - 1 }),
  ];

const findXmasWords = (
  map: string[],
  { x, y }: { x: number; y: number },
  charIndex: number = 0,
  directions = allDirections
): number => {
  if (map[x]?.[y] === "S" && charIndex === 3) {
    return 1;
  }
  if (map[x]?.[y] !== "XMAS".at(charIndex)) {
    return 0;
  }

  let numberOfXmasWords = 0;
  for (const direction of directions) {
    numberOfXmasWords += findXmasWords(map, direction(x, y), charIndex + 1, [
      direction,
    ]);
  }

  return numberOfXmasWords;
};

export default solver;
