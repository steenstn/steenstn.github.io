var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var BloodParticle = (function (_super) {
    __extends(BloodParticle, _super);
    function BloodParticle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BloodParticle.prototype.move = function () {
        _super.prototype.move.call(this);
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
    };
    BloodParticle.ACTIVE = 1;
    BloodParticle.INACTIVE = 0;
    BloodParticle.DRIPPING = 2;
    return BloodParticle;
}(Particle));
