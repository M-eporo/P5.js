let x = 0;
let y = 0;
let diameter = 0;
let c = 0;
let bgColor;
let circleColor;
function setup() {
    createCanvas(700, 400);
    colorMode(HSB);
    angleMode(DEGREES);
    circleColor = color(random(0, 360),random(0, 100), random(0, 100));
    reset();
}
function draw() {
    
    x = width / 2;
    y = height / 2;
    diameter += 15;
    //どちらか
    c = sqrt(width * width + height * height);
    c = dist(0, 0, width, height);
    
    if(diameter > c && diameter > c) {
        reset();
    }
    noStroke();
    background(bgColor);
    fill(circleColor);
    circle(x, y, diameter);
}

function reset() {
    bgColor = circleColor;
    circleColor = color(random(0, 360),random(0, 100), random(0, 100));
    diameter = 0;

}