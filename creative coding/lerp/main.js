
let x, y, t;
function setup() {
    createCanvas(700, 500);
    colorMode(HSB);
    angleMode(DEGREES);
    textAlign(CENTER , CENTER);
    x = 0;
    y = 0;
    t = 0;
    circleX = 0;
}

function draw() {
    background(0);
    noFill()
    stroke("white");
    strokeWeight(3);
    line(x, y, width, height);

    fill("white");
    noStroke();
    text("a", x + 15, y + 30);
    text("b", width - 15, height - 30);

    if(t >= 1) {
        t = 0;
    }
    t += 0.005;
    fill("#555");
    stroke("white");
    strokeWeight(2);
    circle(interpolate(0, width, t), interpolate(0, height, t), 10);

    fill("white");
    noStroke();
    text(`t = ${t.toFixed(3)}`, width / 2, 60);
}

function interpolate(min, max, t) {
    return min + (max - min) * t;
}

