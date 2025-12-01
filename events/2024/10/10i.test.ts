import solver from "./10i";

const input = `89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`;

it("10i", () => {
  solver(input).should.equal(36);
});
