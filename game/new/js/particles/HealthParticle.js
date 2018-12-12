class HealthParticle extends Particle {
    constructor(x, y, xSpeed, ySpeed, image, target, targetToHeal) {
        super(x, y, xSpeed, ySpeed, image);
        this.xAcc = 0;
        this.yAcc = 0;
        this.movingState = 0;
        this.lifetime = 20;
        this.target = target;
        this.targetToHeal = targetToHeal;
        this.xFriction = 1.085;
    }
    move() {
        super.move();
        if (this.shouldBeDeleted) {
            return;
        }
        if (this.movingState === 0) {
            this.xSpeed /= this.xFriction;
            this.ySpeed /= this.xFriction;
            if (Math.abs(this.xSpeed) < Math.random() && Math.abs(this.ySpeed) < Math.random()) {
                this.movingState = 1;
            }
        }
        else {
            let angle = Math.atan2(this.target.y + this.target.height / 2 - this.y, this.target.x + this.target.height / 2 - this.x);
            this.xAcc = Math.cos(angle);
            this.yAcc = Math.sin(angle);
            this.xSpeed += this.xAcc;
            this.ySpeed += this.yAcc;
            this.xSpeed = Helper.clamp(this.xSpeed, -8, 8);
            this.ySpeed = Helper.clamp(this.ySpeed, -8, 8);
            if (Helper.overlap(this.x, this.y, 2, 2, this.target.x, this.target.y, this.target.width, this.target.height)) {
                this.targetToHeal.hp += 0.5;
                this.targetToHeal.hp = Helper.clamp(this.targetToHeal.hp, 0, 100);
                this.shouldBeDeleted = true;
            }
        }
        this.x += this.xSpeed;
        this.y += this.ySpeed;
    }
}
