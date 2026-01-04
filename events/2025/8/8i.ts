const solver = (input: string, numberOfPairs = 1000): string | number => {
  const boxes: Box[] = parseBoxes(input);
  const distances: Distance[] = calculateAllDistancesSorted(boxes);

  const circuits = new Set<Set<Box>>(boxes.map(({ circuit }) => circuit));

  for (let i = 0; i < numberOfPairs; i++) {
    const { A, B } = distances[i];
    connectTwoBoxes(A, B, circuits);
  }

  const circuitsArray = [...circuits.values()];
  circuitsArray.sort((a, b) => b.size - a.size);

  return circuitsArray[0].size * circuitsArray[1].size * circuitsArray[2].size;
};

export type Box = {
  id: number;
  x: number;
  y: number;
  z: number;
  circuit: Set<Box>;
};

export type Distance = {
  A: Box;
  B: Box;
  value: number;
};

export const parseBoxes = (input: string): Box[] =>
  input.split('\n').map((line, id) => {
    const [x, y, z] = line.split(',').map((x) => +x);
    const box: Box = { id, x, y, z, circuit: new Set<Box>() };
    box.circuit.add(box);

    return box;
  });

export const calculateAllDistancesSorted = (boxes: Box[]): Distance[] => {
  const distances: Distance[] = [];

  for (let i = 0; i < boxes.length; i++) {
    for (let j = i + 1; j < boxes.length; j++) {
      const A = boxes[i];
      const B = boxes[j];

      const distance = Math.sqrt(
        (A.x - B.x) ** 2 + (A.y - B.y) ** 2 + (A.z - B.z) ** 2
      );

      distances.push({ A, B, value: distance });
    }
  }

  distances.sort((a, b) => a.value - b.value);

  return distances;
};

export const connectTwoBoxes = (A: Box, B: Box, circuits: Set<Set<Box>>) => {
  if (A.circuit === B.circuit) return;

  const targetCircuit = A.circuit.size > B.circuit.size ? A.circuit : B.circuit;
  const circuitToDelete =
    A.circuit.size > B.circuit.size ? B.circuit : A.circuit;

  circuitToDelete.forEach((box) => {
    box.circuit = targetCircuit;
    targetCircuit.add(box);
  });

  circuits.delete(circuitToDelete);
};

export default solver;
