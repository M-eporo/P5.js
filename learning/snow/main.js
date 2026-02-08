let snowFlakes = [];
function setup() {
    createCanvas(400, 600);
    angleMode(DEGREES);
    for(let i = 0; i < 300; i++) {
        snowFlakes.push(new SnowFlakes());
    }
}

function draw() {
    background(0);
    //60fps想定 経過時間
    let currentTime = frameCount / 60;
    for(let snow of snowFlakes) {
        snow.update(currentTime);
        snow.display();
    }
}

class SnowFlakes {
    constructor() {
        this.posX = 0;
        this.posY = random(-height, 0);
        //雪ごとにランダムな スタート角度を設定 同じ動きをしない
        this.initialAngle = random(0, 360);
        this.size = random(2, 5);
        //this.radius = random(width / 2)とすると、半径が 均等に分布、結果：外側に雪が多くなる
        //画面中央を中心とした円の中に、均等な密度で雪をばらまく
        this.radius = sqrt(random(pow(width / 2, 2)));
        this.color = color(random(200, 256), random(200, 256), random(200, 256));
    }

    //角速度ω = Θ / T  (1秒あたりにどれだけ角度が変わるか)
    //角度Θ = 角速度ω * T
    update(time) {
        //35度 / 秒
        let angularSpeed = 35;
        //時間が進むごとに角度が増える
        let angle = this.initialAngle + angularSpeed * time;
        this.posX = width / 2 + this.radius * sin(angle);
        let ySpeed = 8 / this.size;
        this.posY += ySpeed;

        if(this.posY > height) {
            this.posY = -50;
        }
    }

    display() {
        fill(this.color);
        noStroke();
        ellipse(this.posX, this.posY, this.size);
    }
}