const countIncreases = require('./1a');
const { expect } = require('chai');

it('1a', () => {
  expect(countIncreases([3, 2, 3, 5, 4, 9, 0])).to.equal(3);
});
