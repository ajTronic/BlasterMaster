class shooter {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.hitCount = null;
  }

  draw() {
    if (!this.hitCount) {
      image(spaceShip, this.x, this.y, 50, 50);
    }
  }
}