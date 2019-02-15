class BossNoImage extends Enemy {
  speedx = 4.5;
  speedy = 0;
  width = 60;
  height = 60;
  type = "boss";
  currentState = BossStrategy.JUMPING;
  private maxHp = 30;
  private oldHp;
  private hurtAnimationCounter : number;
  firing : boolean;
  breakingBlock = false;

  constructor(enemy, currentLevel) {
    super(new BossStrategy(enemy, currentLevel));
    this.x = enemy.x;
    this.y = enemy.y;
    this.hp = this.maxHp;
    this.oldHp = this.hp;
    this.hurtAnimationCounter = 10;
    this.firing = false;
  }


  draw(context) {
  }

  drawHp(context) {
  }
}
