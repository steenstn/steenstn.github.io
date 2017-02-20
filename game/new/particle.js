function Particle(x, y, xSpeed, ySpeed, image) {
  this.x = x;
  this.y = y;
  this.xSpeed = xSpeed;
  this.ySpeed = ySpeed;
  this.active = true;
  this.xFriction = 1.1;
  this.image = image;
  this.move = function() {

    if(this.active) {
      this.x+=this.xSpeed;
      this.y+=this.ySpeed;
      this.ySpeed+=0.3;
      this.xSpeed/=this.xFriction;
    }
  }

  this.render = function(ctx, screenx, screeny) {
    ctx.drawImage(this.image, this.x+screenx, this.y+screeny);
    }

}
