module.exports = (input = '') => {
  const incompleteScores = input
    .split('\n')
    .map((line) => {
      const stack = [];

      for (const c of [...line]) {
        if (!closingToOpeningMap[c]) {
          stack.push(c);
        } else {
          const openingTag = stack.pop();
          if (closingToOpeningMap[c] !== openingTag) {
            return null;
          }
        }
      }

      let score = 0;

      const stackLength = stack.length;
      for (let i = 0; i < stackLength; i++) {
        const openingTag = stack.pop();
        const closingTag = openingToClosingMap[openingTag];

        score *= 5;
        score += scoreMap[closingTag];
      }

      return score;
    })
    .filter((x) => x);

  incompleteScores.sort((a, b) => a - b);

  return incompleteScores[Math.floor(incompleteScores.length / 2)];
};

const closingToOpeningMap = {
  ')': '(',
  ']': '[',
  '}': '{',
  '>': '<',
};

const openingToClosingMap = {
  '(': ')',
  '[': ']',
  '{': '}',
  '<': '>',
};

const scoreMap = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4,
};
