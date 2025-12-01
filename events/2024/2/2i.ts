const solver = (input: string): string | number => {
  const differencesForAllReports = calculateDifferencesForAllReports(input);

  return differencesForAllReports
    .map((differences) => getMinMax(differences))
    .filter(({ min, max }) => areMinMaxSafe({ min, max })).length;
};

export default solver;

export const calculateDifferencesForAllReports = (input: string) => {
  const reports = input
    .split("\n")
    .map((line) => line.split(" ").map((x) => +x));

  const differencesForAllReports = reports.map((report) =>
    report.slice(1).map((num, i) => num - report[i])
  );

  return differencesForAllReports;
};

export const getMinMax = (differences: number[]) =>
  differences.reduce<{ min: number; max: number }>(
    (minMax, diff) => ({
      min: Math.min(minMax.min, diff),
      max: Math.max(minMax.max, diff),
    }),
    { min: Infinity, max: -Infinity }
  );

export const areMinMaxSafe = ({ min, max }: { min: number; max: number }) =>
  max <= 3 && min >= -3 && max * min > 0;
