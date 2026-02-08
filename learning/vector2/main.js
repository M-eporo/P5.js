let mouse, origin;
function setup() {
    createCanvas(400,400);
}

function draw() {
    background(220);
    mouse = createVector(mouseX, mouseY);
    console.log(mouseX);
    origin = createVector(width / 2, height / 2);
    mouse.sub(origin);
    mouse.normalize();
    mouse.mult(100);
    translate(width / 2, height / 2);
    line(0,0,mouse.x, mouse.y);
    console.log(mouse.x);
}