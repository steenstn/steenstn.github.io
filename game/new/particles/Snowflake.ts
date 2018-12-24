class Snowflake {
    private x;
    private y;
    private speedx;
    private speedy;
    private angle;
    constructor() {
        this.x = Math.random()*Viewport.width;
        this.y = Math.random()*Viewport.height;
        this.angle = Math.random()*360;
        this.speedx = Math.sin(this.angle);
        this.speedy = Math.random()*1.5;
    }

    move() {
        this.angle+=0.05;
        this.speedx = Math.sin(this.angle);
        this.x+=this.speedx;
        this.y+=this.speedy;
        if(this.y > Viewport.height) {
            this.y = -3;
            this.x = Math.random()*Viewport.width;
        }
    }

    render(context) {
        context.fillStyle = "#FFF";
        context.fillRect(Math.round(this.x), Math.round(this.y), 1, 1);
    }
}