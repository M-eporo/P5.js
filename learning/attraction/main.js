let mover,attractor;
let wind;
function setup() {
    createCanvas(960,500);
    frameRate(30);
    colorMode(HSB);
    mover = new Mover();
    attractor = new Attractor();
    wind = createVector(1, 0);
}

function draw() {
    background(255,100,100);
    mover.update();
    mover.render();
    //mover.applyForce(createVector(0, 0.1));

    attractor.update();
    attractor.render();
    let attraction = attractor.attract(mover);
    mover.applyForce(attraction);
    
    if(mouseIsPressed) {
        mover.applyForce(wind);
    }
}
class Mover {
    constructor() {
        this.location = createVector(50, 50);
        this.velocity = createVector(0, 0);
        this.accel = createVector(0, 0);
        this.mass = 10;
    }

    applyForce(force) {
        let newForce = force.div(this.mass);
        this.accel.add(newForce);
    }

    update() {
        this.velocity.add(this.accel);
        this.location.add(this.velocity);
        // if(this.location.y > height) {
        //     this.velocity.y *= -1;
        // }
    }

    render() {
        noStroke();
        ellipse(this.location.x, this.location.y, this.mass * 2, this.mass * 2);
    }
}

class Attractor {
    constructor() {
        this.location = createVector(width / 2, height / 2);
        this.velocity = createVector(0, 0);
        this.accel = createVector(0, 0);
        this.mass = 1;
        this.G = 1;
    }

    update() {
        this.velocity.add(this.accel);
        this.location.add(this.velocity);
    }

    attract(mover) {
        let attraction = p5.Vector.sub(this.location, mover.location);
        let distance = attraction.mag();
        distance = constrain(distance, 1, 5);
        attraction.normalize();
        let power = (this.G * this.mass * mover.mass) / (distance * distance);
        attraction.mult(power);
        return attraction;
    }

    render() {
        noStroke();
        ellipse(this.location.x, this.location.y, this.mass * 2, this.mass * 2);
    }
}