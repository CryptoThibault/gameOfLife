

class Grid {
  constructor(cellSize) {
    this.width = canvas.width
    this.height = canvas.height
    this.cellSize = cellSize
    this.amount = Math.floor(canvas.width / cellSize)
    this.values = Array.from({ length: this.amount }, () => (Array.from({ length: this.amount }, () => (false))))
  }
  change(x, y) {
    this.values[x][y] = !this.values[x][y]
  }

  reset() {
    this.values = Array.from({ length: this.amount }, () => (Array.from({ length: this.amount }, () => (false))))
  }

  run() {
    let newValues = this.values
    for (let i = 0; i < this.amount; i++) {
      for (let j = 0; j < this.amount; j++) {
        let thisCell = this.values[i][j]
        let trueCells = 0
        if (i != 0 && j != 0) {
          if (this.values[i - 1][j - 1]) {
            trueCells++
          }
        }
        if (i != 0) {
          if (this.values[i - 1][j]) {
            trueCells++
          }
        }
        if (i != 0 && j != this.amount - 1) {
          if (this.values[i - 1][j + 1]) {
            trueCells++
          }
        }
        if (j != 0) {
          if (this.values[i][j - 1]) {
            trueCells++
          }
        }
        if (j != this.amount - 1) {
          if (this.values[i][j + 1]) {
            trueCells++
          }
        }
        if (i != this.amount - 1 && j != 0) {
          if (this.values[i + 1][j - 1]) {
            trueCells++
          }
        }
        if (i != this.amount - 1) {
          if (this.values[i + 1][j]) {
            trueCells++
          }
        }
        if (i != this.amount - 1 && j != this.amount - 1) {
          if (this.values[i + 1][j + 1]) {
            trueCells++
          }
        }

        console.log(trueCells)
        if (thisCell && trueCells != 2 && trueCells != 3) {
          newValues[i][j] = false
          console.log('new dead cell')
        } else if (!thisCell && trueCells == 3) {
          newValues[i][j] = true
          console.log('new live cell')
        }
      }
    }
    this.values = newValues;
  }
}


let canvas = document.getElementById('canvas');

let grid = new Grid(10);
let selCell = { x: 2, y: 3 }
let isRunning = false

let canvasContext = canvas.getContext('2d');

window.onload = () => {
  gameLoop();
}

function gameLoop() {
  setInterval(show, 1000 / 5);
}

function show() {
  update();
  draw();
}

function update() {
  canvasContext.clearRect(0, 0, canvas.width, canvas.height);
  console.log('update');
  if (isRunning) {
    grid.run();
  }
}

function draw() {
  for (let i = 0; i < grid.values.length; i++) {
    for (let j = 0; j < grid.values[i].length; j++) {
      createRect(i * grid.cellSize, j * grid.cellSize, grid.cellSize - 2, grid.cellSize - 2, grid.values[i][j] ? 'black' : 'gray')
    }
  }
  createRect(selCell.x * grid.cellSize + 7, selCell.y * grid.cellSize + 7, grid.cellSize - 15, grid.cellSize - 15, 'red')
}

function createRect(x, y, width, height, color) {
  canvasContext.fillStyle = color
  canvasContext.fillRect(x, y, width, height)
}

window.addEventListener('keydown', (event) => {
  setTimeout(() => {
    if (event.key == 'ArrowLeft' && selCell.x != 0) {
      selCell.x -= 1
    } else if (event.key == 'ArrowUp' && selCell.y != 0) {
      selCell.y -= 1
    } else if (event.key == 'ArrowRight' && selCell.x != grid.amount - 1) {
      selCell.x += 1
    } else if (event.key == 'ArrowDown' && selCell.y != grid.amount - 1) {
      selCell.y += 1
    } else if (event.key == ' ') {
      grid.change(selCell.x, selCell.y)
    } else if (event.key == 'Enter') {
      isRunning = !isRunning
    } else if (event.key == 'a') {
      console.log(grid.values)
    } else if (event.key == 'p') {
      grid.reset()
    }
  }, 1)
})