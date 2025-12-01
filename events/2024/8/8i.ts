const solver = (input: string): string | number =>
  getNumberOfAntinodes(input, antinodeCalculator);

const antinodeCalculator = (
  antenna1: { x: number; y: number },
  antenna2: { x: number; y: number },
  coordValidator: (coords: { x: number; y: number }) => boolean,
  antinodeCoords: Set<string>
) => {
  const dx = antenna2.x - antenna1.x;
  const dy = antenna2.y - antenna1.y;

  const antinode1 = { x: antenna2.x + dx, y: antenna2.y + dy };
  const antinode2 = { x: antenna1.x - dx, y: antenna1.y - dy };

  if (coordValidator(antinode1)) {
    antinodeCoords.add(`${antinode1.x}-${antinode1.y}`);
  }
  if (coordValidator(antinode2)) {
    antinodeCoords.add(`${antinode2.x}-${antinode2.y}`);
  }
};

export const getNumberOfAntinodes = (
  input: string,
  antinodeCalculator: (
    antenna1: { x: number; y: number },
    antenna2: { x: number; y: number },
    coordValidator: (coords: { x: number; y: number }) => boolean,
    antinodeCoords: Set<string>
  ) => void
) => {
  const map = input.split("\n");

  const antennasByLabel = getAntennasByLabel(map);
  const coordValidator = getCoordValidator(map);

  const antinodeCoords = new Set<string>();

  for (const [, antennaPositions] of antennasByLabel) {
    for (let i = 0; i < antennaPositions.length; i++) {
      for (let j = i + 1; j < antennaPositions.length; j++) {
        const antennaI = antennaPositions[i];
        const antennaJ = antennaPositions[j];

        antinodeCalculator(antennaI, antennaJ, coordValidator, antinodeCoords);
      }
    }
  }

  return antinodeCoords.size;
};

const getAntennasByLabel = (map: string[]) => {
  const antennasByLabel = new Map<string, Array<{ x: number; y: number }>>();
  for (let x = 0; x < map.length; x++) {
    for (let y = 0; y < map[0].length; y++) {
      if (map[x][y] !== ".") {
        const label = map[x][y];
        const antennaPositions = antennasByLabel.get(label) ?? [];
        antennasByLabel.set(label, antennaPositions);

        antennaPositions.push({ x, y });
      }
    }
  }
  return antennasByLabel;
};

const getCoordValidator = (map: string[]) => {
  const xMax = map.length;
  const yMax = map[0].length;

  return ({ x, y }: { x: number; y: number }) =>
    x >= 0 && x < xMax && y >= 0 && y < yMax;
};

export default solver;
