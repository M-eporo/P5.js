let d = 0;
function setup() {
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB);
    angleMode(DEGREES);
    rectMode(CENTER);
    const n = 30;
    background(0);
    stroke(0);
    translate(width / 2, height / 2);
    for(let i = 0; i < n; i++) {
        push();
        fill(color(map(i, 0, 30, 0, 360),100,100));
        
        rotate(map(i, 0, n, 0, 360));
        scale(map(i, 0, n, 1, 0.1));
        rect(0,0,300,300);
        pop();
    }
}

