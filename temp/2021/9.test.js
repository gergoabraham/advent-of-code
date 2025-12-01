const expect = require('chai').expect;
const solverA = require('./9a');
const solverB = require('./9b');

const input = `2199943210
3987894921
9856789892
8767896789
9899965678`;

it('9a', () => {
  expect(solverA(input)).to.equal(15);
});

it('9b', () => {
  expect(solverB(input)).to.equal(1134);
});
