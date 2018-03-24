/*
	How to use:

	// [variables] = graph, nodeA, nodeB
	const closestPath = AStar.algorithm((a, b) => (a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y))

	console.log(closestPath(graph, nodeA, nodeB)); -> [a, node, ..., node, b]
*/
export class Astar {

    static algorithm(heuristic) {
        return (graph, start, end) => {
            const closedSet = [];
            const openSet = [];

            const fMap = new Map();
            const gMap = new Map();
            const hMap = new Map();

            let current = start;

            openSet.push(current);

            gMap.set(current, 0); //No moves
            hMap.set(current, heuristic(current, end));
            fMap.set(current, heuristic(current, end));


            // While there are still options left
            while (openSet.length > 0) {
                //// OPTIMIZE: Using a priority queue
                current = openSet.reduce((curr, best) => {
                    return (fMap.get(curr) < fMap.get(best)) ? curr : best;
                });

                // We've reached our end goal!
                if (heuristic(current, end) <= 0) {
                    return Astar.reconstructPath(current);
                } else {
                    // Best option moves from openSet to closedSet
                    const currentIndex = openSet.indexOf(current);
                    openSet.splice(currentIndex, 1);
                    closedSet.push(current);

                    // Next neighbors
                    graph.neighbors(current).forEach(neighbor => {
                        // Have we been here already
                        let newPath = false;
                        if (!closedSet.includes(neighbor)){
                            const tempG = gMap.get(current) + heuristic(current, neighbor)
                            // Better path?
                            if (openSet.includes(neighbor)) {
                                // Improvement on the path
                                if (tempG < gMap.get(neighbor)){
                                    gMap.set(neighbor, tempG);
                                    newPath = true;
                                }
                            } else {
                                // New node
                                gMap.set(neighbor, tempG);
                                newPath = true;
                                openSet.push(neighbor);
                            }
                        }
                        // A better path!
                        if (newPath){
                            hMap.set(neighbor, heuristic(neighbor, end));
                            fMap.set(neighbor, gMap.get(neighbor) + hMap.get(neighbor));
                            neighbor.previous = current;
                        }
                    });
                }
            }

            console.log("No PATH!")
            return undefined;
        }
    }

    /*
        Returns the path from the start to the node
    */
    static reconstructPath(node) {
        const path = [];
        let temp = node;
        path.push(temp);

        while (temp.previous){
            path.push(temp.previous);
            temp = temp.previous;
        }

        return path.reverse();
    }
}
