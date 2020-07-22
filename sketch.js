// PRESS T TO HOLD A TOWER.
// CLICK TO PLACE A TOWER.

// make a copy of grid for each enemy type (speed).

let gridSize = 50
let rows, cols

// 0 means empty
// 1 is tower
// 2 is untraveled path
// 3+ is "snail trail" from enemies.

// multiple grids for multiple enemy types
let grid, grid2, grid3
let holdingTower = false
let towers = []
let enemies = []
let currentEnemyID = 3

function drawGridAndPath() {
  background(141)

  for(let x = 0; x < cols; x++)
  {
    for(let y = 0; y < rows; y++)
    {
      if(grid[x][y] > 2)
        fill('blue');
      else
        fill('yellow');

      if(grid[x][y] >= 2)
        rect(x*gridSize, y*gridSize, gridSize, gridSize)
    }
  }
  //rect(width/2-gridSize, 0, gridSize, height/2)
  //rect(width/2-gridSize, height/2, width, gridSize)
  //rect(width-gridSize, height/2, gridSize, height)
  fill('red')
  rect(width, height, -gridSize, -gridSize)
  for (let i = 0; i < height; i+=gridSize) {
    line(0, i, width, i)
  }
  for (let i = 0; i < width; i+=gridSize) {
    line(i, 0, i, height)
  }
}

function pixelPosToGridPos(pixelPos)
{
  return createVector((int)(pixelPos.x / gridSize), (int)(pixelPos.y / gridSize));
}

function drawTowers() {
  for(let i = 0; i < towers.length; i++)
  {
    towers[i].show();
  }
}

function drawWeaponEffects() {
  // draw lines from each tower to its target.
  for(let i = 0; i < towers.length; i++)
  {
    towers[i].fireAtEnemyInRange();
  }
}

function setup() {
  createCanvas(700, 700)
  rows = int(height / gridSize)
  cols = int(width / gridSize)
  grid = new Array(cols);
  grid2 = new Array(cols);
  grid3 = new Array(cols);
  for (let i = 0; i < grid.length; i++) {
    grid[i] = new Array(rows);
    grid2[i] = new Array(rows);
    grid3[i] = new Array(rows);
  }
  for(let x = 0; x < cols; x++)
  {
    for(let y = 0; y < rows; y++)
    {
      grid[x][y] = 0;
      grid2[x][y] = 0;
      grid3[x][y] = 0;
      // set up the pathway (fixed)
      if((x < 6 && y == 0) || (x == 6 && y < 8) || (x > 6 && y == 7) || (x == cols-1 && y > 6))
      {
        grid[x][y] = 2;
        grid2[x][y] = 2;
        grid3[x][y] = 2;
      }
    }
  }
}

function draw() {
  drawGridAndPath()
  drawTowers()
  drawWeaponEffects()
  if(holdingTower)
  {
    fill('green');
    rectMode(CENTER);
    rect(mouseX, mouseY, gridSize, gridSize);
    rectMode(CORNER);
  }

  enemies.forEach(function(enemy){
    enemy.move();
    enemy.show();
  });
  enemies.forEach(function(enemy){
    enemy.showHealthBar();
  });
}

function mgX() {
  return (int)(mouseX/gridSize)
}

function mgY() {
  return (int)(mouseY/gridSize)
}

function mousePressed() {
  let mgx = mgX()
  let mgy = mgY()
  // TODO: don't place on the path, or on top of another tower.
  if(holdingTower && grid[mgx][mgy] == 0)
  {
    towers.push(new Tower(mgx, mgy));
    grid[mgx][mgy] = 1
    holdingTower = false;
  }
}

function keyPressed() {
  if(key == 't' && !holdingTower)
  {
    holdingTower = true;
  }

  if(key == 'j')
  {
    enemies.push(new SlowEnemy(currentEnemyID));
    currentEnemyID++;
  }
  if(key == 'k')
  {
    enemies.push(new MedEnemy(currentEnemyID));
    currentEnemyID++;
  }
  if(key == 'l')
  {
    enemies.push(new FastEnemy(currentEnemyID));
    currentEnemyID++;
  }
}
