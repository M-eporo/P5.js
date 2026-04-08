let x, y;
const minDist = 100;
const k = 0.1;
function setup() {
    createCanvas(windowWidth, windowHeight);
    x = width / 2;
    y = height / 2;
}

function draw() {
    const d = dist(mouseX, mouseY, x, y);
    if(d < minDist) {
        const v = createVector(x - mouseX, y - mouseY);
        v.setMag((minDist - d) * k);
        x += v.x;
        y += v.y;
    }

    fill(50);
    clear();
    circle(x, y, 50);
}