let worldWidth = 4000;
let worldHeight = 2000;

let player = {
  x: 200,
  y: 300,
  size: 20,
  speed: 3,
};

let cameraX = 0;
let cameraY = 0;

let symbols = [];
let particles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Hidden symbols
  for (let i = 0; i < 20; i++) {
    symbols.push({
      x: random(100, worldWidth - 100),
      y: random(100, worldHeight - 100),
      size: random(15, 30),
      discovered: false,
    });
  }

  // Floating particles
  for (let i = 0; i < 100; i++) {
    particles.push({
      x: random(worldWidth),
      y: random(worldHeight),
      speed: random(0.2, 0.5),
      size: random(1, 3),
    });
  }
}

function draw() {
  background(15, 20, 40);

  updatePlayer();
  updateCamera();

  push();
  translate(-cameraX, -cameraY);

  drawGradient();
  drawParticles();
  drawSymbols();
  drawPlayer();

  pop();
}

function updatePlayer() {
  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) player.x -= player.speed;
  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) player.x += player.speed;
  if (keyIsDown(UP_ARROW) || keyIsDown(87)) player.y -= player.speed;
  if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) player.y += player.speed;

  player.x = constrain(player.x, 0, worldWidth);
  player.y = constrain(player.y, 0, worldHeight);
}

function updateCamera() {
  let targetX = player.x - width / 2;
  let targetY = player.y - height / 2;

  // Smooth easing
  cameraX = lerp(cameraX, targetX, 0.05);
  cameraY = lerp(cameraY, targetY, 0.05);

  cameraX = constrain(cameraX, 0, worldWidth - width);
  cameraY = constrain(cameraY, 0, worldHeight - height);
}

function drawGradient() {
  for (let y = 0; y < worldHeight; y += 5) {
    let inter = map(y, 0, worldHeight, 0, 1);
    let c = lerpColor(color(20, 25, 50), color(60, 40, 90), inter);
    stroke(c);
    line(0, y, worldWidth, y);
  }
}

function drawParticles() {
  noStroke();
  fill(255, 30);

  for (let p of particles) {
    ellipse(p.x, p.y, p.size);

    p.y -= p.speed;

    if (p.y < 0) {
      p.y = worldHeight;
      p.x = random(worldWidth);
    }
  }
}

function drawSymbols() {
  for (let s of symbols) {
    let d = dist(player.x, player.y, s.x, s.y);

    if (d < 80) {
      s.discovered = true;
    }

    if (s.discovered) {
      let pulse = sin(frameCount * 0.05) * 5;
      fill(255, 200);
      ellipse(s.x, s.y, s.size + pulse);
    } else {
      fill(255, 40);
      ellipse(s.x, s.y, s.size);
    }
  }
}

function drawPlayer() {
  fill(255);
  ellipse(player.x, player.y, player.size);
}
