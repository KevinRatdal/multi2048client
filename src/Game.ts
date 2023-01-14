

export class Game {
  score: number;
  grid: Array<number[]>;
  gridSize: number

  constructor(gridSize: number = 4) {
    this.score = 0
    this.gridSize = gridSize
    this.grid = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0] 
    ]
    this.start()
  }

  start() {
    const randomX = Math.floor(this.gridSize * Math.random())
    const randomY = Math.floor(this.gridSize * Math.random())
    // const startVal = Math.floor((2 * Math.random()) + 1 ) * 2
    const startVal = 2
    console.log({randomX, randomY, startVal})
    this.grid[randomX][randomY] = startVal
  }

  viewGrid() {
    console.log(JSON.stringify(this.grid))
  } 

  getGrid() {
    return this.grid
  }

  _getEmptyPositions(): any[] {
    let empties = []
    for (let x = 0; x < this.gridSize; x++ ) {
      for (let y = 0; y < this.gridSize; y++ ) {
        if (this.grid[x][y] === 0) {
          empties.push({x: x, y: y})
        }
      }
    }
    return empties
  }

  _setRandomSquare() {
    let emptyPositions = this._getEmptyPositions()
    if (emptyPositions.length <= 0) {
      return
    }
    const {x, y} = emptyPositions[Math.floor(emptyPositions.length * Math.random())]
    const randomValue = Math.floor((2 * Math.random()) + 1) * 2
    this.grid[x][y] = randomValue
  }

  move(direction: string) {
    switch (direction) {
      case 'up':
        this._handleMoveUp()
        break;
      case 'down':
        this._handleMoveUp()
        break;
      case 'left':
        this._handleMoveUp()
        break;
      case 'right':
        this._handleMoveUp()
        break;
    
      default:
        break;
    }
  }

  _handleMoveUp() {
    // for each collumn in the grid
    // create an array from reverse values and try to move numbers "upwards"
  }
  _handleMoveDown() {
    // for each collumn in the grid
    // create an array from values and try to move numbers "downwards"

  }
  _handleMoveLeft() {
    // for each row in the grid
    // create an array from reverse values and try to move numbers "leftwards"  
  }
  _handleMoveRight() {
    // for each row in the grid
    // create an array from values and try to move numbers "rightwards"
  }

  handleSectionMove(section: number[]) {
    // for each entry of the array, check if the next one is equal,
    // if it is, merge the current cell to the next
    // if it isnt check the next
    // needs to return some of of indicator for if the array has changed or not
  }

}

