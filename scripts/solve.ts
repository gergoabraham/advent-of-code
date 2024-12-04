const solve = async () => {
  const problem = process.argv[2];
  const day = problem.match(/\d+/);

  const solver = (await import(`../src/${day}/${problem}.ts`)).default;
  const input = (await import(`../src/${day}/${day}.input.ts`)).default;

  console.log("\n", solver(input), "\n");
};

solve();
