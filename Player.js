class Player {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.s = speed ?? 2.2; // slower for meditation

    this.vx = 0;
    this.vy = 0;
    this.friction = 0.92; // space drag
  }

  updateInput() {
    const dx =
      (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) -
      (keyIsDown(LEFT_ARROW) || keyIsDown(65));

    const dy =
      (keyIsDown(DOWN_ARROW) || keyIsDown(83)) -
      (keyIsDown(UP_ARROW) || keyIsDown(87));

    // acceleration instead of direct movement
    this.vx += dx * 0.2;
    this.vy += dy * 0.2;

    // friction for soft glide
    this.vx *= this.friction;
    this.vy *= this.friction;

    this.x += this.vx;
    this.y += this.vy;
  }

  draw() {
    noStroke();
    fill(180, 210, 255);
    ellipse(this.x, this.y, 18);

    // subtle aura
    fill(120, 160, 255, 40);
    ellipse(this.x, this.y, 40);
  }
}
