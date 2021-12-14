const expect = require('chai').expect;
const solverA = require('./14a');
const solverB = require('./14b');

const input = `NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`;

it('14a', () => {
  expect(solverA(input)).to.equal(1588);
});

it('14b', () => {
  expect(solverB(input)).to.equal(2188189693529);
});
