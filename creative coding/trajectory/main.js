// const r = 400;
let r = 0;
let angle = 0;
let hist = [];
// const n = 100;
const n = 1000;
function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  angleMode(DEGREES);
}
function draw() {
  background(0);
  const x = cos(angle) * r;
  const y = sin(angle) * r;
  // angle += 2;
  angle += 5;
  r += 0.2;
  hist.push({ x, y });
  if(hist.length > n) {
    hist.shift();
  }

  noFill();
  stroke(255);
  translate(width / 2, height / 2);
  
  let prev = hist[0];
  for(let i = 1; i < hist.length; i++) {
    const cur = hist[i];
    line(prev.x, prev.y, cur.x, cur.y);
    prev = cur;
  }
}
