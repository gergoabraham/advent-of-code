const expect = require('chai').expect;
const solverA = require('./16a');
const solverB = require('./16b');

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

describe('16b', () => {
  it('literal', () => {
    expect(solverB('D2FE28')).to.equal(2021);
  });

  it('sum', () => {
    expect(solverB('C200B40A82')).to.equal(3);
  });

  it('product', () => {
    expect(solverB('04005AC33890')).to.equal(54);
  });

  it('minimum', () => {
    expect(solverB('880086C3E88112')).to.equal(7);
  });

  it('maximum', () => {
    expect(solverB('CE00C43D881120')).to.equal(9);
  });

  it('greater than', () => {
    expect(solverB('F600BC2D8F')).to.equal(0);
  });

  it('less than', () => {
    expect(solverB('D8005AC2A8F0')).to.equal(1);
  });

  it('equal', () => {
    expect(solverB('9C005AC2F8F0')).to.equal(0);
  });

  it('one plus example', () => {
    expect(solverB('9C0141080250320F1802104A08')).to.equal(1);
  });
});
