class Level {

  // The size of the level in tiles
  static readonly width = 200;
  static readonly height = 100;

  static readonly tileSize = 32;
  static currentLevel = new Array(Level.width*Level.height);

  constructor() {
  }
}
