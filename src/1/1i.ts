const solver = (input: string): string | number => {
  const A: number[] = [];
  const B: number[] = [];

  input.split("\n").map((line) => {
    const [a, b] = line.split("   ");

    A.push(+a);
    B.push(+b);
  });

  const compareFunction = (a: number, b: number) => a - b;
  A.sort(compareFunction);
  B.sort(compareFunction);

  let distanceSum = 0;
  for (let i = 0; i < A.length; i++) {
    distanceSum += Math.abs(A[i] - B[i]);
  }

  return distanceSum;
};

export default solver;
