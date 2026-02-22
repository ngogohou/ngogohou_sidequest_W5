class WorldLevel {
  constructor(json) {
    this.w = json.world?.w ?? 4000;
    this.h = json.world?.h ?? 3000;

    this.camLerp = json.camera?.lerp ?? 0.04;

    this.stars = [];
    this.hiddenStars = [];

    // generate background stars
    for (let i = 0; i < 600; i++) {
      this.stars.push({
        x: random(this.w),
        y: random(this.h),
        size: random(1, 3),
        alpha: random(100, 255),
      });
    }

    // hidden discoverable stars
    for (let i = 0; i < 25; i++) {
      this.hiddenStars.push({
        x: random(this.w),
        y: random(this.h),
        found: false,
      });
    }
  }

  drawBackground() {
    // deep galaxy gradient
    for (let y = 0; y < height; y++) {
      let inter = map(y, 0, height, 0, 1);
      let c = lerpColor(color(10, 10, 35), color(2, 0, 15), inter);
      stroke(c);
      line(0, y, width, y);
    }
  }

  drawWorld(player) {
    noStroke();

    // draw distant stars
    for (const s of this.stars) {
      fill(255, 255, 255, s.alpha + sin(frameCount * 0.02 + s.x) * 40);
      ellipse(s.x, s.y, s.size);
    }

    // hidden stars interaction
    for (const hs of this.hiddenStars) {
      const d = dist(player.x, player.y, hs.x, hs.y);

      if (d < 60 && !hs.found) {
        hs.found = true;
      }

      if (hs.found) {
        for (let i = 30; i > 0; i -= 6) {
          fill(255, 240, 180, 15);
          ellipse(hs.x, hs.y, i);
        }
        fill(255, 240, 180);
        ellipse(hs.x, hs.y, 6);
      }
    }
  }

  drawHUD(player, camX, camY) {
    fill(255, 150);
    textSize(12);
    textAlign(LEFT);
    text("Drift. Discover. Breathe.", 20, height - 20);
  }
}
