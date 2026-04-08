const papers = [];
let dt = 0;
function setup() {
    colorMode(HSB);
    angleMode(DEGREES);
    rectMode(CENTER);
    createCanvas(400,800);
    for(let i = 0; i < 100; i++) {
        papers.push(new Paper());
    }
}
function draw() {
    // background(0);
    clear()
    dt += deltaTime / 1000;
    for(const p of papers) {
        p.update(dt);
        p.display();
    }
}

class Paper {
    constructor() {
        this.w = random(3, 9);
        this.h = random(3, 9);
        this.x = 0;
        this.y = random(-innerHeight, 0);
        this.color = color(random(0, 360), 100, 100);
        this.radius = sqrt(random(pow(width / 2, 2)));
        this.initAngle = random(0, 360);
        this.rot = random(0, 360);
        this.rotSpeed = random(-1, 1);
    }
    update(dt) {
        let angleSpeed = 35;
        let theta = this.initAngle + angleSpeed * dt;
        this.x = width / 2 + this.radius * sin(theta);
        this.y += 5;
        this.rot += this.rotSpeed * dt;
    }
    display() {
        console.log(this.rot);
        noStroke();
        fill(this.color);
        translate(this.x, this.y);
        rotate(this.rot);
        rect(0, 0, this.w, this.h);
        resetMatrix()   
    }
}