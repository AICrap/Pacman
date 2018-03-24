
/*

TEMPLATE (2 x 1)

XXXXXXXXX
?-?-?-?-?
O?O?O?O?X
----?-?-?
OOO-O?O?X
--O-?-?-?
OOO-O?O?X
----?-?-?
O?O?O?O?X
?-?-?-?-?
XXXXXXXXX

	|
	V

MODEL (2 x 1)

XXXXXXXXX
---+----X
OOO-OOO-X
---+O--+-
OOO-O-OOX
--O--+--X
OOO-OOO-X
---+--O-X
OOO-O-O-X
----O---X
XXXXXXXXX

	|
	V

MAZE (2 x 1)

XXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXX
XX------+--------+------XX
XX-OOOOO-OOOOOOOO-OOOOO-XX
XX-OOOOO-OOOOOOOO-OOOOO-XX
--+---OO+--------+OO---+--
XXOOO-OO-OOOOOOOO-OO-OOOXX
XXOOO-OO-OOOOOOOO-OO-OOOXX
XX---+--+OO----OO+------XX
XX-OOOOO-OOOOOOOO-OOOOO-XX
XX-OOOOO-OOOOOOOO-OOOOO-XX
XX-OO---+--------+---OO-XX
XX-OO-OO-OOOOOOOO-OO-OO-XX
XX-OO-OO-OOOOOOOO-OO-OO-XX
XX----OO----------OO----XX
XXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXXXXXX

*/

let Tiles = {
    WALL: 'X',
    BLOCK: 'O',
    PATH: '-',
	NODE: '+',
	CAND: '?'
}

function array2d(w, h) {
	const a = new Array(h)

	for (let i = 0; i < a.length; i++) {
		a[i] = new Array(w).fill('*')
	}

	return a
}

function printArray2d(a) {
	a.forEach(da => {
		let msg = ''

		da.forEach(dda => {
			msg += dda + ' '
		})

		console.log(msg + '     ' + Math.random())
	})
}

export default class Maze {
    constructor(template) {
        // Create a maze based on the minimized template
    }

	static createTemplate(w, h) {
		const width = 5 + 2 * w
		const height = 7 + 4 * h
		const halfWidth = w + 2
		const halfHeight = 2 * h + 3

		const template = array2d(width, height)

		// Walls

		for (let i = 0; i < width; i++) {
			template[0][i] = Tiles.WALL
			template[height - 1][i] = Tiles.WALL
		}

		for (let i = 2; i < height; i += 2) {
			template[i][width - 1] = Tiles.WALL
		}

		// Cage

		for (let i = 0; i < 3; i++) {
			template[halfHeight - 1][i] = Tiles.BLOCK
			template[halfHeight + 1][i] = Tiles.BLOCK
		}

		template[halfHeight][2] = Tiles.BLOCK

		// Question marks

		for (let i = 0; i < h + h; i++) {
			for (let j = i % 2; j < width; j += 2) {
				template[i + 1][j] = Tiles.CAND
			}
		}

		for (let i = 0; i < 5; i++) {
			for (let j = 4 + i % 2; j < width; j += 2) {
				template[i + halfHeight - 2][j] = Tiles.CAND
			}
		}

		for (let i = 0; i < h + h; i++) {
			for (let j = 1 - i % 2; j < width; j += 2) {
				template[i + h + h + 6][j] = Tiles.CAND
			}
		}

		// Blocks

		for (let i = 0; i < h + h; i += 2) {
			for (let j = 0; j + 1 < width; j += 2) {
				template[i + 2][j] = Tiles.BLOCK
			}
		}

		for (let i = 0; i < 3; i += 2) {
			for (let j = 5; j < width; j += 2) {
				template[i + halfHeight - 1][j - 1] = Tiles.BLOCK
			}
		}

		for (let i = 0; i < h + h; i += 2) {
			for (let j = 0; j + 1 < width; j += 2) {
				template[i + h + h + 6][j] = Tiles.BLOCK
			}
		}

		// Path

		for (let i = 1; i < halfHeight - 2; i += 2) {
			for (let j = 1; j < width; j += 2) {
				template[i][j] = Tiles.PATH
			}
		}

		for (let i = halfHeight - 2; i < halfHeight + 3; i += 2) {
			for (let j = 5; j < width; j += 2) {
				template[i][j] = Tiles.PATH
			}
		}

		for (let i = 1; i < halfHeight - 2; i += 2) {
			for (let j = 1; j < width; j += 2) {
				template[i + h + h + 6][j] = Tiles.PATH
			}
		}

		for (let i = 0; i < 4; i++) {
			template[halfHeight - 2][i] = Tiles.PATH
			template[halfHeight + 2][i] = Tiles.PATH
		}

		template[halfHeight][0] = Tiles.PATH
		template[halfHeight][1] = Tiles.PATH

		template[halfHeight - 1][3] = Tiles.PATH
		template[halfHeight][3] = Tiles.PATH
		template[halfHeight + 1][3] = Tiles.PATH

		printArray2d(template)

		return template
	}

    static generateModel(w, h, numTunnels, maxBlockSize) {
        if (numTunnels > 2 * h + 3) {
            throw 'Tries to generate a maze with too many tunnels.'
        }

		const model = createTemplate(w, h)

		return model
    }
}
