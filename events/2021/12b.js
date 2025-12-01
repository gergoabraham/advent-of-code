module.exports = (input = '') => {
  const graph = generateGraph(input);

  const allFullPaths = [];
  const onVisit = (currentPath, currentNode) => {
    if (currentNode.name === 'end') {
      allFullPaths.push([...currentPath]);
    }
  };
  const startNode = graph.getNode('start');

  graph.traverse(onVisit, startNode);

  return allFullPaths.length;
};

const generateGraph = (input) => {
  const graph = new Graph();

  input.split('\n').forEach((edge) => {
    const [a, b] = edge.split('-');
    graph.addEdgeWithNodes(a, b);
  });

  return graph;
};
class Graph {
  nodes = new Map();

  addEdgeWithNodes(a, b) {
    this.createNodeIfNeeded(a);
    this.createNodeIfNeeded(b);
    this.nodes.get(a).addNeighbour(this.nodes.get(b));
  }

  createNodeIfNeeded(name) {
    if (!this.nodes.has(name)) {
      this.nodes.set(name, new Node(name));
    }
  }

  getNode(name) {
    return this.nodes.get(name);
  }

  traverse(
    onVisit,
    node = new Node(),
    currentPath = [],
    twiceVisitedNode = ''
  ) {
    const isAlreadyVisited = currentPath.includes(node.name);
    if (isAlreadyVisited) {
      if (node.canBeVisitedOnce) {
        return;
      } else if (node.canBeVisitedTwice) {
        if (twiceVisitedNode) {
          return;
        } else {
          twiceVisitedNode = node.name;
        }
      }
    }

    currentPath.push(node.name);

    onVisit(currentPath, node);

    node.neighbours.forEach((neighbourNode) => {
      this.traverse(onVisit, neighbourNode, currentPath, twiceVisitedNode);
    });

    currentPath.pop();
  }
}

class Node {
  neighbours = new Set();

  constructor(name) {
    this.name = name;
    this.canBeVisitedOnce = ['start', 'end'].includes(name);
    this.canBeVisitedTwice =
      name.toUpperCase() !== name && !this.canBeVisitedOnce;
  }

  addNeighbour(node) {
    this.neighbours.add(node);
    node.neighbours.add(this);
  }
}
