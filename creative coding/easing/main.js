function setup() {
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB);
    angleMode(DEGREES);
}
let x = 0;
let y = 0;
let t = 0;
function draw() {
    background(0);
    noStroke();
    fill(255);
    x = lerp(0, width, t);
    y = lerp(height, 0, tt(t))
    circle(x, y, 10);
    t += 0.01;
    if(t > 1) {
        t = 0;
    }
}

function lerp(min, max, t) {
    return min + (max - min) * t;
}
//tt(0) = 0
//tt(1) = 1
function tt(t) {
    return t * t * t;
}