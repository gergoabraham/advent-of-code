const solver = (input: string): string | number => {
  const worksheet = input.split('\n');

  const operatorYIndex = worksheet.length - 1;
  const X = worksheet[0].length;

  let operator: '+' | '*' = '+';
  let acc = 0;
  let grandTotal = 0;

  for (let x = 0; x < X; x++) {
    const operatorCandidate = worksheet[operatorYIndex][x];
    if (operatorCandidate == '*' || operatorCandidate === '+') {
      grandTotal += acc;
      operator = operatorCandidate;

      acc = operator === '+' ? 0 : 1;
    }

    let operand = '';
    for (let y = 0; y < operatorYIndex; y++) {
      operand += worksheet[y][x];
    }
    if (operand.trim()) {
      const operandNumber = +operand.trim();
      if (operator === '+') {
        acc += operandNumber;
      } else {
        acc *= operandNumber;
      }
    }
  }

  grandTotal += acc;

  return grandTotal;
};

export default solver;
