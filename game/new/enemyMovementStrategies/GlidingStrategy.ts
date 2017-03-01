class GlidingStrategy {
  constructor(public enemy, public tilesize, public currentLevel) {

  }
  move() {
    if(this.enemy.direction===1) {
      this.enemy.x+=2;
    } else {
      this.enemy.x-=2;
    }

    var arrayPos=Math.floor((this.enemy.x+5)/this.tilesize)+Math.floor((this.enemy.y+5)/this.tilesize)*Level.width; // The position in the level array(Middle of the enemy at the moment)

    if(this.currentLevel[arrayPos].blocking==1) {
      this.enemy.direction=1-this.enemy.direction;
    }
  }
}
