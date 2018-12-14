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
var Mutant = (function (_super) {
    __extends(Mutant, _super);
    function Mutant(enemy) {
        var _this = _super.call(this, new MutantStrategy(enemy)) || this;
        _this.speedx = 3;
        _this.width = 80;
        _this.height = 36;
        _this.offsetx = 5;
        _this.offsety = 5;
        _this.idleAnimationCounter = 0;
        _this.idleCurrentFrame = 0;
        _this.x = enemy.x;
        _this.y = enemy.y;
        _this.oldx = enemy.oldx;
        _this.oldy = enemy.oldy;
        _this.direction = enemy.direction;
        Mutant.image.src = "mutant.png";
        Mutant.image.width = 88;
        Mutant.image.height = 36;
        return _this;
    }
    Mutant.prototype.draw = function (context) {
        context.drawImage(Mutant.image, 88 * this.idleCurrentFrame, 0, 88, 36, Math.round(Viewport.x + this.x), Math.round(Viewport.y + this.y), 88, 36);
    };
    Mutant.image = new Image();
    return Mutant;
}(Enemy));
