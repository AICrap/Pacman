const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const width = canvas.width
const height = canvas.height

/*

2 X 1 MODEL

XXXXXXXXXXXXXXXXX
X---------------X
X-OOO-OOOOO-OOO-X
----O-------O----
XOO-O-OOOOO-O-OOX
X-----O---O-----X
X-OOO-OOOOO-OOO-X
X-O-----------O-X
X-O-O-OOOOO-O-O-X
X---O-------O---X
XXXXXXXXXXXXXXXXX

2 X 1 MAZE

XXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXX
XX----------------------XX
XX-OOOOO-OOOOOOOO-OOOOO-XX
XX-OOOOO-OOOOOOOO-OOOOO-XX
------OO----------OO------
XXOOO-OO-OOOOOOOO-OO-OOOXX
XXOOO-OO-OOOOOOOO-OO-OOOXX
XX-------OO----OO-------XX
XX-OOOOO-OOOOOOOO-OOOOO-XX
XX-OOOOO-OOOOOOOO-OOOOO-XX
XX-OO----------------OO-XX
XX-OO-OO-OOOOOOOO-OO-OO-XX
XX-OO-OO-OOOOOOOO-OO-OO-XX
XX----OO----------OO----XX
XXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXX

*/

let MazeTiles = {
	WALL: 'X',
	BLOCK: 'O',
	PATH: '-'
}

class Maze {
	constructor(model) {
		// Create a maze based on the minimized model
	}

	static generateModel(width, height, numTunnels, maxBlockSize) {
		if (numTunnels > 2 * height + 3) {
			throw 'Tries to generate a maze with too many tunnels.'
		}

		let model = array2d(9 + 4 * width, 7 + 4 * height)

		// Continue building the model
	}

	print() {

	}
}

class Node {
	constructor(){
	}
}

/*
	Undirected unweighted graph class
*/
class Graph {
	constructor(nodes, edges){
		this.nodes = nodes || new Set();
		this.edges = edges || new Map();
	}

	addNode(node){
		this.nodes.push(node);
		this.edges.set(node, new Set());
	}

	removeNode(node){
		this.nodes.delete(node);
		this.edges.delete(node);
	}

	connectNodes(a, b){
		this.setEdge(a, b);
		this.setEdge(b, a);
	}

	hasNode(node){
		return this.nodes.has(node);
	}

	connectedNodes(node){
		return this.edges.get(node);
	}

	setEdge(a, b){
		this.getEdges(a).add(b);
	}
}

/*
	How to use:
	
	// [variables] = graph, nodeA, nodeB
	const closestPath = AStarAlg.algorithm(graph, (a, b) => (a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y))
	
	console.log(closestPath(nodeA, nodeB)); -> [a, node, ..., node, b]
*/
class AStarAlg {

	static algorithm(graph, heuristic){
		return (a, b) => {
			const closedSet = new Set();
			const openSet = new Set();
			const priorityQueue = new PriorityQueue();

			let current = a;

			while (!openSet.isEmpty()){
				current = priorityQueue.deque();

				if (current === b){
					AStarAlg.reconstructPath();
				}

				else {
					graph.connectedNodes(current).forEach(node => {
						if (closedSet.has(node)){
							return;
						}

						if (!openSet.has(node)){
							openSet.add(node);
						}
					});
				}
			}
		}
	}

	static reconstructPath(){

	}
}