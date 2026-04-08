const iterations = 20;
const size = 4;
let x, y;

function setup() {
    createCanvas(windowWidth, windowHeight);
    stroke(50);
    noFill();
    x = floor(width / 2);
    y = floor(height / 2);
}

function draw() {
    walk();
}

function walk() {
    const tx = x + random([-size, size]);
    const ty = y + random([-size, size]);
    line(x, y, tx, ty);
    x = tx;
    y = ty;
}