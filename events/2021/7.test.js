const expect = require('chai').expect;
const solver = require('./7a');
const solverB = require('./7b');

const input = `16,1,2,0,4,2,7,1,2,14`;

it('7a', () => {
  expect(solver(input)).to.equal(37);
});

it('7b', () => {
  expect(solverB(input)).to.equal(168);
});
