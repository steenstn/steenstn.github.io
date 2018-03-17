class Bedlam {
  private image = new Image();
  private x : number;
  private y : number;
  private targetPlayer : any;
  private animCounter = 0;
  private currentFrame = 0;
  constructor() {
    this.x = -Viewport.x-50;
    this.y = -Viewport.y+118;
      this.image.src = "bedlam.png";
  }

  move(players: any[]) {
    this.animCounter++;
    if(this.animCounter>5) {
      this.animCounter = 0;
      this.currentFrame = 1 - this.currentFrame;
    }
    this.x+=3;
    for(let i = 0; i < players.length; i++) {
      if(!players[i].inBucket && Math.abs(this.x - players[i].x) < 40) {
        players[i].inBucket = true;
      }
      if(players[i].inBucket) {
        players[i].x = this.x+27+18*i;
        players[i].y = this.y-15;
      }
    }
  }

  isComplete() : boolean {
    return this.x > -Viewport.x+Viewport.width+60;
  }

  render(context) {
    context.drawImage(this.image, 0+90*this.currentFrame,0, 90, 183, Math.round(this.x+Viewport.x), Math.round(this.y+Viewport.y), 90, 183);

  }
}
