import {
  Box,
  calculateAllDistancesSorted,
  connectTwoBoxes,
  Distance,
  parseBoxes,
} from './8i';

const solver = (input: string): string | number => {
  const boxes: Box[] = parseBoxes(input);
  const distances: Distance[] = calculateAllDistancesSorted(boxes);

  const circuits = new Set<Set<Box>>(boxes.map(({ circuit }) => circuit));
  let i = 0;
  let A: Box, B: Box;
  do {
    ({ A, B } = distances[i]);
    connectTwoBoxes(A, B, circuits);
    i++;
  } while (circuits.size > 1);

  return A.x * B.x;
};

export default solver;
