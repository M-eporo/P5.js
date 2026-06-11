
let canvas;
let bluebatImage;
let backgroundImage;
let clickSound, bgm, deadSound;
let x, y;
let centerOffset, offsetValue;
let cx, cy;
let bluebatIsClicked;
let speedX, speedY;
let score;
let w, h;
let bluebatIsDead;
let playing;
let state;

function preload() {
    bluebatImage = loadImage('./assets/bluebat.png');
    backgroundImage = loadImage('./assets/background.png');
    clickSound = loadSound('./assets/click_sound.wav');
    clickSound.setVolume(0.3);
    deadSound = loadSound('./assets/dead_sound.mp3');
    deadSound.setVolume(0.3);
    bgm = loadSound('./assets/background_music.ogg');
    bgm.setVolume(0.05);
}

function setup() {
    canvas = createCanvas(windowWidth * 9 / 10, windowHeight * 9 / 10);
    canvas.parent('p5_section');
    imageMode(CENTER);
    textAlign(CENTER, CENTER);
    bgm.loop();
    bgm.stop();
    playing = false;
    x = width / 2;
    y = height / 2;
    w = bluebatImage.width;
    h = bluebatImage.height;
    offsetValue = 0.05;
    centerOffset = w * offsetValue;
    cx = x - centerOffset;
    cy = y + centerOffset;
    speedX = 5;
    speedY = 5;
    score = 0;
    bluebatIsDead = false;
    state = "start";
}

function draw() {
    // background(255);
    image(backgroundImage, width / 2, height / 2, width, height);
    push();
    textAlign(LEFT, CENTER);
    text(`画像に0.9を5乗した数値: ${bluebatImage.width * (0.9 ** 5)}`, 20, 20);
    text(`w: ${w}`, 20, 40);
    text(`元のサイズ: ${bluebatImage.width}`, 20, 60);
    pop();

    drawScore();
    // 5回クリックしたときの画像サイズよりも、現在の画像サイズが大きいときに描画
    if(state === "playing") {
        image(bluebatImage, x, y, w, h);
        push();
        noFill();
        stroke("#f00");
        circle(cx, cy, w * 0.7);
        pop();
        moveBluebat();
    }
    drawMessage();
}

function keyPressed() {
    if(keyCode === 32) {
        if(bgm.isPlaying()) bgm.pause();
        else bgm.play();

        if(state === "start") playing = true;
        updateState();
        if(state === "end") setup();
    }

}

function mouseClicked() {
    bluebatIsClicked = dist(cx, cy, mouseX, mouseY) < w * 0.7 / 2;
    if(state === "playing" && bluebatIsClicked) {
        clickSound.play();
        score += 2000;
        w *= 0.9;
        h *= 0.9;
        offsetValue *= 0.9;
        // なぜw * offsetValueではないのか？ => 画像サイズが変わるたびに、中心からのオフセット値も変わるため、現在の画像サイズに対してオフセット値を計算する必要がある。
        // bluebatImage.width = 200  offsetValue = 0.045 = 9pxずらす
        // w = 180 offsteValue = 0.045 = 8.1pxずらす
        // 状態	            w	    offset_value	bluebat_image.width * offset_value	w * offset_value
        // 最初	            200	    0.05	        10	                                0
        // 1回クリック	    180	    0.045	        9	                                8.1
        // 2回クリック	    162	    0.0405	        8.1	                                6.561
        // 3回クリック	    145.8	0.03645	        7.29	                            5.314   








        centerOffset = bluebatImage.width * offsetValue;
        bluebatIsDead = w <= bluebatImage.width * (0.9 ** 5);
        updateState();
        // 現在の画像サイズが、5回クリックしたときの画像サイズ以下の時にデッドサウンド
        if(state === "clear") {
            deadSound.play();
            playing = false;
            updateState();
        }
    }
}

function moveBluebat() {
    x += speedX;
    y += speedY;
    cx = x - centerOffset;
    cy = y + centerOffset;
    if(height < cy + w * 0.7 / 2 || cy - w * 0.7 / 2 < 0) speedY *= -1;
    if(width < cx + w * 0.7 / 2 || cx - w * 0.7 / 2 < 0) speedX *= -1;
}

function drawScore() {
    const colour = color("#888");
    // default max 255
    colour.setAlpha(150);
    push();
    // colorMode(RGB, 255,255,255,1);
    // fill(180,180,180,0.7);
    // stroke(180,180,180,0.7);
    fill(colour);
    stroke(colour);
    textSize(200);
    text(score, width / 2, height / 2);
    pop();
}

function drawMessage() {
    const colour = color("#ED225D");
    colour.setAlpha(200);
    push();
    fill(colour);
    stroke(colour);
    textSize(70);
    if(state === "start") text("Press Space to Start", width / 2, height / 4);
    if(state === "end") text("Cleared!\nPress Space to Restart.", width / 2, height / 4);
    pop();

}

// !playing && !bluebatIsDead => スタート画面
//  playing && !bluebatIsDead => プレイ中
// playing && bluebatIsDead => ブルーバットが倒された習慣
// !playing && bluebatIsDead => 終了画面
function updateState() {
    if(!playing && !bluebatIsDead) state = "start";
    else if(playing && !bluebatIsDead) state = "playing";
    else if(playing && bluebatIsDead) state = "clear"
    else if(!playing && bluebatIsDead) state = "end";
}