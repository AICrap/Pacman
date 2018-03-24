import {Node} from './node.js';

export class Point extends Node {
    constructor(x, y){
        super();
        this.x = x;
        this.y = y;
    }

    draw(context){
        context.beginPath();
        context.arc(this.x, this.y, 2, 0, 2 * Math.PI);
        context.stroke();
    }

}
