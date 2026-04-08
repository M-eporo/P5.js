const iterations = 20;
const n = 100;
let points;

function setup() {
    createCanvas(windowWidth, windowHeight);
    points =[];
    for(let i = 0; i < n; i++) {
        const x = random(width);
        const y = random(height);
        const c = color(random(256), random(256), random(256));
        points.push({ x, y, color: c });
    }
    
}

function draw() {
    for(let i = 0; i < iterations; i++) {
        for(const p of points) {
            walk(p);
        }
    }
}

function walk(p) {
    p.x += random([-1, 1]);
    p.y += random([-1, 1]);
    stroke(p.color);
    point(p.x, p.y);
}