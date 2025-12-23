import solver from "./5i";

const input = `3-5
10-14
16-20
12-18

1
5
8
11
17
32`;

it("5i", () => {
  solver(input).should.equal(3);
});
