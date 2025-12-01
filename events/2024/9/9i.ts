const solver = (discMap: string): string | number => {
  let leftId = 0;
  let rightId = Math.floor(discMap.length / 2) + 1;
  let leftMapIndex = 0;
  let rightMapIndex = discMap.length - 1;
  let leftDiscIndex = 0;
  let remainingRightFileSize = 0;

  let checksum = 0;
  while (leftMapIndex <= rightMapIndex) {
    // go through file on left
    const leftDiscSize = +discMap[leftMapIndex];
    const leftDiscChecksum =
      leftId * positionMultiplier(leftDiscIndex, leftDiscSize);
    checksum += leftDiscChecksum;

    leftDiscIndex += leftDiscSize;
    leftMapIndex++;
    leftId++;

    // fill space with file from right
    let leftSpaceSize = +discMap[leftMapIndex];
    while (leftSpaceSize > 0) {
      if (remainingRightFileSize === 0) {
        remainingRightFileSize = +discMap[rightMapIndex];
        rightMapIndex -= 2;
        rightId--;
      }

      const sizeToCopy = Math.min(leftSpaceSize, remainingRightFileSize);

      const copiedFileChecksum =
        rightId * positionMultiplier(leftDiscIndex, sizeToCopy);
      checksum += copiedFileChecksum;
      leftDiscIndex += sizeToCopy;

      leftSpaceSize -= sizeToCopy;
      remainingRightFileSize -= sizeToCopy;
    }
    leftMapIndex++;
  }

  const remainingChecksum =
    rightId * positionMultiplier(leftDiscIndex, remainingRightFileSize);
  checksum += remainingChecksum;

  return checksum;
};

export default solver;

const positionMultiplier = (index: number, size: number) =>
  ((index + index + size - 1) / 2) * size;
