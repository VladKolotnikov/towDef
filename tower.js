class Tower {
  // placement of a tower involves clicking on a grid spot while holding a purchased tower.
  constructor(gridX, gridY) {
    this.pos = createVector(gridX, gridY);
    this.center = createVector(gridX * gridSize + gridSize / 2, gridY * gridSize + gridSize / 2);
    this.range = gridSize * 3.5;
  }

  show() {
    fill('green');
    rect(this.pos.x * gridSize, this.pos.y * gridSize, gridSize, gridSize);
  }

  fireAtEnemyInRange() {
    if (dist(mouseX, mouseY, this.center.x, this.center.y) < this.range) {
      push();
      strokeWeight(5);
      line(mouseX, mouseY, this.center.x, this.center.y);
      pop();
    }
  }
}
