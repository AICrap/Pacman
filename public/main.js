import {Astar} from './astar.js';
import {Graph} from './graph.js';
import {Point} from './point.js'

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const width = canvas.width
const height = canvas.height



//---TESTING!!!!!----
const graph = new Graph();
const maze = new Array(10).fill().map(x => new Array(10));

for (let i = 0; i < 10; i++){
    for (let j = 0; j < 10; j++){
        const point = new Point(50 + 50 * i, 50 + 50 * j);
        graph.addNode(point);
        point.draw(ctx);

        maze[i][j] = point;
    }
}

for (let i = 0; i < 10; i++){
    for (let j = 0; j < 10; j++){
        const point = maze[i][j];

        for (let dx = -1; dx <= 1; dx++){
            for (let dy = -1; dy <= 1; dy++){
                if (dx == 0 || dy == 0 && !(dx == 0 && dy == 0)){
                    if (i + dx >= 0 && i + dx < 10){
                        if (j + dy >= 0 && j + dy < 10){
                            graph.connect(point, maze[i + dx][j + dy]);
                        }
                    }
                }
            }
        }
    }
}

//Obstacles!
for (let i = 0; i < 9; i++){
    for (let j = 3; j < 6; j++){
        const point = maze[i][j];
        graph.removeNode(point);
    }
}

ctx.beginPath();
ctx.rect(50, 200, 400, 100);
ctx.fill();
ctx.stroke();

for (let i = 7; i < 10; i++){
    for (let j = 7; j < 9; j++){
        const point = maze[i][j];
        graph.removeNode(point);
    }
}

ctx.beginPath();
ctx.rect(400, 400, 100, 50);
ctx.fill();
ctx.stroke();

for (let i = 8; i < 10; i++){
    for (let j = 0; j < 2; j++){
        const point = maze[i][j];
        graph.removeNode(point);
    }
}

ctx.beginPath();
ctx.rect(450, 50, 50, 50);
ctx.fill();
ctx.stroke();

const start = maze[0][0];
const end = maze[9][9];

const euclideanDistance = (a, b) => (a.x-b.x)*(a.x-b.x) + (a.y-b.y)*(a.y-b.y);
const taxicabDistance = (a, b) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
const discreteDistance = (a, b) => Math.max(Math.abs(a.x - b.x), Math.abs(a.y - b.y));
const binaryDistance = (a, b) => (a.x === b.x && a.y === b.y) ? 0 : 1;

const algEuclid = Astar.algorithm(euclideanDistance);
const algTaxicab = Astar.algorithm(taxicabDistance);
const algDiscrete = Astar.algorithm(discreteDistance);
const algBinary = Astar.algorithm(binaryDistance);

const bestPathEuclid = algEuclid(graph, start, end);
const bestPathTaxicab = algTaxicab(graph, start, end);
const bestPathDiscrete = algDiscrete(graph, start, end);
const bestPathBinary = algDiscrete(graph, start, end);

console.log(bestPathEuclid);
console.log(bestPathTaxicab);
console.log(bestPathDiscrete);
console.log(bestPathBinary);

ctx.strokeStyle = "red";
drawPath(bestPathEuclid);

ctx.strokeStyle = "blue";
drawPath(bestPathTaxicab);

ctx.strokeStyle = "yellow";
drawPath(bestPathDiscrete);

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
