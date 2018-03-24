
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
