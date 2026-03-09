const n = 30;
let r, baseRad;

function setup() {
    createCanvas(windowWidth, windowHeight);
    baseRad = 0;
}

function draw() {
    clear();
    drawItem();
    baseRad += 0.02;
    r = min(width, height) / 6;
}

function drawItem() {
    const a = [];
    const b = [];
    fill(50);
    for(let rad = 0; rad < TWO_PI; rad += TWO_PI / n) {
        const x = width / 4 + cos(baseRad + rad) * r;
        const y = height / 2 + sin(baseRad + rad) * r;
        circle(x, y, 10);
        circle(width - x, height - y, 10);

        a.push({x,y});
        b.push({x: width - x, y: height - y});
    }

    push();
    stroke(50);
    noFill();
    for(let i = 0; i < a.length; i++) {
        line(a[i].x, a[i].y, b[i].x, b[i].y);
    }
    pop();
}