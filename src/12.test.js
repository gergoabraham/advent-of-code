const expect = require('chai').expect;
const solverA = require('./12a');
const solverB = require('./12b');

const input1 = `A-c
start-A
start-b
A-b
b-d
A-end
b-end`;

const input3 = `fs-end
he-DX
fs-he
start-DX
pj-DX
end-zg
zg-sl
zg-pj
pj-he
RW-he
fs-DX
pj-RW
zg-RW
start-pj
he-WI
zg-he
pj-fs
start-RW`;

it('12a - first example', () => {
  expect(solverA(input1)).to.equal(10);
});

it('12a - third example', () => {
  expect(solverA(input3)).to.equal(226);
});

it('12b - first example', () => {
  expect(solverB(input1)).to.equal(36);
});

it('12b - third example', () => {
  expect(solverB(input3)).to.equal(3509);
});
