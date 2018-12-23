class BossHealthBar implements GUIRenderable {
    private getValueMethod : () => number;
    private oldValue : number;
    private barSize = 4;
    private barMaxValue : number;

    constructor(getValueMethod : () => number) {
        this.getValueMethod = getValueMethod;
        this.oldValue = this.getValueMethod();
        this.barMaxValue = this.oldValue;
    }

    render = (context) => {
        let value = this.getValueMethod();

        if(!value || value < 1) {
            return;
        }
        context.fillStyle = value !== this.oldValue ? "#ffffff" : "#fa0000";

        context.fillRect(Viewport.width-50, Viewport.height-this.barSize*value-10, 30, this.barSize*value);

        context.strokeStyle = "#ffffff";
        context.strokeRect(Viewport.width-50, Viewport.height-this.barSize*this.barMaxValue-10, 30, this.barSize*this.barMaxValue);
        this.oldValue = value;
    }
}