let papers = [];
function setup() {
    createCanvas(400, 700);
    colorMode(HSB);
    angleMode(DEGREES);
    for(let i = 0; i < 300; i++) {
        papers.push(new Paper());
    }
}
function draw() {
    background(0);
    let currentTime = frameCount / 60;
    for(const p of papers) {
        p.update(currentTime);
        p.display();
    } 
}

//w = o / t  1秒に進んだ距離・速度を角度で表す
//o = w * t　進んだ角度を、角速度と経過時間で計算する  
class Paper {
    constructor() {
        this.mass = random(3, 9);
        this.posX = 0;
        this.posY = random(-innerHeight, 0);
        this.initialAngle = random(0, 360);
        this.radius = sqrt(random(pow(width / 2,2)));
        this.rotSpeed = random(-180, 180);
        this.rot = random(360);
        this.color = color(random(0,360), random(80, 100), random(80, 100));
    }
    update(t) {
        let angularSpeed = 35;
        let theta = this.initialAngle + angularSpeed * t;
        this.posX = width / 2 + this.radius * sin(theta);
        this.posY += 5;
        this.rot += this.rotSpeed * 1 /24;
        if(this.posY > height) {
            this.posY = -50;
        }
    }
    display() {
        push();
        noStroke();
        fill(this.color);
        
        translate(this.posX, this.posY);
        rotate(this.rot);
        rectMode(CENTER);
        rect(0,0, this.mass, this.mass);
        pop();
    }
}