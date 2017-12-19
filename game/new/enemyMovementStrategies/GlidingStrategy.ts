class GlidingStrategy {
  constructor(public enemy, public currentLevel) {

  }
  move() {

    this.enemy.x+=this.enemy.speedx;
    var arrayPos=Math.floor((this.enemy.x+5)/Level.tileSize)+Math.floor((this.enemy.y+5)/Level.tileSize)*Level.width; // The position in the level array(Middle of the enemy at the moment)

    if(this.currentLevel[arrayPos].blocking==1) {
      this.enemy.direction=1-this.enemy.direction;
      this.enemy.speedx = -1*this.enemy.speedx;
    }
  }
}
