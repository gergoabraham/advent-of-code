const EVENT = '2025';

const solve = async () => {
  const problem = process.argv[2];
  const day = problem.match(/\d+/);

  const solver = (await import(`../events/${EVENT}/${day}/${problem}.ts`))
    .default;
  const input = (await import(`../events/${EVENT}/${day}/${day}.input.ts`))
    .default;

  console.log('\n', solver(input), '\n');
};

solve();
