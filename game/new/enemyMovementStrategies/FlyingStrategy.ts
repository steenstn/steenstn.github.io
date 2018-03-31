class FlyingStrategy{

  private animationCounter = 0;
  constructor(public enemy, public currentLevel){
  }

  move(enemy : Bouncer) {
    this.animationCounter++;
    if(this.animationCounter%8===0) {
      enemy.currentFrame = 1-enemy.currentFrame;
      this.animationCounter=0;
    }
    var xOffset = 0;
    var yOffset = 15;

    if(enemy.speedx>0) // Going right
		{
			xOffset = 20;
		}	else if(enemy.speedx<0) {// Going left
			xOffset = 0;
		}

    var arrayPos=Level.getBlockAt(enemy.x + xOffset, enemy.y + yOffset);
    if(arrayPos.blocking==1 || arrayPos.type=="h" )
    {
      enemy.speedx*=-1;
    }

    xOffset = 10;

		if(enemy.speedy<0) // Going up up up
		{
			yOffset = -1;
		}
		else if(enemy.speedy>0) // Going down
		{
			yOffset = 31;
		}

    arrayPos=Level.getBlockAt(enemy.x + xOffset, enemy.y + yOffset);

		if(arrayPos.blocking==1 || arrayPos.type=="h" )
		{
			enemy.speedy*=-1;
		}

		enemy.x+=enemy.speedx;
		enemy.y+=enemy.speedy;
  }
}
