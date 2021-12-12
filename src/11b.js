module.exports = (input = '') => {
  const octopuses = input
    .split('\n')
    .map((line) => [...line].map((e) => Number(e)));

  let numberOfFlashes;
  let step = 0;

  while (numberOfFlashes !== 100) {
    numberOfFlashes = 0;

    for (let rI = 0; rI < octopuses.length; rI++) {
      for (let cI = 0; cI < octopuses[rI].length; cI++) {
        numberOfFlashes += increaseAndFlashOctopus(octopuses, rI, cI);
      }
    }

    octopuses.forEach((line, rI) =>
      line.forEach((value, cI) => (octopuses[rI][cI] = value > 9 ? 0 : value))
    );

    step++;
  }

  return step;
};

const increaseAndFlashOctopus = (octopuses = [[0]], rI0, cI0) => {
  octopuses[rI0][cI0]++;

  const didOctopusFlash = octopuses[rI0][cI0] === 10;
  let numberOfFlashes = 0;

  if (didOctopusFlash) {
    numberOfFlashes++;

    for (let rI = rI0 - 1; rI <= rI0 + 1; rI++) {
      for (let cI = cI0 - 1; cI <= cI0 + 1; cI++) {
        const shouldCheckNeighbour =
          octopuses[rI]?.[cI] !== undefined || (rI === rI0 && cI === cI0);

        if (shouldCheckNeighbour) {
          numberOfFlashes += increaseAndFlashOctopus(octopuses, rI, cI);
        }
      }
    }
  }

  return numberOfFlashes;
};
