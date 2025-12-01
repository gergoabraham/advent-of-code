module.exports = (input = '') => {
  const crabPositions = input.split(',').map((pos) => Number(pos));

  const { min, max } = crabPositions.reduce(
    ({ min, max }, current) => ({
      min: Math.min(min, current),
      max: Math.max(max, current),
    }),
    { min: Infinity, max: -Infinity }
  );

  let costCandidate = Infinity;
  for (let pos = min; pos <= max; pos++) {
    const newCandidate = crabPositions.reduce(
      (cost, current) =>
        cost + ((Math.abs(pos - +current) + 1) * Math.abs(pos - +current)) / 2,
      0
    );

    costCandidate = Math.min(newCandidate, costCandidate);
  }

  return costCandidate;
};
