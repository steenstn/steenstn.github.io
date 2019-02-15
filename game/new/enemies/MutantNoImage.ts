class MutantNoImage extends Enemy {
  speedx = 3;
  width = 80;
  height = 36;
  offsetx = 5;
  offsety = 5;
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
   // context.drawImage(Mutant.image, 88*this.idleCurrentFrame, 0, 88, 36,Math.round(Viewport.x+this.x),Math.round(Viewport.y+this.y), 88, 36);
  }

}
