module.exports = (input = '') => {
  const binaryInput = [...input]
    .map((char) => [...parseInt(char, 16).toString(2).padStart(4, 0)])
    .flat();
  const package = decodePackage(binaryInput);

  return sumVersions(package);
};

const LITERAL_ID = 4;

const LENGTH_TYPE_ID = {
  BIT_LENGTH_ON_15BITS: 0,
  SUB_PACKETS_NUMBER_ON_11BITS: 1,
};

const decodePackage = (binaryInput = ['']) => {
  const version = binArrayToNumber(binaryInput.splice(0, 3));
  const typeId = binArrayToNumber(binaryInput.splice(0, 3));

  if (typeId === LITERAL_ID) {
    const value = decodeNumber(binaryInput);
    return { version, typeId, value };
  } else {
    const lengthType = Number(binaryInput.splice(0, 1)[0]);

    if (lengthType === LENGTH_TYPE_ID.BIT_LENGTH_ON_15BITS) {
      const bitLength = binArrayToNumber(binaryInput.splice(0, 15));

      const subPacketsBitArray = binaryInput.splice(0, bitLength);

      const subPackets = [];
      while (subPacketsBitArray.length > 0) {
        subPackets.push(decodePackage(subPacketsBitArray));
      }

      return { version, typeId, lengthType, bitLength, subPackets };
    } else {
      const subPacketNumber = binArrayToNumber(binaryInput.splice(0, 11));
      const subPackets = [];

      for (let i = 0; i < subPacketNumber; i++) {
        subPackets.push(decodePackage(binaryInput));
      }

      return { version, typeId, lengthType, subPacketNumber, subPackets };
    }
  }
};

const decodeNumber = (binaryNumber = ['']) => {
  const numberArray = [];
  let shouldContinue;
  do {
    shouldContinue = binaryNumber.splice(0, 1)[0] === '1';
    numberArray.push(...binaryNumber.splice(0, 4));
  } while (shouldContinue);

  return binArrayToNumber(numberArray);
};

const binArrayToNumber = (binArray) => parseInt(binArray.join(''), 2);

const sumVersions = (packet) => {
  return (
    packet.version +
    (packet.subPackets?.reduce(
      (sum, subPacket) => sum + sumVersions(subPacket),
      0
    ) ?? 0)
  );
};
