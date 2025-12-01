module.exports = (input = '') =>
  input
    .split('\n')
    .map((line) => {
      const stack = [];

      for (const c of [...line]) {
        if (!closingToOpeningMap[c]) {
          stack.push(c);
        } else {
          const openingTag = stack.pop();
          if (closingToOpeningMap[c] !== openingTag) {
            return scoreMap[c];
          }
        }
      }

      return null;
    })
    .reduce((sum, num) => sum + num);

const closingToOpeningMap = {
  ')': '(',
  ']': '[',
  '}': '{',
  '>': '<',
};

const scoreMap = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
};
