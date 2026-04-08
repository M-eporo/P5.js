let bullets = [];
function setup() {
    createCanvas(windowWidth, windowHeight);
    noStroke();
    fill(50);
}
function draw() {
    clear();
    if(frameCount % 10 === 0) {
        const angle = atan2(mouseY, mouseX - width / 2);
        const bullet = new Bullet(width / 2, 0, angle, 10);
        bullets.push(bullet);
    }

    for(let i = 0; i < bullets.length; i++) {
        bullets[i].update();
        bullets[i].draw();
    }

    bullets = bullets.filter(b => {
        return b.pos.x + b.r >= 0 && b.pos.x - b.r <= width && b.pos.y + b.r >= 0 && b.pos.y - b.r <= height;
    });
}

class Bullet {
    constructor(x, y, angle, speed) {
        this.pos = createVector(x, y);
        this.angle = angle;
        this.speed = speed;
        this. r = 5;
    }

    update() {
        this.pos.add(cos(this.angle) * this.speed, sin(this.angle) * this.speed);
        
    }

    draw() {
        circle(this.pos.x, this.pos.y, this.r * 2);
    }
}