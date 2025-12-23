const solver = (input: string): string | number => {
  const [rawRanges, rawIds] = input
    .split('\n\n')
    .map((group) => group.split('\n'));

  const ids = rawIds.map((x) => +x);
  const ranges = rawRanges.map((rawRange) =>
    rawRange.split('-').map((x) => +x)
  );

  // O(n*m) and that's it :)
  return ids.filter((id) => ranges.some(([min, max]) => id >= min && id <= max))
    .length;
};

export default solver;
