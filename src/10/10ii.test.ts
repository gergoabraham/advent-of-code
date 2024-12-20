import solver from "./10ii";

const input = `89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`;

it("10ii", () => {
  solver(input).should.equal(81);
});
