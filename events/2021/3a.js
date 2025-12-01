module.exports = (input = ['']) => {
  const numberOfOnes = Array(input[0].length).fill(0);

  input.forEach((str) =>
    [...str].forEach((bit, i) => (bit === '1' ? numberOfOnes[i]++ : null))
  );

  const gammaRateBin = numberOfOnes.reduce(
    (gamma, num) => gamma + (num > input.length / 2 ? '1' : '0'),
    ''
  );
  const epsilonRateBin = [...gammaRateBin].reduce(
    (prev, c) => prev + (c === '1' ? '0' : '1'),
    ''
  );

  const gammaRate = parseInt(gammaRateBin, 2);
  const epsilonRate = parseInt(epsilonRateBin, 2);

  return gammaRate * epsilonRate;
};
