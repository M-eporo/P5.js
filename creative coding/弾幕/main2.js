let bullets = [];
function setup() {
    createCanvas(windowWidth, windowHeight);
    noStroke();
    fill(50);
}

function draw() {
    clear();

    if(frameCount % 10 === 0) {
        for(let angle = 0; angle < TWO_PI; angle += 0.2) {
            const bullet = new Bullet(width / 2, height / 10, angle, 10);
            bullets.push(bullet);
        }
    }

    for(let i = 0; i < bullets.length; i++) {
        bullets[i].update();
        bullets[i].display();
    }
}

class Bullet{
    constructor(x, y, angle, speed) {
        this.pos = createVector(x, y);
        this.angle = angle;
        this.speed = speed;
        this.r = 5;
    }

    update() {
        this.pos.add(cos(this.angle) * this.speed, sin(this.angle) * this.speed);
    }

    display() {
        circle(this.pos.x, this.pos.y, this.r * 2);
    }
}