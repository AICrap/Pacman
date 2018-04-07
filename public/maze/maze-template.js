import {MazeTiles} from './maze-tiles.js'
import {pos} from './../utils.js'

export default class MazeTemplate {
	constructor(width, height) {
		this.width = 5 + 2 * width
		this.height = 7 + 4 * height
		this.grid = new Array(this.width * this.height)
		this.candidates = []

		const halfWidth = width + 2
		const halfHeight = 2 * height + 3

		// Walls

		for (let i = 0; i < this.width; i++) {
			this.set(0, i, MazeTiles.WALL)
			this.set(this.height - 1, i, MazeTiles.WALL)
		}

		for (let i = 2; i + 2 < this.height; i += 2) {
			this.set(i, this.width - 1, MazeTiles.WALL)
		}

		// Ghost cage

		for (let i = 0; i < 3; i++) {
			this.set(halfHeight - 1, i, MazeTiles.BLOCK)
			this.set(halfHeight + 1, i, MazeTiles.BLOCK)
		}

		this.set(halfHeight, 2, MazeTiles.BLOCK)

		// Candidates

		for (let i = 0; i < height + height; i++) {
			for (let j = i % 2; j < this.width; j += 2) {
				this.set(i + 1, j, MazeTiles.CAND)
				this.candidates.push(pos(i + 1, j))
			}
		}

		for (let i = 0; i < 5; i++) {
			for (let j = 4 + i % 2; j < this.width; j += 2) {
				this.set(i + halfHeight - 2, j, MazeTiles.CAND)
				this.candidates.push(pos(i + halfHeight - 2, j))
			}
		}

		for (let i = 0; i < height + height; i++) {
			for (let j = 1 - i % 2; j < this.width; j += 2) {
				this.set(i + height + height + 6, j, MazeTiles.CAND)
				this.candidates.push(pos(i + height + height + 6, j))
			}
		}

		// Blocks

		for (let i = 0; i < height + height; i += 2) {
			for (let j = 0; j + 1 < this.width; j += 2) {
				this.set(i + 2, j, MazeTiles.BLOCK)
			}
		}

		for (let i = 0; i < 3; i += 2) {
			for (let j = 5; j < this.width; j += 2) {
				this.set(i + halfHeight - 1, j - 1, MazeTiles.BLOCK)
			}
		}

		for (let i = 0; i < height + height; i += 2) {
			for (let j = 0; j + 1 < this.width; j += 2) {
				this.set(i + height + height + 6, j, MazeTiles.BLOCK)
			}
		}

		// Roads

		for (let i = 1; i < halfHeight - 2; i += 2) {
			for (let j = 1; j < this.width; j += 2) {
				this.set(i, j, MazeTiles.ROAD)
			}
		}

		for (let i = halfHeight - 2; i < halfHeight + 3; i += 2) {
			for (let j = 5; j < this.width; j += 2) {
				this.set(i, j, MazeTiles.ROAD)
			}
		}

		for (let i = 1; i < halfHeight - 2; i += 2) {
			for (let j = 1; j < this.width; j += 2) {
				this.set(i + height + height + 6, j, MazeTiles.ROAD)
			}
		}

		for (let i = 0; i < 4; i++) {
			this.set(halfHeight - 2, i, MazeTiles.ROAD)
			this.set(halfHeight + 2, i, MazeTiles.ROAD)
		}

		this.set(halfHeight, 0, MazeTiles.ROAD)
		this.set(halfHeight, 1, MazeTiles.ROAD)

		this.set(halfHeight - 1, 3, MazeTiles.ROAD)
		this.set(halfHeight, 3, MazeTiles.ROAD)
		this.set(halfHeight + 1, 3, MazeTiles.ROAD)
	}

	set(i, j, value) {
		this.grid[i * this.width + j] = value
	}

	get(i, j) {
		return this.grid[i * this.width + j]
	}

	toString() {
		let str = ''

		for (let i = 0; i < this.grid.length; i++) {
			str += this.grid[i]

			if (i % this.width === this.width - 1) {
				str += '\n'
			}
		}

		return str
	}
}
