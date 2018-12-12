class BloodParticle extends Particle {
    move() {
        super.move();
        if (this.shouldBeDeleted) {
            return;
        }
        if (this.state === BloodParticle.ACTIVE) {
            this.x += this.xSpeed;
            this.y += this.ySpeed;
            this.ySpeed += 0.3;
            this.xSpeed /= this.xFriction;
        }
        else if (this.state === BloodParticle.DRIPPING) {
            this.ySpeed = 0.015;
            this.xSpeed = 0;
            this.y += this.ySpeed;
        }
        else {
            this.x = Math.round(this.x);
            this.y = Math.round(this.y);
        }
    }
}
BloodParticle.ACTIVE = 1;
BloodParticle.INACTIVE = 0;
BloodParticle.DRIPPING = 2;
