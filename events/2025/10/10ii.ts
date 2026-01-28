const solver = (input: string): string | number => {
  const machines = input.split('\n').map((line) => {
    const items = line.split(' ');

    const buttonConfigs = items.slice(1, -1).map((buttonGroup) =>
      buttonGroup
        .slice(1, -1)
        .split(',')
        .map((x) => +x),
    );
    buttonConfigs.sort((a, b) => b.length - a.length);

    const joltageRequirements = items[items.length - 1]
      .slice(1, -1)
      .split(',')
      .map((x) => +x);

    return {
      buttonConfigs,
      joltageRequirements,
    };
  });
  let METHOD: 'BFS' | 'DFS' = 'DFS';

  return METHOD === 'DFS'
    ? machines
        .map(({ buttonConfigs, joltageRequirements }, i) => {
          console.log('(1)');
          const a = performance.now();
          const result = backtrackSolutions(buttonConfigs, joltageRequirements);
          console.log(`   took ${(performance.now() - a).toFixed(1)} ms`);
          console.log(`   result: ${result}`);

          return result;
        })
        .reduce((sum, num) => sum + num)
    : machines
        .map(({ buttonConfigs, joltageRequirements }, i) => {
          console.log('(1)');
          const a = performance.now();
          const result = breadthFirstSearch(buttonConfigs, joltageRequirements);
          console.log(`   took ${(performance.now() - a).toFixed(1)} ms`);
          console.log(`   result: ${result}`);

          return result;
        })
        .reduce((sum, num) => sum + num);
};

const breadthFirstSearch = (
  buttonConfigs: number[][],
  joltageRequirements: number[],
  memo = new Set<string>(),
): number => {
  let steps = 0;
  const stack: number[][] = [new Array(joltageRequirements.length).fill(0)];
  let nodes = 0;

  while (stack.length) {
    const sizeOfLevel = stack.length;
    steps++;
    nodes += sizeOfLevel;
    // console.log({ steps, sizeOfLevel });

    for (let i = 0; i < sizeOfLevel; i++) {
      const joltage = stack.shift()!;

      const nextSteps = buttonConfigs
        .map((buttonConfig) => applyButtonPress(buttonConfig, joltage))
        .filter(
          (nextJoltageLevels) =>
            !memo.has(nextJoltageLevels.join('-')) &&
            isSolutionValid(joltageRequirements, nextJoltageLevels),
        );

      for (const nextStep of nextSteps) {
        if (isSolutionFound(joltageRequirements, nextStep)) {
          console.log(`  nodes: ${nodes}`);
          return steps;
        }
        const memoKey = nextStep.join('-');
        memo.add(memoKey);
      }

      stack.push(...nextSteps);
    }
  }

  return -1;
};

const backtrackSolutions = (
  buttonConfigs: number[][],
  joltageRequirements: number[],
  currentJoltageLevels: number[] = new Array(joltageRequirements.length).fill(
    0,
  ),
  memo = new Map<string, number>(),
  first = true,
  depth = 0,
  stats = { maxDepth: 0, nodes: 0 },
): number => {
  if (isSolutionFound(joltageRequirements, currentJoltageLevels)) {
    // console.log('solution found!');
    return 0;
  }

  stats.maxDepth = Math.max(stats.maxDepth, depth);
  stats.nodes++;

  const memoKey = currentJoltageLevels.join('-');
  const memoValue = memo.get(memoKey);
  if (memoValue) {
    return memoValue;
  }

  const nextSteps = buttonConfigs
    .map((buttonConfig) => applyButtonPress(buttonConfig, currentJoltageLevels))
    .filter((nextJoltageLevels) =>
      isSolutionValid(joltageRequirements, nextJoltageLevels),
    )
    .map(
      (nextJoltageLevels) =>
        1 +
        backtrackSolutions(
          buttonConfigs,
          joltageRequirements,
          nextJoltageLevels,
          memo,
          false,
          depth + 1,
          stats,
        ),
    );

  const calculatedValue = nextSteps.reduce(
    (min, num) => Math.min(min, num),
    Infinity,
  );
  memo.set(memoKey, calculatedValue);

  if (first) {
    console.log(`   memo size: ${memo.size}`);
    console.log(`   max depth: ${stats.maxDepth}`);
    console.log(`   nodes: ${stats.nodes}`);
  }

  return calculatedValue;
};

const applyButtonPress = (buttons: number[], joltageLevels: number[]) => {
  const output = [...joltageLevels];
  for (const button of buttons) {
    output[button]++;
  }

  return output;
};

const isSolutionFound = (target: number[], current: number[]) => {
  for (let i = 0; i < target.length; i++) {
    if (target[i] !== current[i]) {
      return false;
    }
  }
  return true;
};

const isSolutionValid = (target: number[], current: number[]) => {
  for (let i = 0; i < target.length; i++) {
    if (target[i] < current[i]) {
      return false;
    }
  }
  return true;
};

export default solver;
