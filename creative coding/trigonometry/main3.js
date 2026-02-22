const r = 200;
const dm = r * 2;
let theta = 0;
const n = 15;
function setup() {
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB);
    angleMode(DEGREES);
    
}

function draw() {
    background(0);
    stroke(255);
    noFill();
    const angle = atan2(mouseY - height / 2, mouseX - width / 2);
    push();
    line(0,mouseY, width, mouseY);
    line(mouseX, 0, mouseX, height);
    
    pop();

    push();
    translate(width/2, height/2);
    
    rotate(angle);
    line(0,0,60,0);
    line(60,0,50,-10);
    line(60,0,50,10);
    
    pop();

}