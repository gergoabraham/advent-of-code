const expect = require('chai').expect;
const solver = require('./3b');

const input = [
  '00100',
  '11110',
  '10110',
  '10111',
  '10101',
  '01111',
  '00111',
  '11100',
  '10000',
  '11001',
  '00010',
  '01010',
];

it('3b', () => {
  expect(solver(input)).to.equal(230);
});
