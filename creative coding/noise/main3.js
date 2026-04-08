let x;
function setup() {
    createCanvas(windowWidth, windowHeight);
    x = 0;
    fill(50);
    noStroke();
}

function draw() {
    clear();
    const y = noise(x);
    x += 0.005;

    const d = min(width, height) * y;
    circle(width / 2, height / 2, d);
    
}