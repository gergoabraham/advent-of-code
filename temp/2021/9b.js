module.exports = (input = '') => {
  const heatmap = input
    .split('\n')
    .map((line) => line.split('').map((num) => Number(num)));

  const basinSizes = heatmap.reduce((basinSizes, line, rI) => {
    const basinSizesFromLine = line.reduce((basinSizes, _, cI) => {
      if (isLowPoint(heatmap, rI, cI)) {
        basinSizes.push(getBasinSize(heatmap, rI, cI));
      }

      return basinSizes;
    }, []);

    basinSizes.push(...basinSizesFromLine);

    return basinSizes;
  }, []);

  basinSizes.sort((a, b) => b - a);
  return basinSizes[0] * basinSizes[1] * basinSizes[2];
};

const isLowPoint = (heatmap, rI, cI) => {
  const neighbours = [
    heatmap[rI - 1]?.[cI],
    heatmap[rI]?.[cI - 1],
    heatmap[rI + 1]?.[cI],
    heatmap[rI]?.[cI + 1],
  ].filter((neighbour) => neighbour !== undefined);

  const isLowPoint = neighbours.reduce(
    (isMinimal, neighbour) => isMinimal && heatmap[rI][cI] < neighbour,
    true
  );
  return isLowPoint;
};

const getBasinSize = (heatmap, rI, cI, basinSet = new Set()) => {
  if (
    heatmap[rI]?.[cI] !== undefined &&
    heatmap[rI][cI] !== 9 &&
    !basinSet.has(`${rI}-${cI}`)
  ) {
    basinSet.add(`${rI}-${cI}`);

    getBasinSize(heatmap, rI - 1, cI, basinSet);
    getBasinSize(heatmap, rI + 1, cI, basinSet);
    getBasinSize(heatmap, rI, cI - 1, basinSet);
    getBasinSize(heatmap, rI, cI + 1, basinSet);
  }

  return basinSet.size;
};
