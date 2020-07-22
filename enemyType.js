class SlowEnemy extends Enemy {
  constructor(id) {
    super(id, 50, 1)
    super.whichGrid = grid
  }
}
class MedEnemy extends Enemy {
  constructor(id) {
    super(id, 25, 2)
    super.whichGrid = grid2

  }
}
class FastEnemy extends Enemy {
  constructor(id) {
    super(id, 10, 4)
    super.whichGrid = grid3

  }
}
