const expect = require('chai').expect;
const solverA = require('./16a');
// const solverB = require('./16b');

const input = ``;

describe('16a', () => {
  it('literal', () => {
    expect(solverA('D2FE28')).to.equal(6);
  });

  it('operator with length type 0', () => {
    expect(solverA('38006F45291200')).to.equal(9);
  });

  it('operator with length type 1', () => {
    expect(solverA('EE00D40C823060')).to.equal(14);
  });

  it('first example', () => {
    expect(solverA('8A004A801A8002F478')).to.equal(16);
  });

  it('second example', () => {
    expect(solverA('620080001611562C8802118E34')).to.equal(12);
  });

  it('third example', () => {
    expect(solverA('C0015000016115A2E0802F182340')).to.equal(23);
  });

  it('fourth example', () => {
    expect(solverA('A0016C880162017C3686B18A3D4780')).to.equal(31);
  });
});

// it('16b', () => {
//   expect(solverB(input, true)).to.equal(315);
// });
