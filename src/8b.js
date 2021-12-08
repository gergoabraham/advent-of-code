module.exports = (input = '') => {
  const lines = input.split('\n');

  const numbers = lines.map((line) => decodeNumber(line));

  return numbers.reduce((sum, num) => sum + num);
};

const decodeNumber = (line = '') => {
  const [allDigits, erroneousDigits] = line
    .split(' | ')
    .map((part) => part.split(' '));

  const fixerDictionary = getFixerDictionary(allDigits);
  const fixedOutputDigits = fixOutputDigits(erroneousDigits, fixerDictionary);
  const digits = decodeDigits(fixedOutputDigits);

  const number = Number(digits.join(''));

  return number;
};

const getFixerDictionary = (allDigits) => {
  allDigits.sort((a, b) => a.length - b.length);

  const dictionary = {};

  const d1 = allDigits[0];
  const d7 = allDigits[1];
  const d4 = allDigits[2];
  const d8 = allDigits[9];
  const d235 = allDigits.filter((digit) => digit.length === 5);
  const d069 = allDigits.filter((digit) => digit.length === 6);

  // a: 7 - 1
  const cAndF = d1.split('');
  dictionary.a = removeCharacters(d7, cAndF)[0];

  // c and f: occurs 2 and 3 times in d069
  const cOrANum = [...d069.join('')].filter((c) => c === cAndF[0]).length;
  dictionary.c = cOrANum === 2 ? cAndF[0] : cAndF[1];
  dictionary.f = cOrANum === 2 ? cAndF[1] : cAndF[0];

  // e/g: 8 - a - 4
  const eAndG = removeCharacters(d8, [dictionary.a, ...d4]);

  // e and g: occurs 1 and 3 times in d235
  const eOrGNum = [...d235.join('')].filter((c) => c === eAndG[0]).length;
  dictionary.e = eOrGNum === 1 ? eAndG[0] : eAndG[1];
  dictionary.g = eOrGNum === 1 ? eAndG[1] : eAndG[0];

  // d/b: d235 - 7 - eg
  const d7AndEG = [...d7, dictionary.e, dictionary.g];
  const dsAndBs = removeCharacters(d235.join(''), d7AndEG);

  // d and b: occurs 3 and 1 times in ds/bs
  const dAndBFreq = dsAndBs.reduce((freq, c) => {
    freq[c] = 1 + (freq[c] ?? 0);
    return freq;
  }, {});
  dictionary.d = Object.entries(dAndBFreq).find(([, freq]) => freq === 3)[0];
  dictionary.b = Object.entries(dAndBFreq).find(([, freq]) => freq === 1)[0];

  const decoderDictionary = Object.entries(dictionary).reduce(
    (out, [key, val]) => {
      out[val] = key;
      return out;
    },
    {}
  );

  return decoderDictionary;
};

const removeCharacters = (source = '', characters = ['']) =>
  [...source].filter((c) => !characters.includes(c));

const fixOutputDigits = (outputDigits = [''], fixerDictionary) => {
  return outputDigits.map((digit) => {
    const arr = [...digit].map((c) => fixerDictionary[c]);
    arr.sort();
    return arr.join('');
  });
};

const decodeDigits = (digits = ['']) => {
  const sevenSegmentDecoder = {
    cf: 1,
    acdeg: 2,
    acdfg: 3,
    bcdf: 4,
    abdfg: 5,
    abdefg: 6,
    acf: 7,
    abcdefg: 8,
    abcdfg: 9,
    abcefg: 0,
  };

  return digits.map((str) => sevenSegmentDecoder[str]);
};
