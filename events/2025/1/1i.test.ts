import solver from "./1i";

const input = `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`;

it("1i", () => {
  solver(input).should.equal(3);
});
