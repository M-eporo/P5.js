let n, hist, hist2, noiseX, noiseX2;
function setup() {
    createCanvas(windowWidth, windowHeight);
    stroke(50);
    noFill();

    n = width / 2;
    hist = [];
    hist2 = [];

    noiseX = 0;
    noiseX2 = 0;
}

function draw() {
    clear();
    hist.push(noise(noiseX) * height);
    hist2.push(noise(noiseX2) * height);

    noiseX += 0.01;
    noiseX2 += 0.03;

    if(hist.length > n) {
        hist.shift();
        hist2.shift();
    }

    let prev = hist[0];
    for(let i = 0; i < hist.length; i++) {
        const x = i;
        const y = hist[i];
        line(x, prev, x, y);
        prev = y;
    }

    translate(n, 0);
    prev = hist2[0];
    for(let i = 0; i < hist2.length; i++) {
        const x = i;
        const y = hist2[i];
        line(x, prev, x, y);
        prev = y;
    }
}