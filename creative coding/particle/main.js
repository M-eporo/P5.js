let particles = [];
const maxNum = 100;
function setup() {
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB);
    noStroke();
    textAlign(CENTER);
}

function draw() {
    clear();
    
    if(particles.length <= maxNum && frameCount % 5 === 0) {
        createParticles();
    }
    
    for(let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].display();
    }

    particles = particles.filter(p => {
        return p.pos.x + p.r >= 0 && p.pos.x - p.r <= width && p.pos.y + p.r >= 0 && p.pos.y - p.r <= height;
    });

    push();
    stroke(50);
    noFill();
    text(particles.length,width / 2, height / 2);
    pop();
}

function createParticles() {
    // for(let i = 0; i <maxNum; i++) {
        const pos = createVector(width / 2, height / 2);
        const velocity = createVector(random(-3, 3), random(-3, 3));
        const accel = createVector(random(0.1, 1), random(0.1, 1));
        const c = color(random(0, 360), 100, 100, random(0.1, 1));
        const r = random(15, 60);
        const particle = new Particle(pos, velocity, accel, c, r);
        particles.push(particle);
    // }
}

class Particle {
    constructor(pos, velocity, accel, c, r) {
        this.pos = pos;
        this.velocity = velocity;
        this.accel = accel;
        this.c = c;
        this.r = r;
        this.mass = random(0.1, 10);
    }

    applyForce(force) {
        let a = p5.Vector.div(force, this.mass);
        this.accel.add(a);
    }

    update() {
        this.velocity.add(this.accel);
        this.pos.add(this.velocity);
        this.accel.mult(0);
    }

    display() {
        fill(this.c);
        circle(this.pos.x, this.pos.y, this.r * 2);
    }
}

function mouseClicked() {
    particles.forEach(p => {
        p.applyForce(createVector(0,5));
    })
}