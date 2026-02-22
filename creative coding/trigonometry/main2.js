const r = 200;
const dm = r * 2;
let theta = 0;
const n = 15;
function setup() {
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB);
    angleMode(DEGREES);
    noStroke();
    fill(255);
    translate(width/2, height/2);
    background(0);
    for(let i = 0; i < n; i++) {
        const angle = (360/ n) * i;
        const x = r * cos(angle);
        const y = r * sin(angle);
        circle(x,y, 1 * 5 + i * 5);
    }
}