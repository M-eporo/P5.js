const iterations = 20;
let x, y;
function setup() {
    createCanvas(windowWidth, windowHeight);
    x = floor(width / 2);
    y = floor(height / 2);
}

function draw() {
    for(let i = 0; i < iterations; i++) {
        walk();
    }
}

function walk() {
    x += random([-1, 1]);
    y += random([-1, 1]);
    point(x, y);
}