const solver = (input: string): string | number => {
  const ranges = input.split(',').map((line) => line.split('-').map((x) => +x));

  let sum = 0;

  for (const range of ranges) {
    for (let i = range[0]; i <= range[1]; i++) {
      const id = i.toString();

      if (
        id.length % 2 === 0 &&
        id.slice(0, id.length / 2) === id.slice(id.length / 2)
      ) {
        sum += i;
      }
    }
  }

  return sum;
};

export default solver;
