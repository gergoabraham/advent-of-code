const solver = (input: string): string | number => {
  const batteryBanks = input
    .split('\n')
    .map((bank) => bank.split('').map((x) => +x));

  let joltageSum = 0;

  for (const bank of batteryBanks) {
    let left = -Infinity;
    let right = -Infinity;

    for (let i = 0; i < bank.length - 1; i++) {
      if (bank[i] > left) {
        left = bank[i];
        right = bank[bank.length - 1];
      } else if (bank[i] > right) {
        right = bank[i];
      }
    }

    const joltage = 10 * left + right;
    joltageSum += joltage;
  }

  return joltageSum;
};

export default solver;
