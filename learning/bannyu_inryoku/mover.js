//運動方程式
//F = ma 力は質量 X 加速度
//両辺をm(質量)で割ると、a = F / m
//let a = force.div(mass)  加速度は力 / 質量
let mover;
let attractor;
function setup() {
    createCanvas(900, 700);
    colorMode(HSB);
    mover = new Mover();
    attractor = new Attractor();
}

function draw() {
    background(255);
    // let gravity = createVector(0, 0.1);
    // mover.applyForce(gravity);
    let attraction = attractor.attract(mover);
    mover.applyForce(attraction);
    mover.update();
    mover.render();
    //mover.checkEdges();
    attractor.render();
    if(mouseIsPressed) {
        let wind = createVector(0.1, 0);
        mover.applyForce(wind);
    }
}

class Mover {
    constructor() {
        this.location = createVector(130, 130);
        this.velocity = createVector(0, 0);
        this.accel = createVector(0, 0);
        this.mass = 2;
    }

    update() {
        this.velocity.add(this.accel);
        this.location.add(this.velocity);
        //加速度が増え続けるから0をかけて常に0.1にして練習用にわかりやすくしているだけ
        this.accel.mult(0);
    }
    //運動方程式
    applyForce(force) {
        let a = force.copy().div(this.mass);
        this.accel.add(a);
    }

    render() {
        noStroke();
        fill(100,100,100,1);
        ellipse(this.location.x, this.location.y, 50,50);
    }

    checkEdges() {
        if(this.location.x > width || this.location.x < 0) {
            this.velocity.x *= -1;
        }
        if(this.location.y > height || this.location.y < 0) {
            this.velocity.y *= -1;
        }
    }
}