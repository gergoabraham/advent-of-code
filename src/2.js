const { countIncreases } = require('./1');
const { firstInput } = require('./1.input');

const countIncreasesWithSlidingWindow = (input) => {
  const averages = generateSlidingWindowAverages(input);
  return countIncreases(averages);
};

const generateSlidingWindowAverages = (input) => {
  return input.map((current, i, array) => current + array[i + 1] + array[i + 2]).slice(0, -2);
};

const run = () => {
  console.log(countIncreasesWithSlidingWindow(firstInput));
};

module.exports = { countIncreasesWithSlidingWindow, generateSlidingWindowAverages, run };
