function setup() {
    describe("敷き詰めた円にカラー円形グラデーションを適用する");
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB);
    angleMode(DEGREES);
    const n = 50;
    const maxDistance = dist(0,0,width / 2, height / 2);
    for(let x = 0; x < n; x++) {    
        for(let y = 0; y < n; y++) {
            const tx = width / (n - 1) * x;
            const ty = height / (n - 1) * y;
            const d = dist(tx, ty, width / 2, height / 2);
            const h = map(d, 0, maxDistance, 0, 360);
            fill(color(h,100,100));
            circle(tx, ty, 10);
        }
    }
}
