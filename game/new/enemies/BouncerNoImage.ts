class BouncerNoImage extends Enemy {
  speedx : number;
  speedy : number;
  currentFrame = 0;
  width = 20;
  height = 20;
  constructor(enemy, currentLevel) {
    super(new FlyingStrategy(enemy, currentLevel));
    this.x = enemy.x;
    this.y = enemy.y;
    this.oldx = enemy.oldx;
    this.oldy = enemy.oldy;
    this.speedx = enemy.speedx;
    this.speedy = enemy.speedy;
  }

  draw(context) {
  }
}
