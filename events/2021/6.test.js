const expect = require('chai').expect;
const solver = require('./6a');
const solverB = require('./6b');

const input = `3,4,3,1,2`;

it('6a', () => {
  expect(solver(input)).to.equal(5934);
});

it('6b', () => {
  expect(solverB(input)).to.equal(26984457539);
});
