let ball;
function setup() {
    createCanvas(windowWidth, windowHeight);
    fill(50);
    noStroke();
    ball = new Ball(0, 0, 3, random(3,5), 0.2);
}

function draw() {
    clear();
    ball.update();
    ball.display();
    if(ball.y > height) {
        ball.y = 0;
        ball.vy = random(3, 5);
    }
}

class Ball {
    constructor(x, y, vx, vy, g) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.g = g;
    }
    update() {
        this.vy += this.g;
        this.x += this.vx;
        this.y += this.vy;
    }
    display() {
        circle(this.x, this.y, 10);
    }
}