let x, y, size, d, hist, angle;
function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  rectMode(CENTER);
  x = 0;
  y = height / 2;
  size = 20;
  d = dist(0,0,size,size);
  angle = 0;
  hist = [];
}
function draw() {
  background(0);
  noFill();
  stroke(240);
  push();
  translate(x, y);
  rotate(angle);
  rect(0, 0, size * 2, size * 2);
  pop();

  if(x < width + size * 2) {
    const h = [];
    for(let i = 0; i < 4; i++) {
      const a = angle + 90 * i + 45;
      const tx = x + cos(a) * d;
      const ty = y + sin(a) * d;
      h.push({x: tx, y: ty});
    }
    hist.push(h);
  }
  let prev = hist[0];
  for(let i = 1; i < hist.length; i++) {
    const cur = hist[i];
    for(let j = 0; j < 4; j++) {
      line(prev[j].x, prev[j].y, cur[j].x, cur[j].y);
    }
    prev = cur;
  }
  x++;
  angle += 2;
}