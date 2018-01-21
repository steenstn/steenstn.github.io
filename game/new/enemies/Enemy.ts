class Enemy {
  private movementStrategy : IEnemyMovementStrategy;
  x : number;
  y : number;
  oldx : number;
  oldy : number;
  
  constructor(movementStrategy : IEnemyMovementStrategy) {
      this.movementStrategy = movementStrategy;
  }

  move() {
    this.movementStrategy.move(this);
  }
}
