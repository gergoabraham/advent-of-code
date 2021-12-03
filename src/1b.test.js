const { expect } = require('chai');
const countIncreasesWithSlidingWindow = require('./1b');
const { generateSlidingWindowAverages } = countIncreasesWithSlidingWindow;

const input = [2, 5, 4, 1, 0, 6, 7, 1, 4];

it('1b generateSlidingWindowAverages', () => {
  expect(generateSlidingWindowAverages(input)).to.deep.equal([
    11, 10, 5, 7, 13, 14, 12,
  ]);
});

it('1b count increases with sliding window', () => {
  expect(countIncreasesWithSlidingWindow(input)).to.equal(3);
});
