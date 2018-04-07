import {Astar} from './astar.js'
import {Graph} from './graph.js'
import {Point} from './point.js'
import MazeTemplate from './maze/maze-template.js'
import MazeModel from './maze/maze-model.js'
import Maze from './maze/maze.js'
import {pos} from './utils.js'
import {MazeTiles} from './maze/maze-tiles.js'

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const width = canvas.width
const height = canvas.height

const model = new MazeModel(3, 3, 2, 7)
const maze = new Maze(model)

// TODO !!!
// Add nodes in the maze for the ghost path finding
