const solver = (input: string): string | number =>
  input
    .match(/mul\(\d{1,3},\d{1,3}\)/g)!
    .map((line) => line.match(/\d{1,3}/g)!)
    .map(([a, b]) => +a * +b)
    .reduce((sum, num) => sum + num);

export default solver;
