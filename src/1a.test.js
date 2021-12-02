const countIncreases = require('./1a');
const { expect } = require('chai');

context('1a', () => {
  it('count increases', () => {
    expect(countIncreases([3, 2, 3, 5, 4, 9, 0])).to.equal(3);
  });
});
