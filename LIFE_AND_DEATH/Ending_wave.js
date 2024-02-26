function ending_wave(c) {
  push();
  noStroke();
  fill(c);
  beginShape();
  let t = tt;
  vertex(0, height)
  for (let x = 0; x <= width; x += 10)
  {
    let y = 400 + 100 * noise(t);
    vertex(x, y);
    t += 0.01;
  }
  vertex(width, height)
  endShape();
  tt += 0.01;
  pop();
}