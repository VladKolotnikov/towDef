class Enemy {
  constructor(id, hp, speed) {
    this.id = id;
    this.hp = hp;
    this.maxhp = hp;
    this.speed = speed;
    this.whichGrid = grid;

    this.nextDir = 0;  // 1 up, 2 right, 3 down, 4 left
    this.prevDir = 0;  // used to ensure that the enemy makes it to the center before changing direction

    // idea: add a bit of randomness to the position
    this.pixelpos = createVector(gridSize/2, gridSize/2);
    this.prevSpot = createVector(0, 0);
    this.spot = createVector(0, 0);

    this.buffer = (gridSize/2) / this.speed; // number of frames of movement needed to cover 1/2 cell size.
    this.startFrame = 0

  }

  move() {
    // save the previous Spot info, then get the new Spot info
    this.prevSpot = this.spot;
    this.spot = pixelPosToGridPos(this.pixelpos);


    // if we've crossed into a new Spot, save data for the buffer
    if(this.prevSpot.x != this.spot.x || this.prevSpot.y != this.spot.y) {
      this.startFrame = frameCount;
      this.prevDir = this.nextDir;
    }

    // snail trail
    this.whichGrid[this.spot.x][this.spot.y] = this.id;

    // search for a grid spot with a value < this.id, and value > towers
    // the 2 is the starting value of the path (in setup)
    if(this.spot.x+1 < cols) {
      if(this.whichGrid[this.spot.x+1][this.spot.y] < this.id && this.whichGrid[this.spot.x+1][this.spot.y] >= 2)
        this.nextDir = 2; // right
    }
    if(this.spot.y-1 >= 0) {
      if(this.whichGrid[this.spot.x][this.spot.y-1] < this.id && this.whichGrid[this.spot.x][this.spot.y-1] >= 2)
        this.nextDir = 1; // up
    }
    if(this.spot.y+1 < rows) {
      if(this.whichGrid[this.spot.x][this.spot.y+1] < this.id && this.whichGrid[this.spot.x][this.spot.y+1] >= 2)
        this.nextDir = 3; // down
    }
    if(this.spot.x-1 >= 0) {
      if(this.whichGrid[this.spot.x-1][this.spot.y] < this.id && this.whichGrid[this.spot.x-1][this.spot.y] >= 2)
        this.nextDir = 4; // left
    }

    // if we cross into a new cell, move through the buffer, then change dir.
    if(frameCount < this.startFrame + this.buffer)
    {
      if(this.prevDir == 1) this.pixelpos.y -= this.speed;
      if(this.prevDir == 2) this.pixelpos.x += this.speed;
      if(this.prevDir == 3) this.pixelpos.y += this.speed;
      if(this.prevDir == 4) this.pixelpos.x -= this.speed;
    }
    else {
      if(this.nextDir == 1) this.pixelpos.y -= this.speed;
      if(this.nextDir == 2) this.pixelpos.x += this.speed;
      if(this.nextDir == 3) this.pixelpos.y += this.speed;
      if(this.nextDir == 4) this.pixelpos.x -= this.speed;
    }
  }

  show() {
    fill('red');
    ellipse(this.pixelpos.x, this.pixelpos.y, gridSize*0.6, gridSize*0.6);
  }

  showHealthBar() {
    fill(200);
    rect(this.pixelpos.x - gridSize*0.3, this.pixelpos.y - gridSize*0.5, gridSize*0.6, 8);
    fill(0, 255, 0);
    let healthPercentage = this.hp / this.maxhp;
    rect(this.pixelpos.x - gridSize*0.3, this.pixelpos.y - gridSize*0.5, gridSize*0.6 * healthPercentage, 8);
  }
}
