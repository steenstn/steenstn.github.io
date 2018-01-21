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
var Skull = (function (_super) {
    __extends(Skull, _super);
    function Skull(enemy, currentLevel) {
        var _this = _super.call(this, new GlidingStrategy(enemy, currentLevel)) || this;
        _this.speedx = 2;
        _this.x = enemy.x;
        _this.y = enemy.y;
        _this.oldx = enemy.oldx;
        _this.oldy = enemy.oldy;
        _this.direction = enemy.direction;
        return _this;
    }
    Skull.prototype.draw = function (context) {
        context.drawImage(Skull.image, Viewport.x + this.x, Viewport.y + this.y);
    };
    return Skull;
}(Enemy));
Skull.image = new Image();
