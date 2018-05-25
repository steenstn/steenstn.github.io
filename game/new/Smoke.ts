class Smoke {
  static image = new Image();

  private animationTimer: number;
  private numFrames = 7
  private done : boolean;

  constructor(private x: number, private y: number,private mode: number) {
    Smoke.image.src="smoke.png";
    this.animationTimer = 0;
    this.done = false;
  }

  isDone() : boolean {
    return this.done;
  }

  draw(context: any) {
    if(!this.isDone()) {
      if(this.mode === 0) {
        context.drawImage(Smoke.image, Math.floor(this.animationTimer)*20, 0, 20, 10, Math.round(Viewport.x + this.x), Math.round(Viewport.y + this.y), 20, 10);
      } else if(this.mode === 1) {
        context.drawImage(Smoke.image, Math.floor(this.animationTimer)*20, 0, 10, 10, Math.round(Viewport.x + this.x), Math.round(Viewport.y + this.y), 10, 10);
      } else if(this.mode === 2) {
        context.drawImage(Smoke.image, Math.floor(this.animationTimer)*20+10, 0, 10, 10, Math.round(Viewport.x + this.x), Math.round(Viewport.y + this.y), 10, 10);
      }
      this.animationTimer+=0.3;
      if(this.animationTimer>this.numFrames) {
        this.done = true;
      }
    }
  }
}
