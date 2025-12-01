module.exports = (input = '') => {
  return input
    .split('\n')
    .map((line) => line.match(/(?<=\| ).+/)[0].split(' '))
    .flat()
    .filter((number) => [2, 3, 4, 7].includes(number.length)).length;
};
