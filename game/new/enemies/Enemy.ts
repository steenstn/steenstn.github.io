class Enemy {
  private movementStrategy : IEnemyMovementStrategy;

  constructor(movementStrategy : IEnemyMovementStrategy) {
      this.movementStrategy = movementStrategy;
  }

  move() {
    this.movementStrategy.move(this);
  }
}
