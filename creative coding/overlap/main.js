let d = 0;
function setup() {
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB);
    angleMode(DEGREES);
    background(0);
    noFill();
    stroke(255);
    translate(width / 2, height / 2);
    for(let i = 0; i < 20; i++) {
        circle(0,0,d);
        d += 40 - i * 2;
    }
}

function draw() {
    
}
