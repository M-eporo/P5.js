const r = 200;
const dm = r * 2;
let theta = 0;
let strokeWidth = 0;
function setup() {
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB);
    // angleMode(DEGREES);
}

function draw() {
    background(0);
    stroke(255);
    noFill();
    line(0, height / 2, width, height / 2);
    let px = 0;
    let py = height / 2;
    for(let a = 0; a < TWO_PI * 2; a += 0.02) {
        const lx = map(a, 0, TWO_PI * 2, 0, width);
        const ly = map(sin(a), -1, 1, height / 4, height / 4 * 3);
        line(px, py, lx, ly);
        px = lx;
        py = ly;
    }
    circle(
        map(theta, 0, TWO_PI * 2, 0, width),
        map(sin(theta), -1, 1, height / 4, height / 4 * 3),
        10
    );
    theta += 0.02;
    theta %= TWO_PI * 2;
}