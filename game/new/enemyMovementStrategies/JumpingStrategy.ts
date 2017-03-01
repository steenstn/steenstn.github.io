class JumpingStrategy {
  constructor(public enemy, public currentLevel, public maxSpeedy, public gravity) {

  }

  move() {
		if(this.enemy.direction==1)
			this.enemy.x+=3.5;
		else
			this.enemy.x-=3.5;

		var arrayPos=Math.floor((this.enemy.x+5)/Level.tileSize)+Math.floor((this.enemy.y+5)/Level.tileSize)*Level.width; // The position in the level array(Middle of the enemy at the moment)

		if(this.currentLevel[arrayPos].blocking==1 || this.currentLevel[arrayPos].type=="h")
			this.enemy.direction=1-this.enemy.direction;


		// Check one tile ahead and below, if it's empty, jump
		if(this.enemy.jumping==0)
		{
			if(this.enemy.direction==1) // Going right
				arrayPos=Math.floor((this.enemy.x+15)/Level.tileSize)+Math.floor((this.enemy.y+15)/Level.tileSize)*Level.width; // The position in the level array(Middle of the enemy at the moment)
			else
				arrayPos=Math.floor((this.enemy.x-15)/Level.tileSize)+Math.floor((this.enemy.y+15)/Level.tileSize)*Level.width; // The position in the level array(Middle of the enemy at the moment)

			if(this.currentLevel[arrayPos].blocking==0 || Math.random()>0.98) // Check for holes in the ground
			{
				this.enemy.jumping=1;
				this.enemy.speedy=-5;
			}
		}
		arrayPos=Math.floor((this.enemy.x+5)/Level.tileSize)+Math.floor((this.enemy.y)/Level.tileSize)*Level.width; // The position in the level array(Middle of the enemy at the moment)

		if(this.enemy.speedy<this.maxSpeedy)
			this.enemy.speedy+=this.gravity;

		this.enemy.y+=this.enemy.speedy;
		arrayPos=Math.floor((this.enemy.x+5)/Level.tileSize)+Math.floor((this.enemy.y+5)/Level.tileSize)*Level.width; // The position in the level array(Middle of the enemy at the moment)

		if(this.currentLevel[arrayPos].blocking==1) {
			this.enemy.y=this.enemy.oldy;
			this.enemy.jumping=0;
		}
	}
}
