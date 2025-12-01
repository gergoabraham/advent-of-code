const solverA = require('./15a');

module.exports = (input = '', silent = false) => {
  const largerInput = generate25TimesBiggerMapInTheUgliestWayImaginable(input);

  !silent && console.time('Dijkstra algorithm finished in');
  const result = solverA(largerInput, silent);
  !silent && console.timeEnd('Dijkstra algorithm finished in');
  return result;
};

const generate25TimesBiggerMapInTheUgliestWayImaginable = (input) => {
  const inputArray = input
    .split('\n')
    .map((line) => line.split('').map((num) => Number(num)));
  const height = inputArray.length;
  const width = inputArray[0].length;

  const outputArray = inputArray.map((line) => {
    const longerLine = [...line, ...line, ...line, ...line, ...line];
    longerLine.forEach((_, i) => {
      const candidate = longerLine[i] + Math.floor(i / line.length);
      longerLine[i] = candidate > 9 ? candidate - 9 : candidate;
    });

    return longerLine;
  });

  for (let i = 0; i < height * 4; i++) {
    outputArray.push([...outputArray[i].slice(width)]);
    const currentLine = outputArray[outputArray.length - 1];
    for (let j = 0; j < width; j++) {
      const candidate = currentLine[currentLine.length - width] + 1;
      currentLine.push(candidate > 9 ? candidate - 9 : candidate);
    }
  }

  return outputArray.map((line) => line.join('')).join('\n');
};
