class Smoke {
  static image = new Image();

  private animationTimer: number;
  private numFrames = 7
  private done : boolean;
  constructor(private x: number, private y: number) {
    Smoke.image.src="smoke.png";
    this.animationTimer = 0;
    this.done = false;
  }

  isDone() : boolean {
    return this.done;
  }

  draw(context: any) {
    if(!this.done) {
      context.drawImage(Smoke.image, this.animationTimer*20, 0, 20, 10, Math.round(Viewport.x + this.x), Math.round(Viewport.y + this.y), 20, 10);
      this.animationTimer++;
      if(this.animationTimer>this.numFrames) {
        this.done = true;
      }
    }
  }
}
