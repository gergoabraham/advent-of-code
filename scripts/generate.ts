import fs from "fs";
import promptSetup from "prompt-sync";
// @ts-ignore
import clipboard from "clipboardy";

const prompt = promptSetup();

const doStuff = async () => {
  console.log(`\n🎄🎄🎄 Advent of Code generator - 2022 🎄🎄🎄\n`);

  const defaultDay = new Date().getDate().toString();
  const day = prompt(`🗓  Which day is it for? (${defaultDay}) `, defaultDay);

  validateNumber(day, "Day");

  const fileNames = {
    input: `./src/${day}/${day}.input.ts`,
    task1: `./src/${day}/${day}i.ts`,
    test1: `./src/${day}/${day}i.test.ts`,
    task2: `./src/${day}/${day}ii.ts`,
    test2: `./src/${day}/${day}ii.test.ts`,
  };
  checkForExistingFiles(fileNames);

  console.log(
    "\n📋 Copy the following to the clipboard and then press [Enter]:"
  );
  prompt("👉 Example input...");
  const exampleInput = clipboard
    .readSync()
    .replace(/[`$\\]/g, (c) => "\\" + c)
    .trimEnd();

  prompt("👉 Example output...");
  const exampleOutputString = clipboard.readSync();
  const exampleOutput = validateNumber(exampleOutputString, "Example output");

  prompt("👉 Riddle input...");
  const input = clipboard
    .readSync()
    .replace(/[`$\\]/g, (c) => "\\" + c)
    .trimEnd();

  validateIntention(day, exampleInput, exampleOutput, input);

  const test1 = generateTestFileContent(day, "i", exampleInput, exampleOutput);
  const test2 = generateTestFileContent(day, "ii", exampleInput, 0);

  try {
    fs.mkdirSync(`./src/${day}`);
    fs.writeFileSync(fileNames.input, generateInputFileContent(input), {});
    fs.writeFileSync(fileNames.task1, CODE_FILE);
    fs.writeFileSync(fileNames.task2, CODE_FILE);
    fs.writeFileSync(fileNames.test1, test1);
    fs.writeFileSync(fileNames.test2, test2);
  } catch (e) {
    console.log("😿 Something went wrong...");
    console.log(e);
  }
};

const CODE_FILE = `const solver = (input: string): string | number => {
  return input;
};

export default solver;
`;

const generateTestFileContent = (
  day: string,
  task: string,
  exampleInput: string,
  exampleOutput: number
) =>
  `import solver from "./${day}${task}";

const input = \`${exampleInput}\`;

it("${day}${task}", () => {
  solver(input).should.equal(${exampleOutput});
});
`;

const generateInputFileContent = (input: string) => `const input = \`${input}\`;

export default input;
`;

const checkForExistingFiles = (fileNames: { [key in string]: string }) => {
  const existingFiles = [];

  for (const file in fileNames) {
    if (Object.hasOwnProperty.call(fileNames, file)) {
      const filename = fileNames[file];

      if (fs.existsSync(filename)) {
        existingFiles.push(filename);
      }
    }
  }

  if (existingFiles.length > 0) {
    console.log(
      existingFiles.length > 1
        ? "\n❗️ The following files already exist:"
        : "\n❗️ The following file already exists:"
    );
    existingFiles.forEach((filename) => console.log(`   - ${filename}`));
    console.log("");

    const answer = prompt("Enter [y] if you want to overwrite these files: ");
    if (answer === "y") {
      console.log("Continuing... 💚");
    } else {
      console.log("\nGoodbye then 👋\n");
      process.exit();
    }
  }
};

const validateIntention = (
  day: string,
  exampleInput: string,
  exampleOutput: number,
  input: string
) => {
  console.log("\nYou added the following inputs:");
  console.log(`   - Day:            ${day}`);
  console.log(`   - Example input:  ${getFirstLine(exampleInput)}`);
  console.log(`   - Example output: ${exampleOutput}`);
  console.log(`   - Riddle input:   ${getFirstLine(input)}`);
  console.log("");

  const answer = prompt("🎄 Ready to generate? [Enter]/Anything else: ");
  if (answer === "") {
    console.log("Generating... 💚\n");
  } else {
    console.log("\nGoodbye then 👋\n");
    process.exit();
  }
};

const getFirstLine = (s: string) =>
  s.includes("\n") ? s.substring(0, s.indexOf("\n")) + "..." : s;

function validateNumber(userInput: string, subject: string) {
  if (userInput === "" || isNaN(+userInput)) {
    console.log(`\n❌ ${subject} should be a number! ❌\n`);
    process.exit();
  }

  return Number(userInput);
}

doStuff();
