/*
	Undirected unweighted graph class
*/
export class Graph {
    constructor(nodes, edges) {
        this.nodes = nodes || new Set();
        this.edges = edges || new Map();
    }

    addNode(node) {
        this.nodes.add(node);
        this.edges.set(node, new Set());
    }

    removeNode(node) {
        this.nodes.delete(node);
        this.edges.delete(node);

        this.nodes.forEach(o => {
            this.removeNeighbor(o, node);
        })
    }

    removeNeighbor(a, b){
        this.neighbors(a).delete(b);
    }

    connect(a, b) {
        this.setEdge(a, b);
        this.setEdge(b, a);
    }

    areConnected(a, b){
        return this.neighbors(a).has(b);
    }

    hasNode(node) {
        return this.nodes.has(node);
    }

    neighbors(node) {
        return this.edges.get(node);
    }

    setEdge(a, b) {
        this.neighbors(a).add(b);
    }
}
