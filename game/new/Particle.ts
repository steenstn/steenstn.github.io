class Particle {
  x : number;
  y : number;
  xSpeed : number;
  ySpeed : number;
  image : any;
  state : number;
  xFriction : number;


  constructor(x, y, xSpeed, ySpeed, image) {
    this.x = x;
    this.y = y;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    this.image = image;

    this.xFriction = 1.1;
  }

  render(context) {
    context.drawImage(this.image, this.x + Viewport.x, this.y + Viewport.y);
  }
}
