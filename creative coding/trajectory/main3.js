let x, y, degree, hist, size, n;

function setup() {
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);
    rectMode(CENTER);
    x = width / 2;
    y = 0;
    degree = 0;
    hist = [];
    size = 20;
    n = 300;
}
function draw() {
    background(0);
    fill(255);
    noStroke();
    y = height / 2 + sin(degree) * 300;
    rect(x, y, size, size);
    degree += 2;
    hist.push({x, y});
    if(hist.lenght > n) {
        hist.shift();
    }

    let prev = hist[0];
    for(let i = 0; i < hist.length; i++) {
        const cur = hist[i];
        noFill();
        stroke(255);
        line(prev.x, prev.y, cur.x, cur.y);
        cur.x--;
        prev = cur;
    }
}