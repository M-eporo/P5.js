
let canvas;
let bluebatImage, bloodOverlay, horrorFont, explosionImage;
let backgroundImage;
let clickSound, bgm, deadSound;
let score;
let playing;
let state;
let msgPg;
let bluebats, explosions;

function preload() {
    horrorFont = loadFont('./assets/MrHorror-Regular.otf');
    bluebatImage = loadImage('./assets/bluebat_spritesheet.png');
    explosionImage = loadImage('./assets/explosion_spritesheet.png');
    backgroundImage = loadImage('./assets/background.png');
    bloodOverlay = loadImage('./assets/BloodOverlay.png');
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
    score = 0;
    state = "start";
    msgPg = createGraphics(width * 9 / 10, height * 9 / 10);
    msgPg.textFont(horrorFont);
    msgPg.colorMode(RGB, 255, 255, 255, 1);
    msgPg.background(0, 0, 0, 0.7);

    bluebats = [];
    for(let i = 0; i < 3; i++) {
        bluebats.push(new Bluebat(bluebatImage));
    }
    explosions = [];
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
        bluebats.forEach(bluebat => {
            bluabat.draw();
            bluebat.update();
        });

        if(explosions.length) {
            explosionImage.draw();
            explosionImage.update();
        }
        explosionsControl();
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
    if(state === "playing") {
        bluebats.forEach(bluebat => {
            const bluebatIsClicked = dist(bluebat.cx, bluebat.cy, mouseX, mouseY) < bluebat.w * 0.7 / 2;
            if(bluebatIsClicked) {
                clickSound.play();
                score += 2000;
                bluebat.clicked();
                if(bluebat.dead) deadSound.play();
                explosions.push(new Explosion(mouseX, mouseY, explosionImage));
            }
        });
        bluebatsControl();
        if(!bluebats.length) playing = false;
        updateState();
    }                
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
    if(state === "start") {
        msgPg.image(bloodOverlay, width * 9 / 10, height * 9 / 10);
        msgPg.textAlign(CENTER, CENTER);
        msgPg.textSize(80);
        msgPg.fill("#38f");
        msgPg.text("Bluebat Hunting", msgPg.width / 2, msgPg.height / 2);
        messagePG.textSize(60);
        messagePG.fill("#ed225d");
        text("Press Space to Start", width / 2, height / 4);
        image(msgPg, width / 2, height / 2);
    }

    if(state === "end") {
        const colour = color("#ED225D");
        colour.setAlpha(200);
        push();
        fill(colour);
        stroke(colour);
        textSize(70);
        text("Cleared!\nPress Space to Restart.", width / 2, height / 4);
        pop();
    }

}

// !playing && !bluebatIsDead => スタート画面
//  playing && !bluebatIsDead => プレイ中
// playing && bluebatIsDead => ブルーバットが倒された習慣
// !playing && bluebatIsDead => 終了画面
function updateState() {
    if(!playing && bluebats.length) state = "start";
    else if(playing && bluebats.length) state = "playing";
    else if(playing && !bluebats.length) state = "clear"
    else if(!playing && !bluebats.length) state = "end";
}

function bluebatsControl() {
    bluebats = bluebats.filter(bluebat => !bluebat.dead);
}

function explosionControl() {
    explosions = explosions.filter(explodsion => explosionControl.show);
}