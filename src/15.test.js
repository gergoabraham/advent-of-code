const expect = require('chai').expect;
const solverA = require('./15a');
const solverB = require('./15b');

const input = `1163751742
1381373672
2136511328
3694931569
7463417111
1319128137
1359912421
3125421639
1293138521
2311944581`;

it('15a', () => {
  expect(solverA(input, true)).to.equal(40);
});

it('15b', () => {
  expect(solverB(input, true)).to.equal(315);
});

// The result for B:

// before using 'consideredSet', the next currentNode was
// searched in all unvisited nodes:
// Dijkstra algorithm finished in: 6:52.767 (m:ss.mmm)

// consideredSet contains all nodes that are unvisited and have smaller than
// infinite tentative distances:
// Dijkstra algorithm finished in: 2.747s
