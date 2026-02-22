function setup() {
    describe("敷き詰めた円にカラーグラデーションを適用する");
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB);
    angleMode(DEGREES);
    const n = 50;
    for(let x = 0; x < n; x++) {    
        for(let y = 0; y < n; y++) {
            const tx = width / (n - 1) * x;
            const ty = height / (n - 1) * y;
            const h = map(tx, 0, width, 0, 360);
            const s = map(ty, 0, height, 0, 100);
            fill(color(h,s,100));
            circle(tx, ty, 10);
        }
    }
}
