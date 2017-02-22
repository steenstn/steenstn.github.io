class Player {

  oldx : number;
  oldy : number;
  width : number;
  height : number;
  hp : number;
  dead : number;

  // Zone that hurts enemies
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
  	this.width = 10;
  	this.height = 15;
  	this.hp = 100;
  	this.dead = 0;

    this.killZonex = x;
  	this.killZoney = y + this.height - 5;
  	this.killZoneWidth = this.width;
  	this.killZoneHeight = 5;

  	this.hurtZonex = this.x - 2;
  	this.hurtZoney = this.y + this.height;
  	this.hurtZoneWidth = this.width;
  	this.hurtZoneHeight = 15;

  	this.currentFrame = 0;
  	this.goingLeft = 0;
  	this.speedx = 0;
  	this.speedy = 0;
  	this.jumping = 0;

  	this.keyUp = 0;
  	this.keyLeft = 0;
  	this.keyRight = 0;
  }
}
