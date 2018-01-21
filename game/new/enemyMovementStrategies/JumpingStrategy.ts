class JumpingStrategy  {
  constructor(public enemy, public currentLevel) {

  }

  move(enemy : Jumper) {
		if(enemy.direction==1)
			enemy.x+=enemy.speedx;
		else
			enemy.x-=enemy.speedx;

		var arrayPos=Math.floor((enemy.x+5)/Level.tileSize)+Math.floor((enemy.y+5)/Level.tileSize)*Level.width; // The position in the level array(Middle of the enemy at the moment)

		if(this.currentLevel[arrayPos].blocking==1 || this.currentLevel[arrayPos].type=="h")
			enemy.direction=1-enemy.direction;


		// Check one tile ahead and below, if it's empty, jump
		if(enemy.jumping==0)
		{
			if(enemy.direction==1) // Going right
				arrayPos=Math.floor((enemy.x+15)/Level.tileSize)+Math.floor((enemy.y+15)/Level.tileSize)*Level.width;
			else
				arrayPos=Math.floor((enemy.x-15)/Level.tileSize)+Math.floor((enemy.y+15)/Level.tileSize)*Level.width;

      let shouldJump = this.currentLevel[arrayPos].blocking==0 || Math.random()>0.98;
			if(shouldJump)
			{
				enemy.jumping=1;
				enemy.speedy=-5;
			}
		}
		arrayPos=Math.floor((enemy.x+5)/Level.tileSize)+Math.floor((enemy.y)/Level.tileSize)*Level.width;

		if(enemy.speedy<WorldConstants.maxSpeedy)
			enemy.speedy+=WorldConstants.gravity;

		enemy.y+=enemy.speedy;
		arrayPos=Math.floor((enemy.x+5)/Level.tileSize)+Math.floor((enemy.y+5)/Level.tileSize)*Level.width;

		if(this.currentLevel[arrayPos].blocking==1) {
			enemy.y=enemy.oldy;
      if(enemy.speedy < 0) {
        enemy.speedy = 0;
      } else {
			     enemy.jumping=0;
      }
		}
	}
}
