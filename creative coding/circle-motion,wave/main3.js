const r = 200;
const dm = r * 2;
let theta = 0;
let strokeWidth = 0;
function setup() {
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB);
    angleMode(DEGREES);
}

function draw() {
    background(0);
    stroke(255);
    noFill();
    
    translate(width/2, height/2);
    for(let i = 0; i < 10; i++) {
        strokeWidth = map(sin(theta + 0.2 * i), -1, 1, 1, 22);
        strokeWeight(strokeWidth);
        circle(0,0, (dm / 10) * i);

    }
    theta += 0.5;
}