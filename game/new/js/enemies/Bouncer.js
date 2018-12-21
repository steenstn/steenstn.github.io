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
var Bouncer = (function (_super) {
    __extends(Bouncer, _super);
    function Bouncer(enemy) {
        var _this = _super.call(this, new FlyingStrategy(enemy)) || this;
        _this.currentFrame = 0;
        _this.x = enemy.x;
        _this.y = enemy.y;
        _this.oldx = enemy.oldx;
        _this.oldy = enemy.oldy;
        _this.speedx = enemy.speedx;
        _this.speedy = enemy.speedy;
        Bouncer.image.src = "images/hand.png";
        return _this;
    }
    Bouncer.prototype.draw = function (context) {
        var offsety;
        if (this.speedx < 0 && this.speedy < 0) {
            offsety = 0;
        }
        else if (this.speedx < 0 && this.speedy > 0) {
            offsety = 1;
        }
        else if (this.speedx > 0 && this.speedy < 0) {
            offsety = 2;
        }
        else if (this.speedx > 0 && this.speedy > 0) {
            offsety = 3;
        }
        context.drawImage(Bouncer.image, 0 + 20 * this.currentFrame, 20 * offsety, 20, 20, Math.round(Viewport.x + this.x), Math.round(Viewport.y + this.y), 20, 20);
    };
    Bouncer.image = new Image();
    return Bouncer;
}(Enemy));
