const run = (puzzleName) => {
  const fileName = `${puzzleName}.js`;
  const inputFileName = `${puzzleName.replace(/[ab]/, '')}.input.js`;

  let solver, input;

  try {
    solver = require('./' + fileName);
  } catch (e) {
    console.error(`\n⚠ ${fileName} not found!\n`);
    return;
  }

  try {
    input = require('./' + inputFileName);
  } catch (e) {
    console.error(`\n⚠ ${inputFileName} not found!\n`);
    return;
  }

  console.log(
    `
Result:
   ${solver(input)}
`
  );
};

const puzzleName = process.argv[2];
const validPuzzleNames = new Array(50)
  .fill(null)
  .map((_, i) => `${Math.floor(i / 2) + 1}${i % 2 ? 'b' : 'a'}`);

if (!validPuzzleNames.includes(puzzleName)) {
  console.error(
    `
❤ Please give the name of the puzzle:
   e.g. 'yarn start 2a' or 'yarn start 5b'
`
  );
} else {
  run(puzzleName);
}
