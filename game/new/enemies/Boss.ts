class Boss extends Enemy {
  static image = new Image();
  private killZonex: number;
  private killZoney: number;
  private killZoneWidth: number;
  private killZoneHeight: number;
  private hurtZonex: number;
  private hurtZoney: number;
  private hurtZoneWidth: number;
  private hurtZoneHeight: number;
  speedx = 4.5;
  speedy = 0;
  width = 60;
  height = 60;
  type = "boss";
  private maxHp = 40;
  private oldHp;
  private hurtAnimationCounter : number;

  constructor(enemy, currentLevel) {
    super(new BossStrategy(enemy, currentLevel));
    this.x = enemy.x;
    this.y = enemy.y;
    this.hp = this.maxHp;
    this.oldHp = this.hp;
    Boss.image.src = "deloused.png";
    this.hurtAnimationCounter = 10;
  }


  draw(context) {
    if(this.hp !== this.oldHp) {
      this.hurtAnimationCounter = 10;
    }
    let offsetx = this.hurtAnimationCounter > 0 ? 120 : 60;
    let offsety = this.speedx > 0 ? 1 : 0;
    context.fillStyle = "#fafafa";
    context.drawImage(Boss.image, offsetx, 60*offsety,60, 60, Math.round(this.x+Viewport.x), Math.round(this.y+Viewport.y), 60, 60);

    this.hurtAnimationCounter--;
  }

  drawHp(context) {
    context.fillStyle = this.hp !== this.oldHp ? "#ffffff" : "#fa0000";

    context.fillRect(Viewport.width-50, Viewport.height-2*this.hp-20, 30, 2*this.hp);

    context.strokeStyle = "#ffffff";
    context.strokeRect(Viewport.width-50, Viewport.height-2*this.maxHp-20, 30, 2*this.maxHp);
    this.oldHp = this.hp;
  }
}
