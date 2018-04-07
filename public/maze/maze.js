import MazeTemplate from './maze-template.js'
import MazeModel from './maze-model.js'
import {array2d, printArray2d} from '../utils.js'
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

// Important formulas:
/*
	X(x) = x + x % 2 + x / 2 =~ (3x / 2)
	x(X) = X - (X + 2) / 3 =~ (2X / 3)
*/

let Tiles = {
    WALL: 'X',
    BLOCK: 'O',
    PATH: '-',
	NODE: '+',
	CAND: '?'
}

function scaleUp(x) {
	return x + x % 2 + parseInt(x / 2)
}

function scaleDown(x) {
	return x - parseInt((x + 2) / 3)
}

export default class Maze {
    constructor(model) {
		const width = 2 * model.width - 1
		const height = model.height
		const scaledGrid = array2d(width, height)

		this.width = scaleUp(width)
		this.height = scaleUp(height)
		this.grid = new Array(this.width * this.height)

		for (let i = 0; i < height; i++) {
			for (let j = 0; j < width; j++) {
				scaledGrid[i][j] = model.get(i, Math.abs(j - model.width + 1))
			}
		}

		for (let i = 0; i < this.height; i++) {
			for (let j = 0; j < this.width; j++) {
				this.set(i, j, scaledGrid[scaleDown(i)][scaleDown(j)])
			}
		}

		printArray2d(scaledGrid, '')
		console.log('\n\n\n' + this.toString())
    }

	toString() {
		let str = ''

		for (let i = 0; i < this.grid.length; i++) {
			str += this.grid[i] + ' '

			if (i % this.width === this.width - 1) {
				str += '\n'
			}
		}

		return str
	}

	get(i, j) {
		return this.grid[i * this.width + j]
	}

	set(i, j, value) {
		this.grid[i * this.width + j] = value
	}

	static generate(w, h, numTunnels, maxBlockSize) {
		return new Maze(new MazeModel(w, h, numTunnels, maxBlockSize))
	}
}
