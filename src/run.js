const run = (fileName) => {
  let run;

  try {
    run = require(`./${fileName}.js`).run;
  } catch (e) {
    console.error(`\n⚠ Couldn't find the file '${fileName}'!\n`);
    return;
  }

  run();
};

const puzzleNumber = Number(process.argv[2]);

if (!puzzleNumber || puzzleNumber < 1 || puzzleNumber > 50) {
  console.error('\n❤ Please give the number of the puzzle:\n`yarn start [number]`\n');
} else {
  run(puzzleNumber);
}
