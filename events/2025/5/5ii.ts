const solver = (input: string): string | number => {
  const [rawRanges] = input.split('\n\n').map((group) => group.split('\n'));
  const ranges = rawRanges.map((rawRange) =>
    rawRange.split('-').map((x) => +x)
  );

  ranges.sort((a, b) => a[0] - b[0]);

  let numberOfFreshIds = 0;
  let prevMax = 0;

  ranges.forEach(([min, max]) => {
    // avoiding double (triple? quad?) counting overlaps
    const correctedMin = Math.max(min, prevMax + 1);

    if (max >= correctedMin) {
      numberOfFreshIds += max - correctedMin + 1;
    }
    prevMax = Math.max(prevMax, max);
  });

  return numberOfFreshIds;
};

export default solver;
