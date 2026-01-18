import solver from './9ii';

const input = `7,1
11,1
11,7
9,7
9,5
2,5
2,3
7,3`;

it('9ii', () => {
  solver(input).should.equal(24);
});
