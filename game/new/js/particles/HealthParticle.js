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
var HealthParticle = (function (_super) {
    __extends(HealthParticle, _super);
    function HealthParticle(x, y, xSpeed, ySpeed, image, target, targetToHeal) {
        var _this = _super.call(this, x, y, xSpeed, ySpeed, image) || this;
        _this.xAcc = 0;
        _this.yAcc = 0;
        _this.movingState = 0;
        _this.trailLength = 3;
        _this.target = target;
        _this.targetToHeal = targetToHeal;
        _this.xFriction = 1.085;
        _this.oldPosition = [];
        for (var i = 0; i < _this.trailLength; i++) {
            _this.oldPosition.push(new Vector(x, y));
        }
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
        for (var i = this.oldPosition.length - 1; i > 0; i--) {
            this.oldPosition[i] = new Vector(this.oldPosition[i - 1].x, this.oldPosition[i - 1].y);
        }
        this.oldPosition[0] = new Vector(this.x, this.y);
        this.x += this.xSpeed;
        this.y += this.ySpeed;
    };
    HealthParticle.prototype.render = function (context) {
        var _this = this;
        _super.prototype.render.call(this, context);
        context.beginPath();
        context.moveTo(Math.round(this.x + Viewport.x), Math.round(this.y + Viewport.y));
        var oldLineWidth = context.lineWidth;
        context.lineWidth = 2;
        this.oldPosition.forEach(function (p, index) {
            var r = Math.floor(Math.random() * 255);
            context.strokeStyle = "rgba(" + r + ",255,80," + index / (_this.oldPosition.length * 2) + ")";
            context.lineTo(Math.round(p.x + Viewport.x), Math.round(p.y + Viewport.y));
            context.stroke();
        });
        context.lineWidth = oldLineWidth;
    };
    return HealthParticle;
}(Particle));
