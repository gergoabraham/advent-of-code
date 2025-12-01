const expect = require('chai').expect;
const solver = require('./7a');
const solverB = require('./7b');

const input = `16,1,2,0,4,2,7,1,2,14`;
const realInput = require('./7.input');

it('7a', () => {
  expect(solver(input)).to.equal(37);
});

it('7a with real input', () => {
  expect(solver(realInput)).to.equal(355521);
});

it('7b', () => {
  expect(solverB(input)).to.equal(168);
});

it('7b with real input', () => {
  expect(solverB(realInput)).to.equal(100148777);
});
