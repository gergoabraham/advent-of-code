const expect = require('chai').expect;
const solverA = require('./11a');
const solverB = require('./11b');

const input = `5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`;

it('11a', () => {
  expect(solverA(input)).to.equal(1656);
});

it('11b', () => {
  expect(solverB(input)).to.equal(195);
});
