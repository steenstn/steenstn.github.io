class GlidingStrategy{
  constructor(public enemy, public currentLevel) {

  }
  move(enemy : Skull) {

    enemy.x+=enemy.speedx;
    var arrayPos=Math.floor((enemy.x+5)/Level.tileSize)+Math.floor((enemy.y+5)/Level.tileSize)*Level.width; // The position in the level array(Middle of the enemy at the moment)

    if(this.currentLevel[arrayPos].blocking==1) {
      enemy.direction=1-enemy.direction;
      enemy.speedx = -1*enemy.speedx;
    }
  }
}
