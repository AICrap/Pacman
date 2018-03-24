export class SpriteSheeet {
    constructor(image, width, height){
        this.image = image;
        this.width = width;
        this.height = height;
        this.tiles = new Map();
    }

    define(name, x, y, width, height){
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const context = canvas.getContext('2d');

        context.drawImage(
            this.image, x, y, width, height, 0, 0, width, height
        );

        return canvas;
    }

    draw(name, context, x, y){
        context.draw(this.tiles.get(name), x, y);
    }
    
}
