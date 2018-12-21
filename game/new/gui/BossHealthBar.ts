class BossHealthBar implements GUIRenderable {
    private boss : Boss;
    private oldHp : number;
    private barSize = 4;
    constructor(boss : Boss) {
        this.boss = boss;
        this.oldHp = boss.hp;
    }

    render = (context) => {
        context.fillStyle = this.boss.hp !== this.oldHp ? "#ffffff" : "#fa0000";

        context.fillRect(Viewport.width-50, Viewport.height-this.barSize*this.boss.hp-10, 30, this.barSize*this.boss.hp);

        context.strokeStyle = "#ffffff";
        context.strokeRect(Viewport.width-50, Viewport.height-this.barSize*this.boss.maxHp-10, 30, this.barSize*this.boss.maxHp);
        this.oldHp = this.boss.hp;
    }
}