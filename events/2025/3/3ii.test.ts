import solver from './3ii';

const input = `987654321111111
811111111111119
234234234234278
818181911112111`;

it('3ii', () => {
  solver(input).should.equal(3121910778619);
});
