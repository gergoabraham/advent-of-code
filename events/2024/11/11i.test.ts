import solver from "./11i";

const input = `125 17`;

it("11i", () => {
  solver(input).should.equal(55312);
});
