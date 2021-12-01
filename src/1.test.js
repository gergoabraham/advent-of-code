const { countIncreases } = require('./1');
const { expect } = require('chai');

context('1', () => {
  it('count increases', () => {
    expect(countIncreases([3, 2, 3, 5, 4, 9, 0])).to.equal(3);
  });
});
