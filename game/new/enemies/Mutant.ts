class Mutant extends Enemy {
  static image = new Image();
  speedx = 3;
  width = 80;
  height = 36;
  offsetx = 5;
  offsety = 5;
  idleAnimationCounter = 0;
  idleCurrentFrame = 0;
  direction : number;

  constructor(enemy) {
    super(new MutantStrategy(enemy));
    this.x = enemy.x;
    this.y = enemy.y;
    this.oldx = enemy.oldx;
    this.oldy = enemy.oldy;
    this.direction = enemy.direction;

    Mutant.image.src = "images/mutant.png";
    Mutant.image.width = 88;
    Mutant.image.height = 36;

  }

  draw(context) {
    context.drawImage(Mutant.image, 88*this.idleCurrentFrame, 0, 88, 36,Math.round(Viewport.x+this.x),Math.round(Viewport.y+this.y), 88, 36);
  }

}
