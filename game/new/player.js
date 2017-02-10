function Player(x, y, image) {
	this.x = x;
	this.y = y;
	this.oldx = x;
	this.oldy = y;
	this.width = 10;
	this.height = 15;
	this.hp = 100;
	this.dead = 0;
	
	// Zone that kills enemies
	this.killZonex = x;
	this.killZoney = y + this.height - 5;
	this.killZoneWidth = this.width;
	this.killZoneHeight = 5;
	
	// Zone that hurts player
	this.hurtZonex = this.x - 2;
	this.hurtZoney = this.y + this.height;
	this.hurtZoneWidth = this.width;
	this.hurtZoneHeight = 15;
	
	this.currentFrame = 0;
	this.goingLeft = 0;
	this.speedx = 0;
	this.speedy = 0;
	this.jumping = 0;
	
	this.keyUp = 0;
	this.keyLeft = 0;
	this.keyRight = 0;
	
	this.image = image;
}