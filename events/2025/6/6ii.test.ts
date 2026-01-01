import solver from './6ii';

const input = `123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +`;

it('6ii', () => {
  solver(input).should.equal(3263827);
});
