module.exports = (input = []) => {
  let aim = 0;
  let depth = 0;
  let position = 0;

  input.forEach((command) => {
    const [commandType, strValue] = command.split(' ');
    const value = Number(strValue);

    if (commandType === 'forward') {
      position += value;
      depth += aim * value;
    } else if (commandType === 'down') {
      aim += value;
    } else if (commandType === 'up') {
      aim -= value;
    }
  });

  return position * depth;
};
