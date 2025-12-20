import solver from "./3i";

const input = `987654321111111
811111111111119
234234234234278
818181911112111`;

it("3i", () => {
  solver(input).should.equal(357);
});
