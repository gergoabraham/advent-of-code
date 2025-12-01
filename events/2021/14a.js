module.exports = (input = '', steps = 10) => {
  const [template, rulesInput] = input.split('\n\n');

  const pairToPairsTable = parseRules(rulesInput);
  const possiblePairs = Object.keys(pairToPairsTable);
  const pairsFrequency = countPairs(possiblePairs, template);

  for (let step = 0; step < steps; step++) {
    const prevPairsFreq = { ...pairsFrequency };

    possiblePairs.forEach((pair) => {
      const pairNumber = prevPairsFreq[pair];
      const newPairs = pairToPairsTable[pair];

      pairsFrequency[newPairs[0]] += pairNumber;
      pairsFrequency[newPairs[1]] += pairNumber;
      pairsFrequency[pair] -= pairNumber;
    });
  }

  const elementsFreq = countElements(possiblePairs, pairsFrequency, template);
  const { minCount, maxCount } = countMinAndMaxOccurrences(elementsFreq);

  return maxCount - minCount;
};

const parseRules = (rulesInput) =>
  rulesInput.split('\n').reduce((pairToPairsTable, rule) => {
    const [pair, insertedElement] = rule.split(' -> ');

    pairToPairsTable[pair] = [
      pair.charAt(0) + insertedElement,
      insertedElement + pair.charAt(1),
    ];

    return pairToPairsTable;
  }, {});

const countPairs = (possiblePairs, template) => {
  const pairsFrequency = possiblePairs.reduce((pairs, pair) => {
    pairs[pair] = 0;

    return pairs;
  }, {});

  [...template].forEach((char, i, array) => {
    if (i === array.length - 1) {
      return;
    }

    const pair = char + array[i + 1];
    pairsFrequency[pair]++;
  }, {});

  return pairsFrequency;
};

const countElements = (possiblePairs, pairsFrequency, template) => {
  const elementsNumber = possiblePairs.reduce((elementsNumber, pair) => {
    elementsNumber[pair.charAt(0)] = 0;
    return elementsNumber;
  }, {});

  possiblePairs.forEach((pair) => {
    elementsNumber[pair.charAt(0)] += pairsFrequency[pair] / 2;
    elementsNumber[pair.charAt(1)] += pairsFrequency[pair] / 2;
  });
  elementsNumber[template.charAt(0)] += 0.5;
  elementsNumber[template.charAt(template.length - 1)] += 0.5;
  return elementsNumber;
};

const countMinAndMaxOccurrences = (elementsNumber) =>
  Object.values(elementsNumber).reduce(
    (minMax, value) => {
      minMax.minCount = Math.min(minMax.minCount, value);
      minMax.maxCount = Math.max(minMax.maxCount, value);
      return minMax;
    },
    { minCount: Infinity, maxCount: -Infinity }
  );
