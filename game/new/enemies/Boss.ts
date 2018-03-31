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
  currentState = BossStrategy.JUMPING;
  private maxHp = 40;
  private oldHp;
  private hurtAnimationCounter : number;
  firing : boolean;

  constructor(enemy, currentLevel) {
    super(new BossStrategy(enemy, currentLevel));
    this.x = enemy.x;
    this.y = enemy.y;
    this.hp = this.maxHp;
    this.oldHp = this.hp;
    Boss.image.src = "deloused.png";
    this.hurtAnimationCounter = 10;
    this.firing = false;
  }


  draw(context) {
    let offsetx;
    if(this.hp !== this.oldHp) {
      this.hurtAnimationCounter = 10;
    }
    offsetx = (this.hurtAnimationCounter > 0  && !this.firing) ? 120 : this.currentState === BossStrategy.SHOOTING ? 0 : 60;

    let offsety = this.speedx > 0 ? 1 : 0;
    if(this.firing) {
      let gradient = this.speedx > 0 ? context.createLinearGradient(Viewport.x+this.x,0,Viewport.width,0) : context.createLinearGradient(Viewport.x+this.x, 0, 0, 0);
      gradient.addColorStop(0,"white");
      gradient.addColorStop(1,"rgba(200,200,50,0.5)");

      context.fillStyle = gradient;

      let endx = this.speedx > 0 ? this.x+Viewport.x+Viewport.width : this.x+Viewport.x-Viewport.width;
      context.beginPath();
      context.moveTo(Viewport.x+this.x+this.width/2, Viewport.y+this.y+47);
      context.lineTo(endx,Viewport.y+this.y-150);
      context.lineTo(endx,Viewport.y+this.y+150);
      context.lineTo(Viewport.x+this.x+this.width/2, Viewport.y+this.y+47);
      context.closePath();
      context.fill();
  
    }

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
