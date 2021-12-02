module.exports = (input = []) => {
  let depth = 0;
  let position = 0;

  input.forEach((command) => {
    const [commandType, strValue] = command.split(' ');
    const value = Number(strValue);

    if (commandType === 'forward') {
      position += value;
    } else if (commandType === 'down') {
      depth += value;
    } else if (commandType === 'up') {
      depth -= value;
    }
  });

  return position * depth;
};
