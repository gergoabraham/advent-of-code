import solver from "./9ii";

const input = `2333133121414131402`;

it("9ii", () => {
  solver(input).should.equal(2858);
});
