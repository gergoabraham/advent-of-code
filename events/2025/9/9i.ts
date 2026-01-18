const solver = (input: string): string | number => {
  const tiles = input.split('\n').map((line) => {
    const [x, y] = line.split(',').map((x) => +x);
    return { x, y };
  });

  let maximumArea = 0;
  for (let i = 0; i < tiles.length - 1; i++) {
    for (let j = i + 1; j < tiles.length; j++) {
      const A = tiles[i];
      const B = tiles[j];
      const areaCandidate =
        (Math.abs(A.x - B.x) + 1) * (Math.abs(A.y - B.y) + 1);

      maximumArea = Math.max(maximumArea, areaCandidate);
    }
  }

  return maximumArea;
};

export default solver;
