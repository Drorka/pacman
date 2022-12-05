'use strict'

const WALL = '#'
const FOOD = '.'
const EMPTY = ' '
const CHERRY = '🍒'
const SUPERFOOD = '🥞'

const gGame = {
  score: 0,
  isOn: false,
}

var gBoard
var gFoodCount = 0
var gEatenFoodCount = 0

var gIntervalCherries
var gTimeoutSuperFood

var gDeadGhosts = []

function onInit() {
  console.log('hello')
  gBoard = buildBoard()
  createGhosts(gBoard)
  createPacman(gBoard)
  renderBoard(gBoard, '.board-container')
  addCherries()
  gGame.isOn = true
}

function buildBoard() {
  const size = 10
  const board = []

  for (var i = 0; i < size; i++) {
    board.push([])
    for (var j = 0; j < size; j++) {
      board[i][j] = FOOD
      if (
        i === 0 ||
        i === size - 1 ||
        j === 0 ||
        j === size - 1 ||
        (j === 3 && i > 4 && i < size - 2)
      ) {
        board[i][j] = WALL
      } else if (
        (i === 1 && j === 1) ||
        (i === 1) & (j === size - 2) ||
        (i === size - 2 && j === size - 2) ||
        (i === size - 2 && j === 1)
      ) {
        board[i][j] = SUPERFOOD
      } else {
        gFoodCount++
      }
    }
  }
  return board
}

function updateScore(diff) {
  // TODO: update model and dom
  // Model
  gGame.score += diff
  // DOM
  document.querySelector('h2 span').innerText = gGame.score
}

function gameOver() {
  console.log('Game Over')
  // TODO
  clearInterval(gIntervalGhosts)
  clearInterval(gIntervalCherries)
  gGame.isOn = false
  renderCell(gPacman.location, '🍳')
  showModal('gameOver')
}

function victory() {
  console.log('victory!')
  clearInterval(gIntervalGhosts)
  clearInterval(gIntervalCherries)
  gGame.isOn = false
  renderCell(gPacman.location, '👑')
  showModal('victory')
}

function showModal(cause) {
  var elModal = document.querySelector('.modal')
  var elModalText = document.querySelector('.modal span')
  //   add a victory check, and update the modal text accordingly
  if (cause === 'gameOver') {
    elModalText.innerText = 'Game Over'
  }
  if (cause === 'victory') {
    elModalText.innerText = 'Victory is Mine!'
  }
  // show the modal only after all changes were made
  elModal.style.display = 'block'
}

function playAgain() {
  var elModal = document.querySelector('.modal')
  elModal.style.display = 'none'
  gGhosts = []
  gGame.score = 0
  document.querySelector('h2 span').innerText = gGame.score
  onInit()
}

function addCherries() {
  gIntervalCherries = setInterval(addCherry, 7000)
}

function addCherry() {
  var emptyCells = getEmptyCells(gBoard)
  var emptyCell = drawCell(emptyCells)
  if (!emptyCell) return
  // update model
  gBoard[emptyCell.i][emptyCell.j] = CHERRY
  // update dom
  renderCell(emptyCell, CHERRY)
}

function changeGhostsColor() {
  for (var i = 0; i < gGhosts.length; i++) {
    gGhosts[i].color = 'blue'
  }
}

function eatGhost(nextLocation) {
  console.log(nextLocation)
  // check gGhosts for the ghosts in this location
  // take out the ghost into a deadghosts array
  for (var i = 0; i < gGhosts.length; i++) {
    if (
      gGhosts[i].location.i === nextLocation.i &&
      gGhosts[i].location.j === nextLocation.j
    ) {
      var deadGhost = gGhosts.splice(gGhosts[i], 1)[0]
      gDeadGhosts.push(deadGhost)
      console.log('deadGhosts', gDeadGhosts)
    }
  }
}

function deactivateSuperFood() {
  gPacman.isSuper = false

  // bring ghosts back from deadghosts array
  //   !not bringing back all ghosts
  var deadGhostsNum = gDeadGhosts.length
  for (var i = 0; i < deadGhostsNum; i++) {
    var zombieGhost = gDeadGhosts[i]
    // var zombieGhost = gDeadGhosts.splice(i, 1)[0]
    gGhosts.push(zombieGhost)
    console.log('gGhosts', gGhosts)
    console.log('gDeadGhosts', gDeadGhosts)
    // createGhost(gBoard) - it will create extra new ghosts everytime pacman eats a superfood
  }
  //   change ghosts color back to random
  for (var i = 0; i < gGhosts.length; i++) {
    gGhosts[i].color = getRandomColor()
  }
}
