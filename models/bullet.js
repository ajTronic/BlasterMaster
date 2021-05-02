class bullet {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 0.6;
    this.grav = 1;
    this.exists = true;
  }

  draw() {
    if (this.exists === true) {
      fill(255, 200, 50)
      circle(this.x + 15, this.y, 5);
      circle(this.x + 35, this.y, 5);
      circle(this.x + 25, this.y, 10);
      this.y -= this.speed;
      this.speed -= this.grav;
      this.grav -= 0.15;
    }
  }
}