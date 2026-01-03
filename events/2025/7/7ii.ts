const solver = (input: string): string | number => {
  const diagram = input.split('\n');

  const startY = diagram[0].indexOf('S');
  const memo = new Map<string, number>();

  const traverse = (diagram: string[], x: number, y: number): number => {
    if (x === diagram.length - 1) {
      return 1;
    }

    const memoKey = `${x}-${y}`;
    const memoValue = memo.get(memoKey);
    if (memoValue !== undefined) return memoValue;

    let value;
    if (diagram[x + 1][y] === '^') {
      value = traverse(diagram, x + 1, y - 1) + traverse(diagram, x + 1, y + 1);
    } else {
      value = traverse(diagram, x + 1, y);
    }

    memo.set(memoKey, value);
    return value;
  };

  return traverse(diagram, 0, startY);
};

export default solver;
