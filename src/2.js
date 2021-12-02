const countIncreases = require('./1');

module.exports = (input) => {
  const averages = generateSlidingWindowAverages(input);
  return countIncreases(averages);
};

const generateSlidingWindowAverages = (input) => {
  return input.map((current, i, array) => current + array[i + 1] + array[i + 2]).slice(0, -2);
};

module.exports.generateSlidingWindowAverages = generateSlidingWindowAverages;
