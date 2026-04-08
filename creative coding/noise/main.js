let n, noiseX, histL, histR;
function setup() {
    createCanvas(windowWidth, windowHeight);
    stroke(50);
    noFill();
    n = width / 2;
    noiseX = 0;
    histL = [];
    histR = [];
}

function draw() {
    clear();
    histL.push(noise(noiseX) * height);
    histR.push(random() * height);
    noiseX += 0.01;
    if(histL.lenght > n) {
        histL.shift();
        histR.shift();
    }
    let prev = histL[0];
    for(let i = 0; i < histL.length; i++) {
        const x = i;
        const y = histL[i];
        line(x, prev, x, y);
        prev = y;
    }
    translate(width / 2, 0);
    prev = histR[0];
    for(let i = 0; i < histR.length; i++) {
        const x = i;
        const y = histR[i];
        line(x, prev, x, y);
        prev = y;
    }
}