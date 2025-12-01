import solver from "./1i";

const input = `3   4
4   3
2   5
1   3
3   9
3   3`;

it("1i", () => {
  solver(input).should.equal(11);
});
