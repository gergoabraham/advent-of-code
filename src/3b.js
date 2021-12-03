module.exports = (input = ['']) => {
  const oxygenGeneratorRate = getStuff(input, 'most');
  const co2stuffRate = getStuff(input, 'least');

  return oxygenGeneratorRate * co2stuffRate;
};

function getStuff(input = [''], criteria) {
  let candidates = [...input];

  for (let i = 0; i < candidates[0].length && candidates.length > 1; i++) {
    const balance = candidates.reduce(
      (num, str) => num + (str.charAt(i) === '1' ? 1 : -1),
      0
    );

    const searchedBit =
      balance === 0
        ? criteria === 'most'
          ? '1'
          : '0'
        : (balance > 0) ^ (criteria !== 'most')
        ? '1'
        : '0';

    candidates = candidates.filter((str) => str.charAt(i) === searchedBit);
  }

  return parseInt(candidates[0], 2);
}
