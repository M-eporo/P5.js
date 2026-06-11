
let canvas;
let bluebatImage;
let backgroundImage;
let clickSound, bgm, deadSound;
let playing;
let state;
let messagePG;
let bluebats;
let explosions, explosionImage;
let horrorFont, bloodOverlay;

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
    messagePG = createGraphics(width * 9 / 10, height * 9 / 10);
    messagePG.colorMode(RGB, 255, 255, 255, 1);
    messagePG.background(0, 0, 0, 0.7);
    messagePG.textFont(horrorFont);

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
    text(`messagePG.width: ${messagePG.width}`, 20, 20);
    text(`w: ${width}`, 20, 40);
    text(`元のサイズ: ${bluebatImage.width}`, 20, 60);
    pop();

    drawScore();
    // 5回クリックしたときの画像サイズよりも、現在の画像サイズが大きいときに描画
    if(state === "playing") {
        bluebats.forEach((bluebat, index) => {
            bluebat.draw();
            bluebat.update();
        });
        if(explosions.length) {
            explosions.forEach((explosion) => {
                explosion.draw();
                explosion.update();
            });
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
        bluebats.forEach((bluebat, index) => {
            const bluebatIsClicked = dist(bluebat.cx, bluebat.cy, mouseX, mouseY) < bluebat.w * 0.7 / 2;
            if(bluebatIsClicked) {
                clickSound.play();
                score += 2000;
                bluebat.clicked();
                // 現在の画像サイズが、5回クリックしたときの画像サイズ以下の時にデッドサウンド
                if(bluebat.dead) {
                    deadSound.play();
                    // playing = false;
                }
                explosions.push(new Explosion(mouseX, mouseY, explosionImage))
            }
        });
        bluebatsControl();
        if(!bluebats.length) playing = false;
        updateState();
    }
}

// function moveBluebat() {
    
// }

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
        messagePG.image(bloodOverlay,0, 0, width * 9 / 10, height * 9 / 10);
        messagePG.textAlign(CENTER, CENTER);
        messagePG.textSize(80);
        messagePG.fill("#38f");
        messagePG.text("Bluebat Hunting!", messagePG.width / 2, messagePG.height * 2 / 5);
        messagePG.textSize(60);
        messagePG.fill("#ed225d");
        messagePG.text("Press Space to Start", messagePG.width / 2, messagePG.height * 3 / 4);
        image(messagePG, width / 2, height / 2);
    }
    if(state === "end") {
        const colour = color("#ED225D");
        colour.setAlpha(200);
        push();
        fill(colour);
        stroke(colour);
        text("Cleared!\nPress Space to Restart.", width / 2, height / 4);
        pop();
        textSize(70);
    }
}

// !playing && !bluebat.dead => スタート画面
// playing && !bluebat.dead => プレイ中
// playing && bluebat.dead => ブルーバットが倒された瞬間
// !playing && bluebat.dead => 終了画面

// !playing && bluebats.length => スタート画面
// playing && bluebat.length => プレイ中
// playing && !bluebat.length => ブルーバットが倒された瞬間
// !playing && !bluebat.length => 終了画面
function updateState() {
    if(!playing && bluebats.length) state = "start";
    else if(playing && bluebats.length) state = "playing";
    else if(playing && !bluebats.length) state = "clear"
    else if(!playing && !bluebats.length) state = "end";
}

function bluebatsControl() {
    bluebats = bluebats.filter((bluebat) => !bluebat.dead);
}

function explosionsControl() {
    explosions = explosions.filter(explosion => explosion.show);
}