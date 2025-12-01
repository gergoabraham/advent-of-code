module.exports = (input = '') => {
  const crabPositions = input.split(',').map((pos) => Number(pos));

  crabPositions.sort((a, b) => a - b);
  const medianPosition = crabPositions[crabPositions.length / 2];

  const cost = crabPositions.reduce(
    (cost, current) => cost + Math.abs(+medianPosition - +current),
    0
  );

  return cost;
};
