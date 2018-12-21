class PlayerHealthBar implements GUIRenderable {
    private counter : number;
    private player : Player;
    
    constructor(player : Player) {
        this.counter = 0;
        this.player = player;
    }

    render = (context) => {
        this.counter++
        var g = this.player.hp*2 + 29;
        var r = 250 - this.player.hp*2;
        var b = 28;
        context.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
        if(this.player.hp>20) {
            context.fillRect (Viewport.width/2-50,16,Math.round(this.player.hp),8);
        } else {
            if(this.counter%40>20) {
                context.fillRect (Viewport.width/2-50,16,Math.round(this.player.hp),8);
            }
        }
    }
}