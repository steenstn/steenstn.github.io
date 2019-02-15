class SkullNoImage extends Enemy {
  speedx = 0;
  width = 28;
  height = 35;
  offsetx=3;
  acceleration;
  direction : number;
  constructor(enemy, currentLevel) {
    super(new GlidingStrategy(enemy, currentLevel));
    this.x = enemy.x;
    this.y = enemy.y;
    this.oldx = enemy.oldx;
    this.oldy = enemy.oldy;
    this.direction = enemy.direction;
    this.acceleration = this.direction > 0 ? 0.5 : -0.5;

  }

  draw(context) {
  }
}
