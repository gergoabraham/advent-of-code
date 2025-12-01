const solver = (input: string): string | number =>
  sumTestValuesForSuccessfullyFilledEquations({
    input,
    operators: [addition, multiplication],
  });

export type Operator = (a: number, b: number) => number;
export const addition: Operator = (a, b) => a + b;
export const multiplication: Operator = (a, b) => a * b;

export const sumTestValuesForSuccessfullyFilledEquations = ({
  input,
  operators,
}: {
  input: string;
  operators: Operator[];
}): number => {
  const equations = parseInputForEquations(input);

  let numberOfFillableEquations = 0;
  for (const { target, operands } of equations) {
    const solutions = calculateSolutions(target, operands, operators);

    if (solutions.includes(target)) {
      numberOfFillableEquations += target;
    }
  }

  return numberOfFillableEquations;
};

const calculateSolutions = (
  target: number,
  operands: number[],
  operators: Operator[]
): number[] => {
  if (operands.length === 1) {
    return operands;
  }

  const subarray = operands.slice(0, -1);
  const lastOperand = operands[operands.length - 1];

  const solutionsFromSubarray = calculateSolutions(target, subarray, operators);

  return solutionsFromSubarray
    .flatMap((oneSolution) =>
      operators.map((operator) => operator(oneSolution, lastOperand))
    )
    .filter((x) => x <= target);
};

const parseInputForEquations = (input: string) =>
  input.split("\n").map((line) => {
    const [targetStr, operandsStr] = line.split(": ");

    return {
      target: +targetStr,
      operands: operandsStr.split(" ").map((x) => +x),
    };
  });

export default solver;
