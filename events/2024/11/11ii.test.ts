import solver from "./11ii";

const input = `125 17`;

it("11ii", () => {
  solver(input).should.equal(65601038650482);
});
