module.exports = (input = []) => {
  return input.reduce(
    (count, current, i, input) => (current > input[i - 1] ? count + 1 : count),
    0
  );
};
