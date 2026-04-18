let canvas;
let backgroundImage, bluebatImage, x, y, cX, cY, bluebatIsClicked, speedX, speedY, centerOffset;
let clickSound, bgm, deadSound;
let score;
let w, h, offsetValue;
let bluebatIsDead;   // Bluebatが倒されたか否か
let playing;   // ゲームプレイ中であるか否か
let state;   // ゲームの状態を表す変数

function preload(){
    bluebatImage = loadImage("./assets/bluebat.png");   // https://bevouliin.com/category/free_game_asset/
    backgroundImage = loadImage("./assets/background.png")   // https://bevouliin.com/category/free_game_asset/
    clickSound = loadSound("./assets/click_sound.wav");   // https://www.soundjay.com/button-sounds-1.html
    clickSound.setVolume(0.3);
    deadSound = loadSound("./assets/dead_sound.mp3");   // https://soundeffect-lab.info/sound/anime/
    deadSound.setVolume(0.3);
    bgm = loadSound("./assets/background_music.ogg");   // https://opengameart.org/content/battle-music-0
    bgm.setVolume(0.05);
}

function setup(){
    bgm.loop();
    bgm.stop();   // BGMを最初から再生させるために完全停止させる
    
    canvas = createCanvas(windowWidth*9/10, windowHeight*9/10);
    // console.log(windowWidth);
    canvas.parent('p5_section');

    // frameRate(1);

    imageMode(CENTER);
    textAlign(CENTER, CENTER);

    bluebatIsDead = false;
    playing = false;

    x = width/2;
    y = height/2;
    offsetValue = 0.05;   // 目視により適切な数字に調整した
    centerOffset = bluebatImage.width*offsetValue;
    cX = x - centerOffset;   // ブルーバットの身体の中心
    cY = y + centerOffset;
    w = bluebatImage.width;
    h = bluebatImage.height;
    speedX = 5;
    speedY = 5;

    score = 0;

    state = "start";
}

function draw(){
    // background(255, 255, 0);
    // background("#ccc");
    image(backgroundImage, width/2, height/2, width, height);
    drawScore();
    if(state === "playing"){
        image(bluebatImage, x, y, w, h);
        push();
        noFill();
        // fill("#ff0");
        stroke("#f00");
        circle(cX, cY, w*0.7);
        pop();
        moveBluebat();
    }
    drawMessage();
}

function keyPressed(){
    // console.log(keyCode);   // keyCodeはこのように確認できる
    if(keyCode === 32){
        if(bgm.isPlaying()) bgm.pause();
        else bgm.play();

        if(state === "start") playing = true;
        updateState();   // playingが変更された場合にはstateの更新が必要
        if(state === "end") setup();
        }
}

function mouseClicked(){
    bluebatIsClicked = dist(cX, cY, mouseX, mouseY) < w*0.7/2;   // wは四角の画像全体の幅のため、目視で確認しながら0.7という数字を使った
    if(state === "playing" && bluebatIsClicked){
        clickSound.play();
        score += 2000;
        w *= 0.9;
        h *= 0.9;
        offsetValue *= 0.9;
        centerOffset = bluebatImage.width*offsetValue;
        bluebatIsDead = w <= bluebatImage.width*(0.9**5);
        updateState();   // bluebatIsDeadが変更された場合にはstateの更新が必要
        if(state === "clear"){
            deadSound.play();
            playing = false;
            updateState();   // playingが変更された場合にはstateの更新が必要
        }
    }
}

function moveBluebat(){
    x += speedX;
    y += speedY;
    cX = x - centerOffset;
    cY = y + centerOffset;
    if(height < cY + w*0.7/2 || cY - w*0.7/2 < 0) speedY *= -1;
    if(width < cX + w*0.7/2 || cX - w*0.7/2 < 0) speedX *= -1;
}

function drawScore(){
    const colour = color("#888");
    colour.setAlpha(150);   // デフォルトでは255が最大値（不透明）
    push();
    // colorMode(RGB, 255, 255, 255, 1);
    // fill(180, 180, 180, 0.7);
    // stroke(180, 180, 180, 0.7);
    fill(colour);
    stroke(colour);
    textSize(200);
    text(score, width/2, height/2);
    pop();
}

function drawMessage(){
    const colour = color("#ed225d");
    colour.setAlpha(200);
    push();
    fill(colour);
    stroke(colour);
    textSize(70);
    if(state === "start") text("Press Space to Start", width/2, height/4);
    if(state === "end") text(`Cleared!\nPress Space to Restart`, width/2, height/4);
    pop();
}

// / !playing && !bluebatIsDead => スタート画面
// / playing && !bluebatIsDead => プレイ中
// / playing && bluebatIsDead => ブルーバットが倒された瞬間
// / !playing && bluebatIsDead => 終了画面
function updateState(){
    if(!playing && !bluebatIsDead) state = "start";
    else if(playing && !bluebatIsDead) state = "playing";
    else if(playing && bluebatIsDead) state = "clear";
    else if(!playing && bluebatIsDead) state = "end";
}
// ゲームの状態管理はこのように別途まとめておくのがよい