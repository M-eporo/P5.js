let x, y, n, r, hist;
let angle = 0;
function setup() {
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);
    
    x = 0;
    y = height / 2;
    n = 1000;
    d = 100;
    r = d / 2;
    hist = [];
}

function draw() {
    background(0);
    fill(255);
    noStroke();
    
    circle(x,y,d);

    const tx = x + cos(angle) * r;
    const ty = height / 2 + sin(angle) * r;
    
    if(x < width + r) {
        hist.push({x: tx, y: ty});
    }
    let prev = hist[0];
    stroke(255);
    noFill();
    for(let i = 0; i < hist.length; i++) {
        const cur = hist[i];
        line(prev.x, prev.y, cur.x, cur.y);
        prev = cur;
    }
    x++;
    angle += 4;
}