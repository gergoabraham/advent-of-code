const solver = (input: string): string | number => {
  const { pagesToProduce, sortedPagesToProduce } =
    getOriginalAndSortedPages(input);

  return pagesToProduce
    .filter(
      (pages, i) => pages.toString() === sortedPagesToProduce[i].toString()
    )
    .map((pages) => pages[Math.floor(pages.length / 2)])
    .reduce<number>((sum, num) => sum + +num, 0);
};

export const getOriginalAndSortedPages = (input: string) => {
  const [orderingRulesArray, pagesToProduce] = input
    .split("\n\n")
    .map((segment) => segment.split("\n").map((line) => line.split(/[|,]/)));

  const orderingRules = new Map<string, Set<string>>();
  orderingRulesArray.forEach(([x, y]) => {
    const ySet = orderingRules.get(x) ?? new Set();
    orderingRules.set(x, ySet);
    ySet.add(y);
  });

  const sortedPagesToProduce = pagesToProduce.map((pages) => {
    const sortedPages = [...pages];
    sortedPages.sort((a, b) => (orderingRules.get(a)?.has(b) ? -1 : 1));
    return sortedPages;
  });

  return { pagesToProduce, sortedPagesToProduce };
};

export default solver;
