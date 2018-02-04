var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var HealthParticle = (function (_super) {
    __extends(HealthParticle, _super);
    function HealthParticle(x, y, xSpeed, ySpeed, image, target, targetToHeal) {
        var _this = _super.call(this, x, y, xSpeed, ySpeed, image) || this;
        _this.xAcc = 0;
        _this.yAcc = 0;
        _this.movingState = 0;
        _this.lifetime = 20;
        _this.target = target;
        _this.targetToHeal = targetToHeal;
        _this.xFriction = 1.085;
        return _this;
    }
    HealthParticle.prototype.move = function () {
        _super.prototype.move.call(this);
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
            var angle = Math.atan2(this.target.y + this.target.height / 2 - this.y, this.target.x + this.target.height / 2 - this.x);
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
    };
    return HealthParticle;
}(Particle));
