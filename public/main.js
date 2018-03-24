import {Astar} from './astar.js'
import {Graph} from './graph.js'
import {Point} from './point.js'
import Maze from './maze.js'

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const width = canvas.width
const height = canvas.height


Maze.createTemplate(5, 5)
