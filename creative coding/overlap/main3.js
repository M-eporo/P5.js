let d = 0;
function setup() {
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB);
    angleMode(DEGREES);
    
}
let rot = 0;
function draw() {
    // background(0);
    fill(255);
    stroke(0);
    translate(width / 2, height / 2);
    rotate(rot);
    rect(0,0,100,100);
    rot += 10;
}
