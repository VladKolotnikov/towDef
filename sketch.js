let gridSize = 20
let rows, cols
let grid
function setup() {

  createCanvas(700, 700)
  rows = int(height / gridSize)
  cols = int(width / gridSize)
  grid = new Array(cols);

  for (let i = 0; i < grid.length; i++) {
    grid[i] = new Array(rows);
  }

}


function draw() {
  background(141)
  fill('yellow')
  rect(0, 0, width/2, rows)
  rect(width/2-rows, 0, cols, height/2)
  rect(width/2-cols, height/2, width, cols)
  rect(width-cols, height/2, rows, height)
  fill('red')
  rect(width, height, -rows, -cols)
  for (let i = 0; i < height; i+=rows) {
    line(0, i, width, i)
  }
  for (let i = 0; i < width; i+=cols) {
    line(i, 0, i, height)
  }
  
}
