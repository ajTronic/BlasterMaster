// Hit testing.
// scores.

let blaster;
let bullets = [];
let enemies = [];
let spaceShip;
let enemySpaceShip;
let boom;
let score = 90;
let gameOver = false;

function preload() {
  spaceShip = loadImage('images/spaceShip.png');
  enemySpaceShip = loadImage('images/enemySpaceShip.png');
  boom = loadImage('images/boom.png');
}

function setup() {
  createCanvas(650, 878);
  blaster = new shooter(width / 2, height - 100);
  fill(200);
  enemies.push(new enemy(random(width), 50, 1));
  noCursor();
  // let arr = [7, 5, 6, 8, 1, 8, 9, 1];
  // bubblesort(arr, 0, 1);
  // print(arr);
}

// the bubble sort function
// -----------------------------------------------------
// function bubblesort(arr) {
//   for (let j = 0; j < arr.length - 1; j++) {
//     for (let i = 0; i < arr.length - (j + 1); i++) {
//       if (arr[i] > arr[i + 1]) {
//         swap(arr, i, i + 1);
//       }
//     }
//   }
// }

function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
  return arr;
}
// -----------------------------------------------------

function draw() {
  background(20);
  if (keyIsDown(LEFT_ARROW)) blaster.x -= 5;
  if (keyIsDown(RIGHT_ARROW)) blaster.x += 5;
  if (keyIsDown(UP_ARROW)) blaster.y -= 5;
  if (keyIsDown(DOWN_ARROW)) blaster.y += 5;
  // if (keyIsDown(32)) bullets.push(new bullet(blaster.x, blaster.y));

  for (let i = 0; i < enemies.length; i++) {
    const e = enemies[i];
    if (dist(blaster.x, blaster.y, e.x, e.y) < 50) {
      gameOver = true;
      e.hidden = true;
      if (!blaster.hitCount) {
        blaster.hitCount = frameCount;
      }
      let frameSinceHit = frameCount - blaster.hitCount;
      if (frameSinceHit < 48) {
        drawBomb(frameSinceHit, blaster.x - 50, blaster.y - 50);
        console.log(frameSinceHit, frameCount, blaster.hitCount);
      }
    }
  }

  if (!gameOver) {
    blaster.y = min(mouseY - 25, height - 50);
    blaster.x = min(mouseX - 25, width - 50);
  }

  fill(255);
  line(height - 50, 0, height - 50, width);

  for (const e of enemies) {
    if (e.y > height - 50) {
      gameOver = true;
    }
  }

  if (frameCount % 50 === 0) {
    for (let e = enemies.length - 1; e >= 0; e--) {
      if (enemies[e].y > height) {
        enemies.splice(e, 1);
      }
    }
    enemies.push(new enemy(random(width), 50, 1));
  }

  textSize(32);
  fill(0, 102, 153);

  if (gameOver) {
    text('YOU HAVE LOST WITH A SCORE OF ' + score, 10, 30);
    for (let i = 0; i < enemies.length; i++) {
      const e = enemies[i];
      e.vel = 0;
    }
  } else {
    if (score >= 100) {
      fill(200, 100, 50)
      text('Highscore of ' + score + '!', 10, 30);
    }
    else {
      fill(200, 50, 50);
      text(score, 10, 30);
    }
  }

  blaster.draw();
  for (const bullet of bullets) {
    bullet.draw();
    if (bullet.y < 0 && bullet.exists === true) {
      bullet.exists = false;
    }
  }

  for (let i = 0; i < enemies.length; i++) {
    let frameSinceHit = frameCount - enemies[i].hitCount;
    if (frameSinceHit < 48) {
      drawBomb(frameSinceHit, enemies[i].x - 50, enemies[i].y - 50);
    }
  }

  for (let b = 0; b < bullets.length; b++) {
    for (let e = 0; e < enemies.length; e++) {
      let enemy = enemies[e];
      let bullet = bullets[b];
      if (enemy.exists && bullet.exists) {
        if (dist(enemy.x, enemy.y, bullet.x, bullet.y) < 50) {
          if (!enemy.hitCount) {
            enemy.hitCount = frameCount;
            enemy.hide();
            score += 10;
          }
        }
      }
    }
  }
  for (const e of enemies) {
    e.move();
    e.draw();
  }
}

function keyPressed() {
  if (keyCode === 32) {
    for (let b = bullets.length - 1; b >= 0; b--) {
      if (bullets[b].y < 0) {
        bullets.splice(b, 1);
      }
    }
    if (!gameOver) {
      bullets.push(new bullet(blaster.x, blaster.y));
    }
  }
}

function drawBomb(bombNum, x, y) {
  let a = (bombNum % 8) * 256;
  let b = floor(bombNum / 6) * 248;

  image(boom, x, y, 150, 150, a, b, 256, 248);
}

