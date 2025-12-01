const solver = (input: string): string | number => {
  const stones = input.split(" ").map((x) => +x);

  let numberOfStones = 0;
  for (let stone of stones) {
    numberOfStones += getNumberOfStones(stone, 25);
  }

  return numberOfStones;
};

const getNumberOfStones = (stone: number, remainingBlinks: number): number => {
  if (remainingBlinks === 0) {
    return 1;
  }

  remainingBlinks--;

  if (stone === 0) {
    return getNumberOfStones(1, remainingBlinks);
  }

  const stoneStr = stone.toString();
  if (stoneStr.length % 2 === 0) {
    const left = +stoneStr.slice(0, stoneStr.length / 2);
    const right = +stoneStr.slice(stoneStr.length / 2);

    return (
      getNumberOfStones(left, remainingBlinks) +
      getNumberOfStones(right, remainingBlinks)
    );
  }

  return getNumberOfStones(stone * 2024, remainingBlinks);
};

export default solver;
