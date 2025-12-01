const solver = (input: string): string | number => {
  const lists = input.split("\n").map((line) => line.split("   "));

  const frequencyTable = lists.reduce<Record<string, number>>(
    (table, [, num]) => {
      table[num] = (table[num] ?? 0) + 1;

      return table;
    },
    {}
  );

  return lists
    .map(([num]) => +num * (frequencyTable[num] ?? 0))
    .reduce((sum, num) => sum + num);
};

export default solver;
