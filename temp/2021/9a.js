module.exports = (input = '') => {
  const heatmap = input
    .split('\n')
    .map((line) => line.split('').map((num) => Number(num)));

  const riskFactorSum = heatmap.reduce(
    (riskFactorSum, line, rI) =>
      riskFactorSum +
      line.reduce(
        (lineRiskFactor, cell, cI) =>
          lineRiskFactor + getRiskFactorOfCell(cell, rI, cI, heatmap),
        0
      ),
    0
  );

  return riskFactorSum;
};

const getRiskFactorOfCell = (cell, rowIndex, columnIndex, heatmap) => {
  const neighbours = [
    heatmap[rowIndex - 1]?.[columnIndex],
    heatmap[rowIndex]?.[columnIndex - 1],
    heatmap[rowIndex + 1]?.[columnIndex],
    heatmap[rowIndex]?.[columnIndex + 1],
  ].filter((neighbour) => neighbour !== undefined);

  const isMinimal = neighbours.reduce(
    (isMinimal, neighbour) => isMinimal && cell < neighbour,
    true
  );

  return isMinimal ? cell + 1 : 0;
};
