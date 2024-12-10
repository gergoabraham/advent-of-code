import { getNumberOfAntinodes } from "./8i";

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

  for (let { x, y } = antenna1; coordValidator({ x, y }); x += dx, y += dy) {
    antinodeCoords.add(`${x}-${y}`);
  }
  for (let { x, y } = antenna1; coordValidator({ x, y }); x -= dx, y -= dy) {
    antinodeCoords.add(`${x}-${y}`);
  }
};

export default solver;
