
let x, y, t, i;
const route = [
    {x: 100, y: 100},
    {x: 100, y: 500},
    {x: 500, y: 100}
];
function setup() {
    createCanvas(600, 600);
    colorMode(HSB);
    angleMode(DEGREES);
    textAlign(CENTER , CENTER);
    x = 0;
    y = 0;
    t = 0;
    i = 0;
}

function draw() {
    background(0);
    fill("white");
    noStroke();
    route.forEach((r) => {
        circle(r.x, r.y, 20);
    });
    let prev = route[i];
    // i = 0 → 1, i = 1 → 2, i = 2 → 0
    let next = route[(i + 1) % route.length];

    x = interpolate(prev.x, next.x, t);
    y = interpolate(prev.y, next.y, t);
    circle(x,y,20);
    t += 0.01;
    if(t >= 1) {
        t = 0;
        i++;
        i %= route.length;
    }
    

    
}

function interpolate(min, max, t) {
    return min + (max - min) * t;
}

