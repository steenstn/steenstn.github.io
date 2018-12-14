class BossStrategy{
  private chargingCounter = 60;
  private reloadCounter = 500;
  private shootingCounter = 100;
  public static readonly CHARGING = 0;
  public static readonly SHOOTING = 1;
  public static readonly JUMPING = 2;
  public currentState : number;
  constructor(public enemy){
    this.currentState = BossStrategy.JUMPING;
  }

  getCurrentState() {
    return this.currentState;
  }
  move(enemy : Boss) {
    enemy.breakingBlock = false;
    if(this.currentState === BossStrategy.JUMPING) {
      this.reloadCounter--;
      let offsetx = enemy.speedx > 0 ? enemy.width + 5 : -5;
      let offsety = enemy.height;

      enemy.speedy+=WorldConstants.gravity;
      if(Level.getBlockAt(enemy.x+offsetx, enemy.y) != "undefined" && Level.getBlockAt(enemy.x+offsetx, enemy.y).blocking===true || Level.getBlockAt(enemy.x+offsetx, enemy.y).type=='h') {
        enemy.speedx*=-1;
        enemy.speedy=-4;
      }
      if(Level.getBlockAt(enemy.x+enemy.width/2, enemy.y+offsety) != "undefined" && Level.getBlockAt(enemy.x+enemy.width/2, enemy.y+offsety).blocking===true) {
        enemy.speedy=-8;
        if(Math.random() > 0.5) {
            Level.currentLevel[Level.getIndexAt(enemy.x+enemy.width/2, enemy.y+offsety)] = LevelTile.newFromCharacter('.');
            enemy.breakingBlock = true;
        } else if(this.reloadCounter < 0 && Math.random() > 0.3){
          this.currentState = enemy.currentState = BossStrategy.CHARGING;
        }
      }
      if(this.reloadCounter < -200) {
        this.currentState = enemy.currentState = BossStrategy.CHARGING;
      }

      enemy.x+=enemy.speedx;
      enemy.y+=enemy.speedy;
    }
    else if(this.currentState === BossStrategy.CHARGING) {
      this.chargingCounter--;
      enemy.speedy = -0.5;
      if(this.chargingCounter <= 0) {
        this.chargingCounter = 60;
        this.currentState = enemy.currentState = BossStrategy.SHOOTING;
      }
      enemy.y+=enemy.speedy;
    }
    else if(this.currentState === BossStrategy.SHOOTING) {
      this.shootingCounter--;
      enemy.firing = true;
      if(this.shootingCounter <= 0) {
        enemy.speedy=-8;
        this.currentState = enemy.currentState = BossStrategy.JUMPING;
        this.reloadCounter = 500;
        this.shootingCounter = 100;
        enemy.firing = false;
      }

    }
  }
}
