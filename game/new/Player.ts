class Player {

  oldx : number;
  oldy : number;
  width : number;
  height : number;
  hp : number;
  dead : number;

  // Zone that kills enemies
  killZonex : number;
  killZoney : number;
  killZoneWidth : number;
  killZoneHeight : number;

  // Zone that hurts player
  hurtZonex : number;
  hurtZoney : number;
  hurtZoneWidth : number;
  hurtZoneHeight : number;

  currentFrame : number;
  animationCounter : number;
  idleAnimationCounter : number;
  idleCurrentFrame : number;
  goingLeft : number;
  speedx : number;
  speedy : number;
  jumping : number;
  keyUp : number;
  keyLeft : number;
  keyRight : number;




  constructor(public x,public y,public image) {
    this.x = x;
    this.y = y;
    this.image = image;

    this.oldx = x;
  	this.oldy = y;
  	this.width = 20;
  	this.height = 30;
  	this.hp = 100;
  	this.dead = 0;

    this.updateKillZone();
  	this.killZoneWidth = this.width - 10;
  	this.killZoneHeight = 5;

  	this.updateHurtZone();
  	this.hurtZoneWidth = this.width - 6;
  	this.hurtZoneHeight = this.height/1.8;

  	this.currentFrame = 0;
    this.animationCounter = 0;
    this.idleAnimationCounter = Math.round(5*Math.random());
    this.idleCurrentFrame = 0;
  	this.goingLeft = 0;
  	this.speedx = 0;
  	this.speedy = 0;
  	this.jumping = 0;

  	this.keyUp = 0;
  	this.keyLeft = 0;
  	this.keyRight = 0;
  }

 updateHurtZone() {
   this.hurtZonex = this.x + 3;
   this.hurtZoney = this.y + 5;
 }

 updateKillZone() {
   this.killZonex = this.x+5;
   this.killZoney = this.y + this.height - 5;
 }
  drawHurtZone(context) {
    context.fillStyle = '#FF0a00';
    context.beginPath();
    context.rect(this.hurtZonex + Viewport.x, this.hurtZoney + Viewport.y,this.hurtZoneWidth, this.hurtZoneHeight);
    context.closePath();
    context.fill();
  }

  drawKillZone(context) {
    context.fillStyle = '#0aDD00';
	  context.beginPath();
	  context.rect(this.killZonex + Viewport.x, this.killZoney + Viewport.y,this.killZoneWidth, this.killZoneHeight);
	  context.closePath();
	  context.fill();
  }
}
