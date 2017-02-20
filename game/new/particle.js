function Particle(x, y, xSpeed, ySpeed, image) {
  var ACTIVE = 1;
  var INACTIVE = 0;
  var DRIPPING = 2;
  this.x = x;
  this.y = y;
  this.xSpeed = xSpeed;
  this.ySpeed = ySpeed;

  this.state = ACTIVE;
  this.xFriction = 1.1;
  this.image = image;
  this.move = function() {

    if(this.state === ACTIVE) {
      this.x+=this.xSpeed;
      this.y+=this.ySpeed;
      this.ySpeed+=0.3;
      this.xSpeed/=this.xFriction;
    } else if (this.state === DRIPPING) {
      this.ySpeed = 0.02;
      this.xSpeed = 0;
      this.y+=this.ySpeed;
    }
  }

  this.render = function(ctx, screenx, screeny) {
    ctx.drawImage(this.image, this.x+screenx, this.y+screeny);
    }

}
