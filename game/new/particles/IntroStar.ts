class IntroStar {
    private x : number;
    private y : number;
    private speedx : number;
    private speedy : number;

    constructor() {
        this.x = 320;
        this.y = 80;
        let randomAngle = Math.random()*360;
        this.speedx = Math.cos(randomAngle) * Math.random()*5;
        this.speedy = Math.sin(randomAngle) * Math.random()*5;
    }

    move() {
        this.x+=this.speedx;
        this.y+=this.speedy;
        let starIsOutOfBounds = this.x < 0
        || this.y < 0
        || this.x > Viewport.width
        || this.y > Viewport.height;
        if(starIsOutOfBounds) {
          this.x = 320;
          this.y = 80;
        }
    }

    render(context) {
        context.fillRect(Math.round(this.x),Math.round(this.y), 2, 2 );
    }
}