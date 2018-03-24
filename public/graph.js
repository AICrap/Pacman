/*
	unweighted graph class
*/
export class Graph {
    /**
        @param {Set}   nodes    Set of all nodes
        @param {Map}   edges    Map of nodes and their connected neighbors
    **/
    constructor(nodes, edges) {
        this.nodes = nodes || new Set();
        this.edges = edges || new Map();
    }

    /**
    Adds a new node to the graph.

    @param {Node}   node    some node.
    **/
    addNode(node) {
        this.nodes.add(node);
        this.edges.set(node, new Set());
    }

    /**
    Removes a node from the graph.

    @param {Node}   node    some node.
    **/
    removeNode(node) {
        this.nodes.delete(node);
        this.edges.delete(node);

        this.nodes.forEach(o => {
            this.removeNeighbor(o, node);
        })
    }

    /**
    Removes a neighbor of a node

    @param {Node}   a    some node.
    @param {Node}   b    some neighbor we remove.
    **/
    removeNeighbor(a, b){
        this.neighbors(a).delete(b);
    }

    /**
    Doubly connects a and b

    @param {Node}   a    some node.
    @param {Node}   b    some node.
    **/
    connect(a, b) {
        this.addNeighbor(a, b);
        this.addNeighbor(b, a);
    }

    /**
    Determines if two nodes are neighbors

    @param {Node}   a    some node.
    @param {Node}   b    some node.

    @return {Boolean}   a is a neighbor of b or b is a neighbor of a
    **/
    areConnected(a, b){
        return this.neighbors(a).has(b) || this.neighbors(b).has(a);
    }

    /**
    Determines if graph has some node

    Checks if nodes set has node.

    @param {Node}   node    some node.

    @return {Boolean}   node is in graph
    **/
    hasNode(node) {
        return this.nodes.has(node);
    }

    /**
    Returns a node's neighbors

    @param {Node}   node    some node.

    @return {Set}   node's neighbors
    **/
    neighbors(node) {
        return this.edges.get(node);
    }

    /**
    Singly links two nodes

    @param {Node}   a    some node.
    @param {Node}   b    some node.
    **/
    addNeighbor(a, b) {
        this.neighbors(a).add(b);
    }
}
