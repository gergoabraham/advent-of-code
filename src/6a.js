const GENERATIONS = 80;

module.exports = (input = [''], generations = GENERATIONS) => {
  const fishes = new Array(9).fill(0);

  input.split(',').forEach((day) => fishes[day]++);

  for (let i = 0; i < generations; i++) {
    const birthingFishes = fishes.shift();

    fishes.push(birthingFishes);
    fishes[6] += birthingFishes;
  }

  return fishes.reduce((sum, num) => sum + num);
};
