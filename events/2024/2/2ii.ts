import {
  getMinMax,
  areMinMaxSafe,
  calculateDifferencesForAllReports,
} from "./2i";

const solver = (input: string): string | number => {
  const differencesForAllReports = calculateDifferencesForAllReports(input);

  return differencesForAllReports.filter((differences) => {
    const { min, max } = getMinMax(differences);

    if (areMinMaxSafe({ min, max })) {
      return true;
    }

    const withoutFirstLevel = differences.slice(1);
    if (areDifferencesSafe(withoutFirstLevel)) {
      return true;
    }

    const withoutLastLevel = differences.slice(0, -1);
    if (areDifferencesSafe(withoutLastLevel)) {
      return true;
    }

    const maxIndex = differences.indexOf(max);
    const withoutMax = mergeItemsAtIndex(differences, maxIndex);
    if (areDifferencesSafe(withoutMax)) {
      return true;
    }

    const minIndex = differences.indexOf(min);
    const withoutMin = mergeItemsAtIndex(differences, minIndex);
    return areDifferencesSafe(withoutMin);
  }).length;
};

const mergeItemsAtIndex = (differences: number[], maxIndex: number) => [
  ...differences.slice(0, maxIndex - 1),
  differences[maxIndex - 1] + differences[maxIndex],
  ...differences.slice(maxIndex + 1),
];

const areDifferencesSafe = (differences: number[]) =>
  areMinMaxSafe(getMinMax(differences));

export default solver;
