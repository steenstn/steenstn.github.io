class MutantStrategy implements IEnemyMovementStrategy {
  private mutantWidth = 88;
  private mutantHeight = 36;
  private idleTimer = 60;
  private idle = false;
  constructor(public enemy, public currentLevel) {

  }

  move(enemy : Mutant) {
    if(!this.idle) {
      if(enemy.direction==1) {
  			enemy.x+=enemy.speedx;
      }	else {
  			enemy.x-=enemy.speedx;
      }
      enemy.idleAnimationCounter++;
      if(enemy.idleAnimationCounter > 4) {
        enemy.idleCurrentFrame = 1- enemy.idleCurrentFrame;
        enemy.idleAnimationCounter = 0;
      }
    } else {
      this.idleTimer--;
      if(this.idleTimer < 0) {
        this.idle = false;
      }
      enemy.idleAnimationCounter++;
      if(enemy.idleAnimationCounter > 10) {
        enemy.idleCurrentFrame = 1- enemy.idleCurrentFrame;
        enemy.idleAnimationCounter = 0;
      }
    }

    let enemyWidth = typeof enemy.width == 'number' ? enemy.width : this.mutantWidth;
    let enemyHeight = typeof enemy.height == 'number' ? enemy.height : this.mutantHeight;

		var arrayPos=Level.getBlockAt(enemy.x + 5, enemy.y + 5);
    var bottomArrayPos = Level.getBlockAt(enemy.x + enemyWidth / 2, enemy.y + enemyHeight);

    if(bottomArrayPos.type==".") {
      enemy.y++;
    }
		if(arrayPos.blocking==1 || arrayPos.type=="h")
			enemy.direction=1-enemy.direction;


		// Check one tile ahead and below, if it's empty, turn around
		if(enemy.direction==1) // Going right
			arrayPos=Level.getBlockAt(enemy.x + enemyWidth + 5, enemy.y + enemyHeight + 15);
		else
			arrayPos=Level.getBlockAt(enemy.x - 5, enemy.y + enemyHeight + 15);

    if(arrayPos.blocking==0) {
      enemy.direction=1-enemy.direction;
    }
    if(!this.idle && Math.random() > 0.995) {
      this.idleTimer = 60 + Math.random()*20;
      this.idle = true;
    }
	}
}
