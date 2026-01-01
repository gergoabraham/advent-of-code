import solver from "./6i";

const input = `123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +`;

it("6i", () => {
  solver(input).should.equal(4277556);
});
