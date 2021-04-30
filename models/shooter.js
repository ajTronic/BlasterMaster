class shooter {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.hitCount = null;
  }

  draw() {
    image(spaceShip, this.x, this.y, 50, 50);
  }
}