const solverA = require('./16a');

module.exports = (input = '') => {
  return solve(getPackage(input));
};

const solve = (package) => {
  const data =
    package.typeId === 4
      ? package
      : package.subPackets.map((packet) => solve(packet));

  return solverMap[package.typeId](data);
};

const solverMap = {
  0: (values) => values.reduce((sum, val) => sum + val),
  1: (values) => values.reduce((prod, val) => prod * val),
  2: (values) => Math.min(...values),
  3: (values) => Math.max(...values),
  4: (package) => package.value,
  5: ([a, b]) => (a > b ? 1 : 0),
  6: ([a, b]) => (a < b ? 1 : 0),
  7: ([a, b]) => (a === b ? 1 : 0),
};

const getPackage = (input) => solverA(input, true);
