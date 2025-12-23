import solver from './5ii';

const input = `3-5
10-14
16-20
12-18

1
5
8
11
17
32`;

it('5ii', () => {
  solver(input).should.equal(14);
});
