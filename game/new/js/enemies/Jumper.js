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
var Jumper = (function (_super) {
    __extends(Jumper, _super);
    function Jumper(enemy, currentLevel) {
        var _this = _super.call(this, new JumpingStrategy(enemy, currentLevel)) || this;
        _this.speedx = 3.5;
        _this.speedy = 0;
        _this.jumping = 1;
        _this.animationCounter = 0;
        _this.currentFrame = 0;
        _this.x = enemy.x;
        _this.y = enemy.y;
        _this.oldx = enemy.oldx;
        _this.oldy = enemy.oldy;
        _this.direction = enemy.direction;
        return _this;
    }
    Jumper.prototype.draw = function (context) {
        context.drawImage(Jumper.image, 16 * this.currentFrame, 30 - 30 * this.direction, 16, 30, Viewport.x + this.x, Viewport.y + this.y, 16, 30);
    };
    return Jumper;
}(Enemy));
Jumper.image = new Image();
