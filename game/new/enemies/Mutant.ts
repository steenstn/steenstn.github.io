class Mutant extends Enemy {
  static image = new Image();
  speedx = 3;
  width = 88;
  height = 36;
  idleAnimationCounter = 0;
  idleCurrentFrame = 0;
  direction : number;

  constructor(enemy, currentLevel) {
    super(new MutantStrategy(enemy, currentLevel));
    this.x = enemy.x;
    this.y = enemy.y;
    this.oldx = enemy.oldx;
    this.oldy = enemy.oldy;
    this.direction = enemy.direction;
  }

  draw(context) {
    context.drawImage(Mutant.image, 88*this.idleCurrentFrame, 0, 88, 36,Viewport.x+this.x,Viewport.y+this.y, 88, 36);
  }

}
