import {
  addition,
  multiplication,
  Operator,
  sumTestValuesForSuccessfullyFilledEquations,
} from "./7i";

const solver = (input: string): string | number =>
  sumTestValuesForSuccessfullyFilledEquations({
    input,
    operators: [addition, multiplication, concatenation],
  });

const concatenation: Operator = (a, b) => +`${a}${b}`;

export default solver;
