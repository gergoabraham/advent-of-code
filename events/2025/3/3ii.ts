const solver = (input: string): string | number => {
  const batteryBanks = input
    .split('\n')
    .map((bank) => bank.split('').map((x) => +x));

  let joltageSum = 0;

  for (const bank of batteryBanks) {
    joltageSum += +getJoltage(bank, 12);
  }

  return joltageSum;
};

const getJoltage = (bank: number[], digits: number): string => {
  let max = -Infinity;
  let maxIndex = 0;

  for (let i = 0; i < bank.length - (digits - 1); i++) {
    if (bank[i] > max) {
      max = bank[i];
      maxIndex = i;
    }
  }

  if (digits === 1) {
    return `${max}`;
  } else {
    return `${max}${getJoltage(bank.slice(maxIndex + 1), digits - 1)}`;
  }
};

export default solver;
