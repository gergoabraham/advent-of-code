const solver = (input: string): string | number => {
  const stones = input.split(" ").map((x) => +x);

  let numberOfStones = 0;
  for (let stone of stones) {
    numberOfStones += getNumberOfStonesMemoized(stone, 75);
  }

  return numberOfStones;
};

const memo = new Map<string, number>();

const getNumberOfStonesMemoized = (
  stone: number,
  remainingBlinks: number
): number => {
  const key = `${stone}-${remainingBlinks}`;

  if (!memo.has(key)) {
    memo.set(key, getNumberOfStones(stone, remainingBlinks));
  }

  return memo.get(key)!;
};

const getNumberOfStones = (stone: number, remainingBlinks: number): number => {
  if (remainingBlinks === 0) {
    return 1;
  }

  remainingBlinks--;

  if (stone === 0) {
    return getNumberOfStonesMemoized(1, remainingBlinks);
  }

  const stoneStr = stone.toString();
  if (stoneStr.length % 2 === 0) {
    const left = +stoneStr.slice(0, stoneStr.length / 2);
    const right = +stoneStr.slice(stoneStr.length / 2);

    return (
      getNumberOfStonesMemoized(left, remainingBlinks) +
      getNumberOfStonesMemoized(right, remainingBlinks)
    );
  }

  return getNumberOfStonesMemoized(stone * 2024, remainingBlinks);
};

export default solver;
