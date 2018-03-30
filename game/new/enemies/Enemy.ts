class Enemy {
  private movementStrategy : IEnemyMovementStrategy;
  x : number;
  y : number;
  oldx : number;
  oldy : number;
  hp = 1;

  constructor(movementStrategy : IEnemyMovementStrategy) {
      this.movementStrategy = movementStrategy;
  }

  move() {
    this.movementStrategy.move(this);
  }

  drawHp(context) {
    
  }
}
