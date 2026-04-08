let bullets = [];
function setup() {
    createCanvas(windowWidth, windowHeight);
    noStroke();
    fill(50);
}

function draw() {
    clear();

    if(frameCount % 60 === 0) {
        const baseAngle = atan2(mouseY, mouseX - width / 2);
        const dir = [-1, 1];
        // 1発目はまっすぐ
        // 2, 3発目は少し左右に
        // 4, 5発目はさらに左右に広げる
        // どれだけ角度をずらすか
        // iが0の時、0.1 * 0 = 0ラジアン
        // iが1の時、0.1 * 1 = 0.1ラジアン
        // iが2の時、0.1 * 2 = 0.2ラジアン
        for(let i = 0; i < 3; i++) {

            const n = i === 0 ? 1 : 2;

            // 真ん中は1発だけ、左右に振るときは2発ずつにする
            // i = 0の時、nは1なので、j = 0だけ
            // iが0を超えるときは、nは2なので、j = 0, 1
            for(let j = 0; j < n; j++) {
                // 0.1 * i どれだけずらすか
                // dir[j] 左にずらすか、右にずらすか
                const angle = baseAngle + 0.1 * i * dir[j];
                const bullet = new Bullet(width / 2, 0, angle, 10);
                bullets.push(bullet);
            }
        }
    }

    for (let i = 0; i < bullets.length; i++) {
        const bullet = bullets[i];
        bullet.update();
        bullet.display();
    }

    // bullets = bullets.filter((bullet) => {
    //     return bullet.x >= 0 && bullet.x < width && bullet.y >= 0 && bullet.y < height;
    // });
}
class Bullet {
    constructor(x, y, angle, speed) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.speed = speed;
    }
    update() {
        this.x += cos(this.angle) * this.speed;
        this.y += sin(this.angle) * this.speed;
    }
    display() {
        circle(this.x, this.y, 10);
    }
}