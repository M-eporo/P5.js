const size = 10;
function setup() {
    createCanvas(windowWidth, windowHeight);
    noStroke();
    const xn = ceil(width / size);
    const yn = ceil(height / size);
    for(let y = 0; y < yn; y++) {
        for(let x = 0; x < xn; x++) {
            const v = noise(x / 100, y / 100);
            fill(v * 255);
            rect(x * size, y * size, size, size)
        }
    }
}