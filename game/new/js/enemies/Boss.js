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
var Boss = (function (_super) {
    __extends(Boss, _super);
    function Boss(enemy) {
        var _this = _super.call(this, new BossStrategy(enemy)) || this;
        _this.speedx = 4.5;
        _this.speedy = 0;
        _this.width = 60;
        _this.height = 60;
        _this.type = "boss";
        _this.currentState = BossStrategy.JUMPING;
        _this.maxHp = 30;
        _this.breakingBlock = false;
        _this.x = enemy.x;
        _this.y = enemy.y;
        _this.hp = _this.maxHp;
        _this.oldHp = _this.hp;
        Boss.image.src = "deloused.png";
        _this.hurtAnimationCounter = 10;
        _this.firing = false;
        return _this;
    }
    Boss.prototype.draw = function (context) {
        var offsetx;
        if (this.hp !== this.oldHp) {
            this.hurtAnimationCounter = 10;
        }
        if (this.hurtAnimationCounter > 8) {
            offsetx = 180;
        }
        else if (this.hurtAnimationCounter > 0 && !this.firing) {
            offsetx = 120;
        }
        else if (this.currentState === BossStrategy.SHOOTING) {
            offsetx = 0;
        }
        else {
            offsetx = 60;
        }
        var offsety = this.speedx > 0 ? 1 : 0;
        if (this.firing) {
            var gradient = this.speedx > 0 ? context.createLinearGradient(Viewport.x + this.x, 0, Viewport.width, 0) : context.createLinearGradient(Viewport.x + this.x, 0, 0, 0);
            gradient.addColorStop(0, "white");
            gradient.addColorStop(1, "rgba(200,200,50,0.5)");
            context.fillStyle = gradient;
            var endx = this.speedx > 0 ? this.x + Viewport.x + Viewport.width : this.x + Viewport.x - Viewport.width;
            context.beginPath();
            context.moveTo(Viewport.x + this.x + this.width / 2, Viewport.y + this.y + 47);
            context.lineTo(endx, Viewport.y + this.y - 150);
            context.lineTo(endx, Viewport.y + this.y + 150);
            context.lineTo(Viewport.x + this.x + this.width / 2, Viewport.y + this.y + 47);
            context.closePath();
            context.fill();
        }
        context.drawImage(Boss.image, offsetx, 60 * offsety, 60, 60, Math.round(this.x + Viewport.x), Math.round(this.y + Viewport.y), 60, 60);
        this.hurtAnimationCounter--;
        this.oldHp = this.hp;
    };
    Boss.image = new Image();
    return Boss;
}(Enemy));
