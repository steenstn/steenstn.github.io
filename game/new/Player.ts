class Player {

  oldx : number;
  oldy : number;
  width : number;
  height : number;
  hp : number;

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
  friction = WorldConstants.normalFriction;
  inBucket : boolean;
  drawingSmoke: number;
  drawingLeftBrakingSmoke: number;
  drawingRightBrakingSmoke: number;
  runningFromEnemy: number;

  private animationSpeed = 3;

  constructor(public x,public y,public image) {
    this.x = x;
    this.y = y;
    this.image = image;
    this.drawingSmoke = 0;
    this.drawingLeftBrakingSmoke = this.drawingRightBrakingSmoke = 3;
    this.oldx = x;
  	this.oldy = y;
  	this.width = 20;
  	this.height = 30;
  	this.hp = 100;
    this.runningFromEnemy = 0;

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

  update = () => {

    this.oldx = this.x;
    this.oldy = this.y;

    this.handleViewportEdges();

    this.x += this.speedx;

    this.handleLeftAndRight();

    if(this.speedy < WorldConstants.maxSpeedy) {
      this.speedy += WorldConstants.gravity;
    }

    this.y += this.speedy;

    
    // If going up, check for blocking tiles
    if(this.speedy < 0) {
      let arrayPos=Math.floor((this.x+this.width-8)/Level.tileSize)+Math.floor((this.y+5)/Level.tileSize)*Level.width;
      var leftCollisionPoint = Math.floor((this.x+8)/Level.tileSize)+Math.floor((this.y+5)/(Level.tileSize))*Level.width;
      
      var rightCollisionPointCollided = typeof Level.currentLevel[arrayPos] != "undefined" && Level.currentLevel[arrayPos].blocking==1;
      var leftCollisionPointCollided = typeof Level.currentLevel[leftCollisionPoint] != "undefined" && Level.currentLevel[leftCollisionPoint].blocking==1;

      if(rightCollisionPointCollided || leftCollisionPointCollided) {
        this.y = this.oldy;
        this.speedy = 0;
        this.jumping=WorldConstants.maxJump;
      }
    } else if(this.speedy > 0) { // Going down, check for blocking tiles

      let arrayPos=Math.floor((this.x+this.width-8)/Level.tileSize)+Math.floor((this.y+this.height)/(Level.tileSize))*Level.width;
      var leftCollisionPoint = Math.floor((this.x+8)/Level.tileSize)+Math.floor((this.y+this.height)/(Level.tileSize))*Level.width;
       var rightCollisionPointCollided = typeof Level.currentLevel[arrayPos] != "undefined" && Level.currentLevel[arrayPos].blocking==1;
      var leftCollisionPointCollided = typeof Level.currentLevel[leftCollisionPoint] != "undefined" && Level.currentLevel[leftCollisionPoint].blocking==1;

      if(rightCollisionPointCollided || leftCollisionPointCollided) {
        this.jumping = 0;
        this.drawingSmoke++;

        // If the player lands on a blocking tile, iteratively move him upwards until he is free from the
        // tile. This will remove bouncing when landing in high speed
        while(typeof Level.currentLevel[arrayPos] != "undefined" && Level.getBlockAt(this.x+this.width-8, this.y+this.height).blocking==1
          || Level.currentLevel[leftCollisionPoint] != "undefined" && Level.getBlockAt(this.x+8, this.y+this.height).blocking==1) {
            this.y-=0.2;
        }
        this.speedy=0;
      }
      if(!rightCollisionPointCollided && !leftCollisionPointCollided) { // Disable jumping when in mid-air
        this.jumping=WorldConstants.maxJump;
        this.drawingSmoke = 0;
      }

    }
    let arrayPosBottom=Math.floor((this.x+this.width-8)/Level.tileSize)+Math.floor((this.y+this.height+3)/(Level.tileSize))*Level.width;
     
  
    if(typeof Level.currentLevel[arrayPosBottom] != "undefined" && Level.currentLevel[arrayPosBottom].type=="g") // Ice block
      this.friction=1; // No friction
    else
      this.friction=WorldConstants.normalFriction;

    this.updateKillZone();
    this.updateHurtZone();
  
  }

  private handleViewportEdges = () => {
    if(this.x + Viewport.x < -1*this.width+5) {
      this.speedx = WorldConstants.kickbackForce;
      GameState.outOfBoundsTimer = 100;
    }
    if(this.x + Viewport.x > Viewport.width -5) {
      this.speedx = -1*WorldConstants.kickbackForce;
      GameState.outOfBoundsTimer = 100;
    }
    if(this.y + Viewport.y > Viewport.height - this.height+10) {
      this.speedy = -1*WorldConstants.kickbackForce;
      GameState.outOfBoundsTimer = 100;
    } 
  }

  private handleLeftAndRight = () => {
    if(this.speedx < 0) {
      var arrayPos=Level.getBlockAt(this.x, this.y + this.height/2+5);

      if(arrayPos.blocking==1) {
        this.x = this.oldx;
        this.speedx *=-0.5;
      }
    } else {
      var arrayPos=Level.getBlockAt(this.x + this.width, this.y + this.height/2+5);

      if(arrayPos && arrayPos.blocking==1) {
        this.x = this.oldx;
        this.speedx *= -0.5;
      }
    }
  }

  private updateHurtZone() : void {
   this.hurtZonex = this.x + 3;
   this.hurtZoney = this.y + 5;
  }

  private updateKillZone() : void {
    this.killZonex = this.x+5;
    this.killZoney = this.y + this.height - 5;
  }

  getHp = () : number => {
    return this.hp;
  }

  isFacingPosition(x: number) : boolean{
    if(this.x > x && this.goingLeft === 1) {
      return true;
    } else if(this.x < x && this.goingLeft === 1) {
      return false;
    } else if(this.x > x && this.goingLeft === 0) {
      return false;
    } else {
      return true;
    }
  }

 draw(context) : void {
   if(this.animationCounter>this.animationSpeed) {
     this.animationCounter=0;
     this.currentFrame=1-this.currentFrame;
   }
   if(this.idleAnimationCounter > this.animationSpeed*3) {
     this.idleAnimationCounter = 0;
     this.idleCurrentFrame = 1 - this.idleCurrentFrame;
   }
   if(this.speedy<-0.5) // JUmping up
   {
     context.drawImage(this.image,40,30*this.goingLeft, 20,30,Math.round(Viewport.x+this.x),Math.round(Viewport.y+this.y), this.width, this.height);
   }
   else if(this.speedy>0.5) // Jumping down
   {
     context.drawImage(this.image,60,30*this.goingLeft, 20,30,Math.round(Viewport.x+this.x),Math.round(Viewport.y+this.y), this.width, this.height);
   }
   else if(this.speedx>0.05 || this.speedx<-0.05) // Running
   {
     context.drawImage(this.image,80+20*this.currentFrame,30*this.goingLeft+60*this.runningFromEnemy, 20,30,Math.round(Viewport.x+this.x),Math.round(Viewport.y+this.y), this.width, this.height);
   }
   else
   {
     context.drawImage(this.image,0+20*this.idleCurrentFrame,30*this.goingLeft, 20,30,Math.round(Viewport.x+this.x),Math.round(Viewport.y+this.y), this.width, this.height);
   }

   this.runningFromEnemy=0
 }

  getCenter() : Vector {
    return new Vector(this.x + this.width/2, this.y + this.height/2);
  }

  drawHurtZone(context) : void {
    context.fillStyle = '#FF0a00';
    context.beginPath();
    context.rect(this.hurtZonex + Viewport.x, this.hurtZoney + Viewport.y,this.hurtZoneWidth, this.hurtZoneHeight);
    context.closePath();
    context.fill();
  }

  drawKillZone(context) : void {
    context.fillStyle = '#0aDD00';
    context.beginPath();
    context.rect(this.killZonex + Viewport.x, this.killZoney + Viewport.y,this.killZoneWidth, this.killZoneHeight);
    context.closePath();
    context.fill();
  }
}
