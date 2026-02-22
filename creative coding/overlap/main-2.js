let d = 0;
function setup() {
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB);
    angleMode(DEGREES);
    background("#f3eed5");
    noFill();
    stroke("#e5af9b");
    for(let i = 0; i < 150; i++) {
        translate(3,3);
        circle(0,0,i*3);
    }
}

