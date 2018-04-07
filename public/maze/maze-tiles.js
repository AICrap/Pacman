const MazeTiles = {
    WALL: 'X',
    BLOCK: 'O',
    ROAD: ' ',
	NODE: '+',
	CAND: '?',
	VOID: '~'
}

export function isBlocked(tile) {
	return tile !== MazeTiles.ROAD
		&& tile !== MazeTiles.NODE
		&& tile !== MazeTiles.CAND
}

export {MazeTiles}
