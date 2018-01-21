class Mutant extends Enemy {
  speedx = 3;
  width = 88;
  height = 36;
  idleAnimationCounter = 0;
  idleCurrentFrame = 0;
  x : number;
  y: number;
  oldx : number;
  oldy : number;
  direction : number;
  public type = "mutant";
  
  constructor(enemy, currentLevel) {
    super(new MutantStrategy(enemy, currentLevel));
    this.x = enemy.x;
    this.y = enemy.y;
    this.oldx = enemy.oldx;
    this.oldy = enemy.oldy;
    this.direction = enemy.direction;
  }
}
