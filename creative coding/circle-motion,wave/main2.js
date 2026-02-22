const r = 200;
const dm = r * 2;
let theta = 0;
function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  angleMode(DEGREES);
  textAlign(CENTER, CENTER);
}
function draw() {
  background(0);
  translate(width / 2, height / 2);
  noFill();
  stroke(255);
  //center circle
  circle(0, 0, dm);

  push();
  fill(0);
  const x = r * cos(theta);
  const y = r * sin(theta);
  //bottom line
  line(-r, r + 100, r, r + 100);
  //right line
  line(r + 100, -r, r + 100, r);
  //circle on bottom line
  circle(x, r + 100, 10);
  //circle on right line
  circle(r + 100, y, 10);
  //cercle on center circle
  circle(x, y, 10);
  theta += 1;
  pop();

  push();
  noFill();
  stroke(255);
  line(x, r + 100 - 5, x, y + 5);
  line(r + 100 - 5, y, x + 5, y);
  pop();

  push();
  //text for right line
  text("sinθ", r + 100, -r - 20);
  text("-1", r + 120, -r);
  text("1", r + 120, r);
  //text for bottom line
  text("conθ", -r - 20, r + 100);
  text("-1", -r, r + 120);
  text("1", r, r + 120);
  pop();
}