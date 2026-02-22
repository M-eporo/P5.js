function setup() {
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB);
    angleMode(DEGREES);
    let n = 50;
    for(let x = 0; x < n; x++) {
        for(let y = 0; y < n ; y++) {
            const tx = width / (n - 1) * x;
            const ty = height / (n - 1) * y;
            circle(tx, ty, 10);
        }
    }
}