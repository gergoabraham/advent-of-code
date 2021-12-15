module.exports = (input = '', silent = false) => {
  const unvisitedSet = new Set();

  const arrayOfNodes = input.split('\n').map((line, y) =>
    line.split('').map((num, x) => {
      const node = {
        weight: Number(num),
        distance: Infinity,
        x,
        y,
      };
      unvisitedSet.add(node);

      return node;
    })
  );

  unvisitedSet.forEach((node) => {
    node.neighbours = [
      arrayOfNodes[node.y - 1]?.[node.x],
      arrayOfNodes[node.y + 1]?.[node.x],
      arrayOfNodes[node.y]?.[node.x - 1],
      arrayOfNodes[node.y]?.[node.x + 1],
    ].filter((x) => x);
  });

  const targetNode =
    arrayOfNodes[arrayOfNodes.length - 1][arrayOfNodes[0].length - 1];

  // initial condition
  arrayOfNodes[0][0].distance = 0;

  const total = unvisitedSet.size;
  initProgressBar();

  while (unvisitedSet.has(targetNode)) {
    // find minimum distance
    let currentNode = { distance: Infinity };
    unvisitedSet.forEach((node) => {
      if (node.distance < currentNode.distance) {
        currentNode = node;
      }
    });

    // consider neighbours
    const unvisitedNeighbours = currentNode.neighbours.filter((node) =>
      unvisitedSet.has(node)
    );

    unvisitedNeighbours.forEach((node) => {
      node.distance = Math.min(
        node.distance,
        currentNode.distance + node.weight
      );
    });

    unvisitedSet.delete(currentNode);

    !silent && displayProgressBar(total - unvisitedSet.size, total);
  }

  return targetNode.distance;
};

let lastProgress = 0;
const initProgressBar = () => {
  lastProgress = 0;
};

const displayProgressBar = (current, total) => {
  const progressBarSize = 30;
  const progress = (current / total) * progressBarSize;
  if (Math.ceil(progress) > lastProgress) {
    lastProgress = Math.ceil(progress);
    console.log('[' + ''.padStart(progress, '#').padEnd(progressBarSize) + ']');
  }
};
