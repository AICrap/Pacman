export function array2d(width, height) {
	const arr = new Array(height)

	for (let i = 0; i < arr.length; i++) {
		arr[i] = new Array(width)
	}

	return arr
}

export function printArray(arr, spacing) {
	let str = spacing

	arr.forEach(val => {
		str += val + spacing
	})

	console.log(str)
}

export function printArrayAs2d(arr, width, spacing) {
	for (let i = 0; i < arr.length; i += width) {
		printArray(arr.slice(i, i + width), spacing)
	}
}

export function printArray2d(arr, spacing) {
	arr.forEach(row => {
		printArray(row, spacing)
	})
}

export function shallowArrayCopy(arr) {
	return arr.slice(0)
}

export function distance1(p1, p2) {
	return Math.abs(p1.row - p2.row) + Math.abs(p1.col - p2.col)
}

export function distance2(p1, p2) {
	const dRow = p1.row - p2.row
	const dCol = p1.col - p2.col

	return Math.sqrt(dRow * dRow + dCol * dCol)
}

export function pos(row, col) {
	return {
		row: row,
		col: col
	}
}
