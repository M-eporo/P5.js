let w, h, x1, y1, x2, y2, size, angleX, angleY, hist, speedX, speedY;
function setup() {
    createCanvas(windowWidth, windowHeight);
    w = width / 4;
    h = height / 4;
    size = 100;
    x1 = w;
    y1 = h * 3;
    x2 = w * 3;
    y2 = h;
    angleX = random(TWO_PI);
    angleY = random(TWO_PI);
    speedX = random(0.01, 0.03);
    speedY = random(0.01, 0.03);
    hist = [];
}
function draw() {
    background(0);
    noFill();
    stroke(240);
    circle(x1, y1, size * 2);
    circle(x2, y2, size * 2);

    const a = x1 + cos(angleX) * size;
    const b = y1 + sin(angleX) * size;
    const c = x2 + cos(angleY) * size;
    const d = y2 + sin(angleY) * size;

    fill(0);
    circle(a, b, 10);
    circle(c, d, 10);

    noFill();
    line(a, b, a, d);
    line(a, d, c, d);

    hist.push({x: a, y: d});
    if(hist.length > 200) {
        hist.shift();
    }
    let prev = hist[0];
    for(let i = 1; i < hist.length; i++) {
        const cur = hist[i];
        line(prev.x, prev.y, cur.x, cur.y);
        prev = cur;
    }
    angleX += speedX;
    angleY += speedY;
}