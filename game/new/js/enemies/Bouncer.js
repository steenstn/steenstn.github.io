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
var Bouncer = (function (_super) {
    __extends(Bouncer, _super);
    function Bouncer(enemy, currentLevel) {
        var _this = _super.call(this, new FlyingStrategy(enemy, currentLevel)) || this;
        _this.x = enemy.x;
        _this.y = enemy.y;
        _this.oldx = enemy.oldx;
        _this.oldy = enemy.oldy;
        _this.speedx = enemy.speedx;
        _this.speedy = enemy.speedy;
        return _this;
    }
    Bouncer.prototype.draw = function (context) {
        context.drawImage(Bouncer.image, 67, 0, 17, 30, Viewport.x + this.x, Viewport.y + this.y, 17, 30);
    };
    return Bouncer;
}(Enemy));
Bouncer.image = new Image();
