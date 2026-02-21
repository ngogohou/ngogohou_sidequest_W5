let worldWidth = 4000;
let cameraX = 0;
let symbols = [];
let particles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Create hidden symbols
  for (let i = 0; i < 15; i++) {
    symbols.push({
      x: random(200, worldWidth - 200),
      y: random(height * 0.3, height * 0.7),
      size: random(10, 25),
      discovered: false,
    });
  }

  // Floating particles
  for (let i = 0; i < 80; i++) {
    particles.push({
      x: random(worldWidth),
      y: random(height),
      speed: random(0.2, 0.6),
      size: random(1, 3),
    });
  }
}

function draw() {
  // Slow camera movement
  cameraX += 0.3;

  // Clamp camera
  cameraX = constrain(cameraX, 0, worldWidth - width);

  push();
  translate(-cameraX, 0);

  drawGradientBackground();
  drawParticles();
  drawSymbols();

  pop();
}

function drawGradientBackground() {
  for (let y = 0; y < height; y++) {
    let inter = map(y, 0, height, 0, 1);
    let c = lerpColor(color(15, 20, 40), color(60, 40, 90), inter);
    stroke(c);
    line(cameraX, y, cameraX + width, y);
  }
}

function drawParticles() {
  noStroke();
  fill(255, 40);

  for (let p of particles) {
    ellipse(p.x, p.y, p.size);

    p.y -= p.speed;

    if (p.y < 0) {
      p.y = height;
      p.x = random(worldWidth);
    }
  }
}

function drawSymbols() {
  for (let s of symbols) {
    let distanceToCameraCenter = abs(cameraX + width / 2 - s.x);

    if (distanceToCameraCenter < 100) {
      s.discovered = true;
    }

    if (s.discovered) {
      fill(255, 180);
      let pulse = sin(frameCount * 0.05) * 3;
      ellipse(s.x, s.y, s.size + pulse);
    } else {
      fill(255, 50);
      ellipse(s.x, s.y, s.size);
    }
  }
}
