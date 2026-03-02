let x = 0;
let y = 0;
let n = 1000;
let theta = 0;
const hist = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  // angleMode(DEGREES);
  rectMode(CENTER);
  x = width / 2;
}
function draw() {
  background(0);
  y = height / 2 + sin(theta) * 300;
  hist.push({ x, y });
  if(hist.length > n) hist.shift();
  let prev = hist[0];
  noFill();
  stroke(255);
  for(let i = 0; i < hist.length; i++) {
    const cur = hist[i];
    line(prev.x, prev.y, cur.x, cur.y);
    cur.x--;
    prev = cur;
  }
  fill(255);
  noStroke();
  circle(x, y, 20);
  theta +=0.03;
}