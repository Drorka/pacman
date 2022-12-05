'use strict'

function renderBoard(mat, selector) {
  var strHTML = '<table border="0"><tbody>'
  for (var i = 0; i < mat.length; i++) {
    strHTML += '<tr>'
    for (var j = 0; j < mat[0].length; j++) {
      const cell = mat[i][j]
      const className = `cell cell-${i}-${j}`

      strHTML += `<td class="${className}">${cell}</td>`
    }
    strHTML += '</tr>'
  }
  strHTML += '</tbody></table>'

  const elContainer = document.querySelector(selector)
  elContainer.innerHTML = strHTML
}

// location is an object like this - { i: 2, j: 7 }
function renderCell(location, value) {
  // Select the elCell and set the value
  const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
  elCell.innerHTML = value
}

function getEmptyCells(mat) {
  var emptyCells = []
  for (var i = 0; i < mat.length; i++) {
    for (var j = 0; j < mat[0].length; j++) {
      if (mat[i][j] === WALL) continue
      if (mat[i][j] === GHOST) continue
      if (mat[i][j] === FOOD) continue
      if (mat[i][j] === PACMAN) continue
      if (mat[i][j] === SUPERFOOD) continue
      emptyCells.push({ i, j })
    }
  }
  if (!emptyCells.length) return null
  return emptyCells
}

function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function drawCell(emptyCells) {
  if (!emptyCells) return
  var idx = getRandomInt(0, emptyCells.length)
  var emptyCell = emptyCells.splice(idx, 1)[0]
  return emptyCell
}

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}

function getRandomColor() {
  const letters = '0123456789ABCDEF'
  var color = '#'
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}
