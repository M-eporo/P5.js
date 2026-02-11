let x1, x2, x, y;
function setup() {
    createCanvas(900, 500);
    textAlign(CENTER, CENTER);
    colorMode(HSB);
    angleMode(DEGREES);
    x1 = 30;
    x2 = width - 30;
    x = x1;
    y = height / 2;
}
function draw() {
    background("black");
    x += 1;
    if(x >= x2) {
        x = x1;
    }
    clear()
    noStroke();
    fill(0);
    text(x1, x1, y - 65);
    text(x2, x2, y - 65);
    text(0, x1, y + 65);
    text(1, x2, y + 65 );
    text(normalize(x, x1, x2).toFixed(2), x, y + 65);
    text(x, x, y - 65);

    stroke(0);
    noFill();
    line(x1, y - 45, x1, y + 45);
    line(x2, y - 45, x2, y + 45);
    line(x1, y, x2, y);

    stroke(0);
    fill("#999");
    circle(x, y, 20);
}

function normalize(value, min, max) {
    return (value - min) / (max - min);
}