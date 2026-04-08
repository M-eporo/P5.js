// 移動元 x, y
// 移動先 mouseX, mouseY
// 近づく割合 k
// (mouseX - x) * k
// mouseX - x のような移動先 - 移動元の値を変位という

const k = 0.1;
let x, y;
function setup() {
    createCanvas(windowWidth, windowHeight);
    x = random(width);
    y = random(height);
}
function draw() {
    clear();
    fill(50);
    const v = createVector(mouseX - x, mouseY - y);
    v.setMag(v.mag() * k);

    x += v.x;
    y += v.y;
    circle(x, y, 100);
}