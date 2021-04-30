class enemy {
    constructor(x, size, vel) {
        this.x = x;
        this.y = (-size) * 2;
        this.vel = vel;
        this.exists = true;
        this.hidden = false;
        this.hitCount = null;
    }

    move() {
        this.y += this.vel;
    }

    draw() {
        if(!this.hidden){
            image(enemySpaceShip, this.x, this.y, 50, 50);
        }
    }

    hide() {
      this.vel = 0;
      this.hidden = true;
    }
}