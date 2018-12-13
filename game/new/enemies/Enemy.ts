class Enemy {
  private movementStrategy : IEnemyMovementStrategy;
  x : number;
  y : number;
  oldx : number;
  oldy : number;
  width : number;
  height : number;
  offsetx : number;
  offsety : number;
  speedx : number;
  speedy : number;
  type : string;
  hp = 1;
  alive = true;

  constructor(movementStrategy : IEnemyMovementStrategy) {
      this.movementStrategy = movementStrategy;
  }

  move() {
    this.movementStrategy.move(this);
  }

  drawHp(context) {
    
  }
}
