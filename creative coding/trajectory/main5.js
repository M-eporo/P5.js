let x, y, hist, angle;
const size = 20;
let distance = 0;
function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  rectMode(CENTER);
  
  x = 0;
  y = height / 2;
  hist = [];
  angle = 0;
  distance = dist(0, 0, size, size);
}

function draw() {
  background(100);
  push()
  fill(255);
  noStroke(); 
  translate(x, y);
  rotate(angle);
  rect(0, 0, size * 2, size * 2);
  pop();
  const tx = x + cos(angle) * distance;
  const ty = y + sin(angle) * distance;
  if(x < width + size * 2) {
    const h = [];
    for(let i = 0; i < 4; i++) {
      const a = angle + 90 * i + 45;
      const rx = x + cos(a) * distance;
      const ry = y + sin(a) * distance;
      h.push({x: rx, y: ry});
    }
    hist.push(h);
  }
  let prev = hist[0];
  stroke(255);
  noFill();
  for(let i = 0; i < hist.length; i++) {
    const cur = hist[i];
    for(let j = 0; j < 4; j++) {
      line(prev[j].x, prev[j].y, cur[j].x, cur[j].y);
    }
    prev = cur;
  }
  x++;
  angle += 1;
}