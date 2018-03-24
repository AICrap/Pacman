export class Point {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    draw(context){
        context.beginPath();
        context.arc(this.x, this.y, 2, 0, 2 * Math.PI);
        context.stroke();
    }

}
