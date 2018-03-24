export class SpriteSheeet {
    constructor(image, width, height){
        this.image = image;
        this.width = width;
        this.height = height;
        this.tiles = new Map();
    }

    define(name, x, y, width, height){
        //What to do?
    }

    draw(name, context, x, y){
        context.draw(this.tiles.get(name));
    }

    drawTile(name, context, x, y){
        this.draw(name, context, x * this.width, y * this.height);
    }
}
