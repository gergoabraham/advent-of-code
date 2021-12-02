const run = (fileName) => {
  let solver, input;

  try {
    solver = require(`./${fileName}.js`);

    const inputFileNumber = fileName - 1 + (fileName % 2);
    input = require(`./${inputFileNumber}.input.js`);
  } catch (e) {
    console.error(e);
    return;
  }

  console.log(solver(input));
};

const puzzleNumber = Number(process.argv[2]);

if (!puzzleNumber || puzzleNumber < 1 || puzzleNumber > 50) {
  console.error('\n❤ Please give the number of the puzzle:\n`yarn start [number]`\n');
} else {
  run(puzzleNumber);
}
