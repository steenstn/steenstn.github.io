class JumpingStrategy  {
  constructor(public enemy, public currentLevel, public maxSpeedy, public gravity) {

  }

  move() {
		if(this.enemy.direction==1)
			this.enemy.x+=this.enemy.speedx;
		else
			this.enemy.x-=this.enemy.speedx;

		var arrayPos=Math.floor((this.enemy.x+5)/Level.tileSize)+Math.floor((this.enemy.y+5)/Level.tileSize)*Level.width; // The position in the level array(Middle of the enemy at the moment)

		if(this.currentLevel[arrayPos].blocking==1 || this.currentLevel[arrayPos].type=="h")
			this.enemy.direction=1-this.enemy.direction;


		// Check one tile ahead and below, if it's empty, jump
		if(this.enemy.jumping==0)
		{
			if(this.enemy.direction==1) // Going right
				arrayPos=Math.floor((this.enemy.x+15)/Level.tileSize)+Math.floor((this.enemy.y+15)/Level.tileSize)*Level.width;
			else
				arrayPos=Math.floor((this.enemy.x-15)/Level.tileSize)+Math.floor((this.enemy.y+15)/Level.tileSize)*Level.width;

      let shouldJump = this.currentLevel[arrayPos].blocking==0 || Math.random()>0.98;
			if(shouldJump)
			{
				this.enemy.jumping=1;
				this.enemy.speedy=-5;
			}
		}
		arrayPos=Math.floor((this.enemy.x+5)/Level.tileSize)+Math.floor((this.enemy.y)/Level.tileSize)*Level.width;

		if(this.enemy.speedy<this.maxSpeedy)
			this.enemy.speedy+=this.gravity;

		this.enemy.y+=this.enemy.speedy;
		arrayPos=Math.floor((this.enemy.x+5)/Level.tileSize)+Math.floor((this.enemy.y+5)/Level.tileSize)*Level.width;

		if(this.currentLevel[arrayPos].blocking==1) {
			this.enemy.y=this.enemy.oldy;
      if(this.enemy.speedy < 0) {
        this.enemy.speedy = 0;
      } else {
			     this.enemy.jumping=0;
      }
		}
	}
}
