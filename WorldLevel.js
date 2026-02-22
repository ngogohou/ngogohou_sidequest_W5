class WorldLevel {
  constructor(json) {
    this.w = json.world?.w ?? 4000;
    this.h = json.world?.h ?? 2500;

    this.camLerp = json.camera?.lerp ?? 0.05;

    this.stars = [];
    this.discoveredCount = 0;

    // Generate galaxy stars ONCE
    for (let i = 0; i < 200; i++) {
      this.stars.push({
        x: random(this.w),
        y: random(this.h),
        size: random(1, 4),
        discovered: false,
      });
    }
  }

  drawBackground() {
    // galaxy gradient
    for (let y = 0; y < height; y++) {
      let inter = map(y, 0, height, 0, 1);
      let c = lerpColor(color(10, 10, 35), color(40, 10, 70), inter);
      stroke(c);
      line(0, y, width, y);
    }
  }

  drawWorld(player) {
    noStroke();

    for (let s of this.stars) {
      let d = dist(player.x, player.y, s.x, s.y);

      if (d < 60 && !s.discovered) {
        s.discovered = true;
        this.discoveredCount++;
      }

      if (s.discovered) {
        let pulse = sin(frameCount * 0.05) * 2;
        fill(255, 230, 150);
        ellipse(s.x, s.y, s.size + pulse);
      } else {
        fill(255, 255, 255, 120);
        ellipse(s.x, s.y, s.size);
      }
    }
  }

  drawHUD(player, camX, camY) {
    noStroke();
    fill(255);
    text("Stars discovered: " + this.discoveredCount, 20, 30);
  }
}
