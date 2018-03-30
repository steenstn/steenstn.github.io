class Level {

  // The size of the level in tiles
  static readonly width = 200;
  static readonly height = 100;

  static readonly tileSize = 32;
  static currentLevel = new Array(Level.width*Level.height);

  constructor() {
  }

  static getBlockAt(x: number, y:number) {
    let index = Math.floor(x/Level.tileSize)+Math.floor(y/Level.tileSize)*Level.width;
    return Level.currentLevel[index];
  }

  static getIndexAt(x: number, y: number) : number {
    return Math.floor(x/Level.tileSize)+Math.floor(y/Level.tileSize)*Level.width;
  }
}
