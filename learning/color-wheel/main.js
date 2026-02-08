function setup() {
    createCanvas(400, 400);
    background(255);
    noStroke();
    colorMode(HSB);
    angleMode(DEGREES);
    textAlign(CENTER, CENTER);

    for(let angle = 0; angle < 360; angle += 30) {
        push();
        translate(width / 2, height / 2);
        rotate(angle);
        translate(150, 0);
        fill(angle, 85, 90);
        circle(0,0,50);
        
        translate(-50, 0);
        rotate(-angle);
        fill(0);
        text(`${angle}`, 0, 0);
        pop();
    }
}