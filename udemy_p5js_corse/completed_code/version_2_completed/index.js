let canvas;
let backgroundImage, bluebatImage;
let clickSound, bgm, deadSound;
let score;
let playing;
let state;
let messagePG;   // p5 Graphics
let bluebats;
let explosions, explosionImage;
let horrorFont, bloodOverlay;

function preload(){
    horrorFont = loadFont("./assets/MrHorror-Regular.otf")   // https://www.1001fonts.com/search.html?search=horror
    bluebatImage = loadImage("./assets/bluebat_spritesheet.png");   // https://bevouliin.com/category/free_game_asset/
    backgroundImage = loadImage("./assets/background.png")   // https://bevouliin.com/category/free_game_asset/
    explosionImage = loadImage("./assets/explosion_spritesheet.png");   // https://opengameart.org/content/
    bloodOverlay = loadImage("./assets/BloodOverlay.png")   // https://opengameart.org/content/blood-overlay
    clickSound = loadSound("./assets/click_sound.wav");   // https://www.soundjay.com/button-sounds-1.html
    clickSound.setVolume(0.3);
    deadSound = loadSound("./assets/dead_sound.mp3");   // https://soundeffect-lab.info/sound/anime/
    deadSound.setVolume(0.3);
    bgm = loadSound("./assets/background_music.ogg");   // https://opengameart.org/content/battle-music-0
    bgm.setVolume(0.05);
}

function setup(){
    bgm.loop();
    bgm.stop();
    
    canvas = createCanvas(windowWidth*9/10, windowHeight*9/10);
    // console.log(windowWidth);
    canvas.parent('p5_section');

    // frameRate(1);
    imageMode(CENTER);
    textAlign(CENTER, CENTER);

    playing = false;

    score = 0;

    state = "start";

    messagePG = createGraphics(width*9/10, height*9/10);
    messagePG.colorMode(RGB, 255, 255, 255, 1);
    messagePG.background(0, 0, 0, 0.7);
    messagePG.textFont(horrorFont);

    bluebats = [];
    for(let i = 0; i < 3; i++){
        bluebats.push(new Bluebat(bluebatImage));
    }

    explosions = [];
}

function draw(){
    // background("#ccc");
    image(backgroundImage, width/2, height/2, width, height);
    drawScore();
    if(state === "playing"){
        bluebats.forEach(bluebat => {
            bluebat.draw();
            bluebat.update();
        })
        if(explosions.length){
            explosions.forEach(explosion => {
                explosion.draw();
                explosion.update();
            })
        }
        explosionsControl();   // explosion.showがtrueのもののみにフィルタリング
    }
    drawMessage();
}

function keyPressed(){
    // console.log(keyCode);
    if(keyCode === 32){
        if(bgm.isPlaying()) bgm.pause();
        else bgm.play();

        if(state === "start") playing = true;
        updateState();
        if(state === "end") setup();
        }
}

function mouseClicked(){
    if(state === "playing"){
        bluebats.forEach(bluebat => {
            const bluebatIsClicked = dist(bluebat.cX, bluebat.cY, mouseX, mouseY) < bluebat.w*0.7/2;
            if(bluebatIsClicked){
                clickSound.play();
                score += 2000;
                bluebat.clicked();
                if(bluebat.dead){
                    deadSound.play();
                }
                explosions.push(new Explosion(mouseX, mouseY, explosionImage));
                // クリックしたらexplosionインスタンスをその場に作成
            }
        })

        bluebatsControl();   // bluebatsアレイをフィルタリング
        if(!bluebats.length) playing = false;
        updateState();
    }
}

function drawScore(){
    const colour = color("#888");
    colour.setAlpha(150);
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
    if(state === "start"){
        messagePG.image(bloodOverlay, 0, 0, width*9/10, height*9/10);
        messagePG.textAlign(CENTER, CENTER);
        messagePG.textSize(80);
        messagePG.fill("#38f");
        messagePG.text("Bluebat Hunting!", width/2-width/20, height*2/5-height/20);
        messagePG.textSize(60);
        messagePG.fill("#ed225d");
        messagePG.text("Press Space to Start", width/2-width/20, height*3/4-height/20);
        image(messagePG, width/2, height/2);   // 上記まではmessagePGの設定。実際の描画はimageで行う
    }
    if(state === "end"){
        const colour = color("#ed225d");
        colour.setAlpha(200);
        push();
        fill(colour);
        stroke(colour);
        textSize(70);
        text(`Cleared!\nPress Space to Restart`, width/2, height/4);
        pop();
    }
}

// / !playing && !bluebatIsDead => スタート画面
// / playing && !bluebatIsDead => プレイ中
// / playing && bluebatIsDead => ブルーバットが倒された瞬間
// / !playing && bluebatIsDead => 終了画面
// / !playing && bluebats.length => スタート画面
// / playing && bluebats.length => プレイ中
// / playing && !bluebats.length => ブルーバットが倒された瞬間
// / !playing && !bluebats.length => 終了画面
function updateState(){
    if(!playing && bluebats.length) state = "start";
    else if(playing && bluebats.length) state = "playing";
    else if(playing && !bluebats.length) state = "clear";
    else if(!playing && !bluebats.length) state = "end";
}

function bluebatsControl(){
    bluebats = bluebats.filter(bluebat => !bluebat.dead);
}

function explosionsControl(){
    explosions = explosions.filter(explosion => explosion.show);
}