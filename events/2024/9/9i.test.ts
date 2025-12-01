import solver from "./9i";

const input = `2333133121414131402`;

it("9i", () => {
  solver(input).should.equal(1928);
});
