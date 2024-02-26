function stardraw() {
  push();
  fill('#EDFFB2')
  translate(width * 0.5, height * 0.5);
  rotate(frameCount / - 100.0);
  star(300, 20, 6, 14, 5);
  star(-300, 20, 6, 14, 5);
  pop();
}

function star(star_x, star_y, radius1, radius2, npoints) {
    let angle = TWO_PI / npoints;
    let halfAngle = angle / 2.0;
    beginShape();
    for (let a = 0; a < TWO_PI; a += angle) {
      let sx = star_x + cos(a) * radius2;
      let sy = star_y + sin(a) * radius2;
      vertex(sx, sy);
      sx = star_x + cos(a + halfAngle) * radius1;
      sy = star_y + sin(a + halfAngle) * radius1;
      vertex(sx, sy);
    }
    endShape(CLOSE);
  }