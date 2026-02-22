const r = 200;
const dm = r * 2;
let theta = 0;
function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  angleMode(DEGREES);
}
function draw() {
  background(0);
  translate(width / 2, height / 2);
  noFill();
  stroke(255);
  circle(0, 0, dm);

  push();
  fill(255);
  noStroke();
  const x = r * cos(theta);
  const y = r * sin(theta);
  circle(x, y, 10);
  theta += 1;
  pop();
}
