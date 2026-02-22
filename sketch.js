function draw() {
  player.updateInput();

  player.x = constrain(player.x, 0, level.w);
  player.y = constrain(player.y, 0, level.h);

  let targetX = player.x - width / 2;
  let targetY = player.y - height / 2;

  const maxCamX = max(0, level.w - width);
  const maxCamY = max(0, level.h - height);

  targetX = constrain(targetX, 0, maxCamX);
  targetY = constrain(targetY, 0, maxCamY);

  camX = lerp(camX, targetX, level.camLerp);
  camY = lerp(camY, targetY, level.camLerp);

  level.drawBackground();

  push();
  translate(-camX, -camY);
  level.drawWorld(player); // ← IMPORTANT
  player.draw();
  pop();

  level.drawHUD(player, camX, camY);
}
