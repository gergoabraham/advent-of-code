const expect = require('chai').expect;
const solver = require('./3');

describe('3', () => {
  const input = ['down 6', 'forward 7', 'up 2', 'forward 2'];

  it('blab', () => {
    expect(solver(input)).to.equal(36);
  });
});
