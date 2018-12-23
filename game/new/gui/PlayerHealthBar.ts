class PlayerHealthBar implements GUIRenderable {
    private counter : number;
    private getValueMethod : () => number;
    
    constructor(getValueMethod : () => number) {
        this.counter = 0;
        this.getValueMethod = getValueMethod;
    }

    render = (context) => {
        let value = this.getValueMethod();
        this.counter++
        var g = value*2 + 29;
        var r = 250 - value*2;
        var b = 28;
        context.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
        if(value>20) {
            context.fillRect (Viewport.width/2-50,16,Math.round(value),8);
        } else {
            if(this.counter%40>20) {
                context.fillRect (Viewport.width/2-50,16,Math.round(value),8);
            }
        }
    }
}