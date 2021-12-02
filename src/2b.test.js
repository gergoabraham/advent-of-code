const expect = require('chai').expect;
const solver = require('./2b');

describe('2b', () => {
  const input = [
    'down 6', // aim: 6
    'forward 2', // pos: 2, depth: 6*2 = 12
    'up 1', // aim: 5
    'forward 3', // pos: 2+3=5, depth: 12+5*3 = 27 => 135
  ];

  it('blab', () => {
    expect(solver(input)).to.equal(135);
  });
});
