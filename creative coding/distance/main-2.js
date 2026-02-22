function setup() {
    describe("マウスの位置に応じて、円の大きさを変える");
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB);
    angleMode(DEGREES);
}
function draw() {
    background(0);
    noStroke();
    fill(255);
    const n = 50;
    const maxDistance = dist(0, 0, width, height);
    for(let x = 0; x < n; x++) {
        for(let y = 0; y < n; y++) {
            const tx = width / (n - 1) * x;
            const ty = height / (n - 1) * y;
            const d = dist(tx, ty, mouseX, mouseY);
            const nd = map(d, 0, maxDistance, 0, 30);
            circle(tx, ty, nd);
        }
    }
}