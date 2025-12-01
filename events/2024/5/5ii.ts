import { getOriginalAndSortedPages } from "./5i";

const solver = (input: string): string | number => {
  const { pagesToProduce, sortedPagesToProduce } =
    getOriginalAndSortedPages(input);

  return sortedPagesToProduce
    .filter((pages, i) => pages.toString() !== pagesToProduce[i].toString())
    .map((pages) => pages[Math.floor(pages.length / 2)])
    .reduce<number>((sum, num) => sum + +num, 0);
};

export default solver;
