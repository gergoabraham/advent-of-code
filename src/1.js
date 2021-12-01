const { firstInput } = require('./1.input');

const countIncreases = (input = []) => {
  return input.reduce(
    (count, current, i, input) => (current > input[i - 1] ? count + 1 : count),
    0
  );
};

const run = () => {
  console.log(countIncreases(firstInput));
};

module.exports = { countIncreases, run };
