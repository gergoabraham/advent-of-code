const solver = (input: string): string | number => {
  const lines = input.split('\n');

  const numbers = lines.slice(0, lines.length - 1).map((line) =>
    line
      .trim()
      .split(/ +/)
      .map((x) => +x)
  );
  const operantors = lines[lines.length - 1].trim().split(/ +/);

  let grandTotal = 0;

  for (let problemIndex = 0; problemIndex < numbers[0].length; problemIndex++) {
    const operator = operantors[problemIndex];
    let result = numbers[0][problemIndex];

    for (let numberIndex = 1; numberIndex < numbers.length; numberIndex++) {
      const number = numbers[numberIndex][problemIndex];

      if (operator === '+') {
        result += number;
      } else {
        result *= number;
      }
    }
    grandTotal += result;
  }

  return grandTotal;
};

export default solver;
