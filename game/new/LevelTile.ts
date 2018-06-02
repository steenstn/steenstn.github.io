class LevelTile {
  readonly character : string;
  readonly blocking : boolean;
  readonly drawingOffsetx : number;
  readonly drawingOffsety : number;

  private constructor(character : string, blocking : boolean, drawingOffsetx : number, drawingOffsety : number) {
    this.character = character;
    this.blocking = blocking;
    this.drawingOffsetx = drawingOffsetx;
    this.drawingOffsety = drawingOffsety;
  }

  static newFromCharacter(character : string) {
    switch(character) {
      case ".": // Empty tile
        return new LevelTile(".", false, 0, 0);
      case "1": // Ground tile
        return new LevelTile("1", true, 0, 0);
      case "!": // Ground tile secret passage
        return new LevelTile("!", false, 0, 0);
      case "2": // Ground tile
        return new LevelTile("2", true, 32, 0);
      case "@": // Ground tile secret passage
        return new LevelTile("@", false, 32, 0);
      case "3": // Ground tile
        return new LevelTile("3", true, 64, 0);
      case "#": // Ground tile secret passage
        return new LevelTile("#", false, 64, 0);
      case "4": // Ground tile
        return new LevelTile("4", true, 96, 0);
      case "$": // Ground tile secret passage
        return new LevelTile("$", false, 96, 0);
      case "5": // Ground tile
        return new LevelTile("5", true, 0, 32);
      case "%": // Ground tile secret passage
        return new LevelTile("%", false, 0, 32);
      case "6": // Ground tile
        return new LevelTile("6", true, 32, 32);
      case "7": // Ground tile
        return new LevelTile("7", true, 64, 32);
      case "8": // Ground tile
        return new LevelTile("8", true, 96, 32);
      case "9": // Ground tile
        return new LevelTile("9", true, 0, 64);
      case "0": // Ground tile
        return new LevelTile("0", true, 32, 64);
      case "a": // Ground tile
        return new LevelTile("a", true, 64, 64);
      case "b": // Ground tile
        return new LevelTile("b", true, 96, 64);
      case "c": // Ground tile
        return new LevelTile("c", true, 0, 96);
      case "d": // Ground tile
        return new LevelTile("d", true, 32, 96);
      case "e": // Ground tile
        return new LevelTile("e", true, 64, 96);
      case "f": // Ground tile
        return new LevelTile("f", true, 96, 96);
      case "g": // Ice ground tile
        return new LevelTile("g", true, 0, 128);
      case "h": // Tree
        return new LevelTile("h", false, 32, 128);
      case "i":
        return new LevelTile("i", true, 64, 128);
      case "j":
        return new LevelTile("j", true, 96, 128);
      case "k":
        return new LevelTile("k", false, 0, 160);
      case "l":
        return new LevelTile("l", false, 96, 160);
      case "m":
        return new LevelTile("m", false, 32, 192);
      case "n":
        return new LevelTile("n", false, 64, 192);
      case "o":
        return new LevelTile("o", false, 0, 192);
      case "p": // 3Cant
        return new LevelTile("p", false, 96, 224);
      case "q": // Tryckbar
        return new LevelTile("q", false, 64, 224);
      case "s": // Cash
        return new LevelTile("s", false, 64, 128);
    }
  }
}
