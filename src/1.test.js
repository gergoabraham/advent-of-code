const { countIncreases } = require('./1');
const { expect } = require('chai');

context('1', () => {
  it('sajt', () => {
    expect(countIncreases([2, 3, 5])).to.contain(3);
  });
});
