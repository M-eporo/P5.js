const r = 200;
const dm = r * 2;
let theta = 0;
function setup() {
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB);
    angleMode(DEGREES);
    noStroke();
    fill(255);
    translate(width/2, height/2);
    background(0);
    for(let angle = 0; angle < 360; angle += 10) {
        const x = r * cos(angle);
        const y = r * sin(angle);
        
        circle(x,y,30);

    }
}