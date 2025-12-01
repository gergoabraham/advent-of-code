import solver from "./3ii";

const input = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`;

it("3ii", () => {
  solver(input).should.equal(48);
});
