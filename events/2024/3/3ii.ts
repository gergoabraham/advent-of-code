const solver = (input: string): string | number => {
  const commands = input.match(/(mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\))/g)!;

  let isEnabled = true;
  let sum = 0;

  for (const command of commands) {
    if (command === "do()") {
      isEnabled = true;
    } else if (command === "don't()") {
      isEnabled = false;
    } else if (isEnabled) {
      const [a, b] = command.match(/\d{1,3}/g)!;

      sum += +a * +b;
    }
  }

  return sum;
};

export default solver;
