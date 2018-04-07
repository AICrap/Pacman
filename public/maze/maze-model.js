import MazeTemplate from './maze-template.js'
import {distance1, distance2, pos} from '../utils.js'
import {MazeTiles, isBlocked} from './maze-tiles.js'

function inArea(pos, area) {
	return pos.row >= area.minRow
		&& pos.col >= area.minCol
		&& pos.row < area.maxRow
		&& pos.col < area.maxCol
}

export default class MazeModel extends MazeTemplate {
	constructor(width, height, maxTunnels, maxBlockSize) {
		super(width, height)

		console.log(this.toString() + '\n\n\n')

		// if (maxTunnels > 2 * height + 3) {
        //     throw 'Tries to generate a maze with too many tunnels.'
        // }

		maxTunnels = Math.min(maxTunnels, 2 * height + 3)

		const numTunnels = parseInt(Math.random() * (maxTunnels + 1))

		this.configTunnels(numTunnels)
		// this.configBridges(numBridges)

		console.log(this.toString() + '\n\n\n')

		while (this.candidates.length !== 0) {
			const index = parseInt(Math.random() * this.candidates.length)
			const candidate = this.candidates[index]

			const row = candidate.row
			const col = candidate.col

			this.set(row, col, MazeTiles.BLOCK)
			this.candidates.splice(index, 1)

			if (blockSize(this, row, col) > maxBlockSize) {
				this.set(row, col ,MazeTiles.ROAD)
			}
			else if (row % 2 == 0) {
				if (!isConnected(this, pos(row - 1, col), pos(row + 1, col))) {
					this.set(row, col ,MazeTiles.ROAD)
				}
				else {
					const up = pos(row - 1, col)
					const down = pos(row + 1, col)

					let blocks = 0

					if (isBlocked(this.get(up.row, up.col - 1))) {
						blocks++
					}

					if (isBlocked(this.get(up.row - 1, up.col))) {
						blocks++
					}

					if (blocks >= 2) {
						this.set(row, col, MazeTiles.ROAD)
						continue
					}

					if (isBlocked(this.get(up.row, up.col + 1))) {
						blocks++
					}

					if (blocks >= 2) {
						this.set(row, col, MazeTiles.ROAD)
						continue
					}

					blocks = 0

					if (isBlocked(this.get(down.row, down.col - 1))) {
						blocks++
					}

					if (isBlocked(this.get(down.row + 1, down.col))) {
						blocks++
					}

					if (blocks >= 2) {
						this.set(row, col, MazeTiles.ROAD)
						continue
					}

					if (isBlocked(this.get(down.row, down.col + 1))) {
						blocks++
					}

					if (blocks >= 2) {
						this.set(row, col, MazeTiles.ROAD)
						continue
					}
				}
			}
			else if (col === 0) {
				const right = pos(row, col + 1)

				let blocks = 0

				if (isBlocked(this.get(right.row - 1, right.col))) {
					blocks++
				}

				if (isBlocked(this.get(right.row, right.col + 1))) {
					blocks++
				}

				if (blocks >= 2) {
					this.set(row, col, MazeTiles.ROAD)
					continue
				}

				if (isBlocked(this.get(right.row + 1, right.col))) {
					blocks++
				}

				if (blocks >= 2) {
					this.set(row, col, MazeTiles.ROAD)
					continue
				}
			}
			else {
				if (!isConnected(this, pos(row, col - 1), pos(row, col + 1))) {
					this.set(row, col, MazeTiles.ROAD)
				}
				else {
					const left = pos(row, col - 1)
					const right = pos(row, col + 1)

					let blocks = 0

					if (isBlocked(this.get(left.row - 1, left.col))) {
						blocks++
					}

					if (isBlocked(this.get(left.row, left.col - 1))) {
						blocks++
					}

					if (blocks >= 2) {
						this.set(row, col, MazeTiles.ROAD)
						continue
					}

					if (isBlocked(this.get(left.row + 1, left.col))) {
						blocks++
					}

					if (blocks >= 2) {
						this.set(row, col, MazeTiles.ROAD)
						continue
					}

					blocks = 0

					if (isBlocked(this.get(right.row - 1, right.col))) {
						blocks++
					}

					if (isBlocked(this.get(right.row, right.col + 1))) {
						blocks++
					}

					if (blocks >= 2) {
						this.set(row, col, MazeTiles.ROAD)
						continue
					}

					if (isBlocked(this.get(right.row + 1, right.col))) {
						blocks++
					}

					if (blocks >= 2) {
						this.set(row, col, MazeTiles.ROAD)
						continue
					}
				}
			}
		}

		console.log(this.toString() + '\n\n\n')
	}

	configTunnels(numTunnels) {
		const tunnelCandidates = this.candidates.filter((candidate, index) => {
			if (candidate.col === this.width - 1) {
				this.candidates[index] = null
				return true
			}
			return false
		})

		this.candidates = this.candidates.filter(c => c !== null)

		for (let i = 0; i < numTunnels; i++) {
			const index = parseInt(Math.random() * tunnelCandidates.length)
			const candidate = tunnelCandidates[index]

			this.set(candidate.row, candidate.col, MazeTiles.ROAD)

			tunnelCandidates.splice(index, 1)
		}

		tunnelCandidates.forEach(candidate => {
			this.set(candidate.row, candidate.col, MazeTiles.WALL)
		})
	}

	// configBridges(numBridges) {
	// 	const bridgeCandidates = this.candidates.filter((candidate, index) => {
	// 		if (candidate.col === 0) {
	// 			this.candidates[index] = null
	// 			return true
	// 		}
	// 		return false
	// 	})
	//
	// 	this.candidates = this.candidates.filter(c => c !== null)
	//
	// 	for (let i = 0; i < numBridges; i++) {
	// 		const index = parseInt(Math.random() * bridgeCandidates.length)
	// 		const candidate = bridgeCandidates[index]
	//
	// 		this.set(candidate.row, candidate.col, MazeTiles.ROAD)
	//
	// 		bridgeCandidates.splice(index, 1)
	// 	}
	//
	// 	bridgeCandidates.forEach(candidate => {
	// 		this.set(candidate.row, candidate.col, MazeTiles.BLOCK)
	// 	})
	// }
}

function blockSize(model, row, col) {
	if (col < 0) return 0

	const tile = model.get(row, col)

	if (tile === MazeTiles.WALL) return 1

	if (tile === MazeTiles.BLOCK) {
		model.set(row, col, MazeTiles.VOID)

		const size = + blockSize(model, row - 1, col)
					 + blockSize(model, row + 1, col)
					 + blockSize(model, row, col - 1)
					 + blockSize(model, row, col + 1)
					 + 1

		model.set(row, col, tile)

		return size
	}

	return 0
}

function isConnected(model, a, b) {
	const maxDepth = model.width + model.height

	for (let depth = distance1(a, b); depth < maxDepth; depth++) {
		if (_isConnected(model, a, b, 0, depth)) {
			return true
		}
	}

	return false
}

function _isConnected(model, current, goal, depth, maxDepth) {
	const row = current.row
	const col = current.col
	const ctile = model.get(row, col)

	if (row < 0) 				return false
	if (row >= model.height) 	return false
	if (col < 0) 				return false
	if (col >= model.width) 	return false
	if (isBlocked(ctile)) 		return false
	if (depth > maxDepth)		return false

	if (row === goal.row && col === goal.col) return true

	model.set(row, col, MazeTiles.VOID)

	const candidates = [
		pos(row + 1, col),
		pos(row - 1, col),
		pos(row, col + 1),
		pos(row, col - 1)
	]
	.sort((a, b) => {
		return distance1(a, goal) + distance2(a, goal)
			 - distance1(b, goal) - distance2(b, goal)
	})

	let connected = false

	for (let i = 0; i < candidates.length && !connected; i++) {
		if (_isConnected(model, candidates[i], goal, depth + 1, maxDepth)) {
			connected = true
		}
	}

	model.set(row, col, ctile)

	return connected
}
