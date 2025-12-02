import solver from './1ii';

const input = `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`;

describe('1ii', () => {
  it('test input', () => {
    solver(input).should.equal(6);
  });

  describe('starting from 50', () => {
    it('1ii R', () => {
      solver(`R1`).should.equal(0);
      solver(`R2`).should.equal(0);
      solver(`R49`).should.equal(0);
      solver(`R50`).should.equal(1);
      solver(`R51`).should.equal(1);
      solver(`R149`).should.equal(1);
      solver(`R150`).should.equal(2);
    });

    it('1ii L', () => {
      solver(`L1`).should.equal(0);
      solver(`L2`).should.equal(0);
      solver(`L49`).should.equal(0);
      solver(`L50`).should.equal(1);
      solver(`L51`).should.equal(1);
      solver(`L149`).should.equal(1);
      solver(`L150`).should.equal(2);
    });
  });

  describe('starting from 0', () => {
    it('1ii R', () => {
      solver(`R50\nR1`).should.equal(1);
      solver(`R50\nR99`).should.equal(1);
      solver(`R50\nR100`).should.equal(2);
      solver(`R50\nR101`).should.equal(2);
      solver(`R50\nR199`).should.equal(2);
      solver(`R50\nR200`).should.equal(3);
    });

    it('1ii L', () => {
      solver(`R50\nL1`).should.equal(1);
      solver(`R50\nL99`).should.equal(1);
      solver(`R50\nL100`).should.equal(2);
      solver(`R50\nL101`).should.equal(2);
      solver(`R50\nL199`).should.equal(2);
      solver(`R50\nL200`).should.equal(3);
    });
  });
});
