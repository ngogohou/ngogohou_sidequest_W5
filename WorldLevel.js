class WorldLevel {
  constructor(json) {
    this.w = json.world?.w ?? 4000;
    this.h = json.world?.h ?? 2500;

    this.camLerp = json.camera?.lerp ?? 0.05; // slower camera

    this.stars = [];
    this.discoveredCount = 0;

    // Generate hidden stars
    for (let i = 0; i < 60; i++) {
      this.stars.push({
        x: random(this.w),
        y: random(this.h),
        size: random(2, 5),
        discovered: false,
      });
    }
  }

  drawBackground() {
    // deep galaxy gradient
    for (let y = 0; y < height; y++) {
      let inter = map(y, 0, height, 0, 1);
      let c = lerpColor(color(10, 10, 35), color(40, 10, 70), inter);
      stroke(c);
      line(0, y, width, y);
    }
  }

  drawWorld(player) {
    this.drawParallaxNebula();
    this.drawStars(player);
  }

  drawParallaxNebula() {
    noStroke();
    for (let i = 0; i < 200; i++) {
      fill(255, 255, 255, 10);
      ellipse(random(this.w), random(this.h), random(100, 300));
    }
  }

  drawStars(player) {
    for (let s of this.stars) {
      let d = dist(player.x, player.y, s.x, s.y);

      if (d < 80 && !s.discovered) {
        s.discovered = true;
        this.discoveredCount++;
      }

      if (s.discovered) {
        let pulse = sin(frameCount * 0.05) * 2;
        fill(255, 230, 150);
        ellipse(s.x, s.y, s.size + pulse);
      } else {
        fill(255, 255, 255, 60);
        ellipse(s.x, s.y, s.size);
      }
    }
  }

  drawHUD(player, camX, camY) {
    noStroke();
    fill(255);
    text(
      "Drift through the galaxy — Stars discovered: " + this.discoveredCount,
      20,
      30,
    );
  }
}
