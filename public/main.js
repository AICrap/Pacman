import {Astar} from './astar.js';
import {Graph} from './graph.js';
import {Point} from './point.js'

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const width = canvas.width
const height = canvas.height



//---TESTING!!!!!----
const graph = new Graph();
const offsetX = 50;
const offSetY = 50;
const tileSize = 10;
const gridSize = 40;
const maze = new Array(gridSize).fill().map(x => new Array(gridSize));

for (let i = 0; i < gridSize; i++){
    for (let j = 0; j < gridSize; j++){
        const point = new Point(offsetX + tileSize * i, offSetY + tileSize * j);
        graph.addNode(point);
        point.draw(ctx);

        maze[i][j] = point;
    }
}

const directions = [[-1, 0], [1, 0], [0, -1], [0, 1],
                    [-1, 1], [1, -1], [1, 1], [-1, -1]];

for (let i = 0; i < gridSize; i++){
    for (let j = 0; j < gridSize; j++){
        const point = maze[i][j];

        for (let [dx, dy] of directions){
            if (i + dx >= 0 && i + dx < gridSize){
                if (j + dy >= 0 && j + dy < gridSize){
                    graph.connect(point, maze[i + dx][j + dy]);
                }
            }
        }
    }
}

//Obstacles!
for (let i = 0; i < 300; i++){
    const x = Math.floor(Math.random() * gridSize);
    const y = Math.floor(Math.random() * gridSize);

    const point = maze[x][y];
    graph.removeNode(point);

    ctx.beginPath();
    ctx.rect(offsetX + x * tileSize - tileSize / 2,
            offsetX + y * tileSize - tileSize / 2, tileSize, tileSize);
    ctx.fill();
    ctx.stroke();
}

const start = maze[0][0];
const end = maze[gridSize - 1][gridSize - 1];

const euclideanDistance = (a, b) => Math.sqrt((a.x-b.x)*(a.x-b.x) + (a.y-b.y)*(a.y-b.y));
const taxicabDistance = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
const maxDistance = (a, b) => Math.max(Math.abs(a.x - b.x), Math.abs(a.y - b.y));
const binaryDistance = (a, b) => (a.x === b.x && a.y === b.y) ? 0 : 1;

const algEuclid = Astar.algorithm(euclideanDistance);
const algTaxicab = Astar.algorithm(taxicabDistance);
const algMax = Astar.algorithm(maxDistance);
const algBinary = Astar.algorithm(binaryDistance);

console.time('Time for euclidean');
const bestPathEuclid = algEuclid(graph, start, end);
console.timeEnd('Time for euclidean')

console.time('Time for taxi cab');
const bestPathTaxicab = algTaxicab(graph, start, end);
console.timeEnd('Time for taxi cab')

console.time('Time for max')
const bestPathMax = algMax(graph, start, end);
console.timeEnd('Time for max')

console.time('Time for binary')
const bestPathBinary = algBinary(graph, start, end);
console.timeEnd('Time for binary')

console.log(bestPathEuclid);
console.log(bestPathTaxicab);
console.log(bestPathMax);
console.log(bestPathBinary);

ctx.strokeStyle = "red";
drawPath(bestPathEuclid);

ctx.strokeStyle = "blue";
drawPath(bestPathTaxicab);

ctx.strokeStyle = "yellow";
drawPath(bestPathMax);

ctx.strokeStyle = "green";
drawPath(bestPathBinary);

//Drawing!!!
function drawPath(path){
    for (let i = 0; i < path.length - 1; i++){
        line(path[i].x, path[i].y, path[i+1].x, path[i+1].y);
    }
}

function line(x1, y1, x2, y2){
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}
