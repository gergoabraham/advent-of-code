const expect = require('chai').expect;
const solver = require('./2a');

const input = ['down 6', 'forward 7', 'up 2', 'forward 2'];

it('2a', () => {
  expect(solver(input)).to.equal(36);
});
