let canvas;
let backgroundImage, bluebatImage;
let clickSound, bgm, deadSound;
let score;
let playing;
let state;
let messagePG;
let bluebats;
let explosions, explosionImage;
let horrorFont, bloodOverlay;
let increaseCount;
let player, playerImage;
let bulletImage;
let vanishSound;
let collideSound;
let bg;

function preload(){
    horrorFont = loadFont("./assets/MrHorror-Regular.otf")   // https://www.1001fonts.com/search.html?search=horror
    bluebatImage = loadImage("./assets/bluebat_spritesheet.png");   // https://bevouliin.com/category/free_game_asset/
    backgroundImage = loadImage("./assets/background.png")   // https://bevouliin.com/category/free_game_asset/
    explosionImage = loadImage("./assets/explosion_spritesheet.png");   // https://opengameart.org/content/
    playerImage = loadImage("./assets/player.png");   // https://opengameart.org/content/game-characters-flying-birds-attack-sprite-sheets
    bulletImage = loadImage("./assets/bullet.png");
    bloodOverlay = loadImage("./assets/BloodOverlay.png")   // https://opengameart.org/content/blood-overlay
    clickSound = loadSound("./assets/click_sound.wav");   // https://www.soundjay.com/button-sounds-1.html
    clickSound.setVolume(0.3);
    deadSound = loadSound("./assets/dead_sound.mp3");   // https://soundeffect-lab.info/sound/anime/
    deadSound.setVolume(0.3);
    vanishSound = loadSound("./assets/vanish_sound.mp3");
    collideSound = loadSound("./assets/collision_sound.mp3");   // https://soundeffect-lab.info/sound/anime/
    collideSound.setVolume(0.3);
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

    increaseCount = 120;   // 120フレーム毎にBluebatを追加

    player = new Player(playerImage);

    bg = new Background(backgroundImage);

    loop();
}

function draw(){
    // image(backgroundImage, width/2, height/2, width, height);
    bg.draw();   // bgをスクロールさせる
    drawScore();
    if(state === "playing"){
        bg.update();
        player.draw();
        player.update();
        bluebatsControl();   // bluebatインスタンスをフィルタリング
        if(player.dead) playing = false;   // height*2以上になったらdead
        updateState();   // playingが変更された場合にはstateの更新が必要
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
        explosionsControl();   // explosionインスタンスをフィルタリング

        if(player.bullets){
            player.bullets.forEach(bullet => {
                bullet.draw();
                bullet.update();
            })
        }

        shootBluebat();   // bulletとbluebatの衝突
        collide();   // playerとbluebatの衝突
        invaded();   // bluebatを後ろに逃した時
    }
    drawMessage();
}

function keyPressed(){
    // console.log(keyCode);
    if(keyCode === 32){
        if(bgm.isPlaying()) bgm.pause();
        else bgm.play();

        if(state === "start") playing = true;
        updateState();   // playingが変更された場合にはstateの更新が必要
        if(state === "end") setup();
        }
}

// function mouseClicked(){
//     if(state === "playing"){
//         bluebats.forEach(bluebat => {
//             const bluebatIsClicked = dist(bluebat.cX, bluebat.cY, mouseX, mouseY) < bluebat.w*0.7/2;
//             if(bluebatIsClicked){
//                 clickSound.play();
//                 score += 2000;
//                 bluebat.clicked();
//                 if(bluebat.dead){
//                     deadSound.play();
//                     // playing = false;
//                 }
//                 explosions.push(new Explosion(mouseX, mouseY, explosionImage));
//             }
//         })
//         bluebatsControl();
//         if(!bluebats.length) playing = false;
//         updateState();
//     }
// }

// function moveBluebat(){
// }

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
        // canvasではなくmessagePG上の座標
        messagePG.text("Bluebat Hunting!", width/2-width/20, height*2/5-height/20);
        messagePG.textSize(60);
        messagePG.fill("#ed225d");
        messagePG.text("Press Space to Start", width/2-width/20, height*3/4-height/20);
        image(messagePG, width/2, height/2);   // canvas上の座標
    }
    if(state === "end"){
        const colour = color("#ed225d");
        colour.setAlpha(200);
        push();
        fill(colour);
        stroke(colour);
        textSize(70);
        text("Your Final Score is", width/2, height/4);
        text("Press Space to Restart", width/2, height*3/4);
        pop();
        storedDataControl();   // local storageのデータを取得して表示
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
    if(!playing && !player.dead) state = "start";
    else if(playing && !player.dead) state = "playing";
    else if(playing && player.dead) state = "clear";
    else if(!playing && player.dead) state = "end";
}

function bluebatsControl(){
    if(frameCount % increaseCount === 0){
        bluebats.push(new Bluebat(bluebatImage));
    }
    bluebats = bluebats.filter(bluebat => -100 < bluebat.x);
    bluebats = bluebats.filter(bluebat => !bluebat.dead);
}

function explosionsControl(){
    explosions = explosions.filter(explosion => explosion.show);
}

function shootBluebat(){
    player.bullets.forEach(bullet => {
        bluebats.forEach(bluebat =>{
            const shooted = dist(bullet.x, bullet.y, bluebat.cX, bluebat.cY) < bluebat.w/3;
            if(shooted){
                bullet.hit = true;   // trueになるとフィルターで削除
                deadSound.play();
                explosions.push(new Explosion(bullet.x, bullet.y, explosionImage));
                score += 200;
                bluebat.shooted();   // shootされた時のbluebatのサイズ縮小など
                if(bluebat.dead) vanishSound.play();
            }
        })
    })
}

function collide(){
    bluebats.forEach(bluebat => {
        const collided = dist(player.x, player.y, bluebat.cX, bluebat.cY) < bluebat.w/2;
        if(collided){
            bluebat.dead = true;
            // bluebatsControl();
            player.x -= 50;   // 50左方向に下がる
            player.life -= 30;
            if(player.life <= 0){
                player.life = 0;
            }
            push();
            const colour = color("#f00");
            colour.setAlpha(150);
            fill(colour);
            noStroke();
            circle(player.x, player.y, player.w*1.5);
            pop();

            collideSound.play();
        }
    })
}

function invaded(){
    bluebats.forEach(bluebat => {
        if(bluebat.x < 0){
            bluebat.dead = true;
            // bluebatsControl();
            player.life -= 30;
            if(player.life <= 0){
                player.life = 0;
            }
            push();
            const colour = color("#f00");
            colour.setAlpha(150);
            fill(colour);
            noStroke();
            rect(0, 0, width, height);
            pop();
            collideSound.play();
        }
    })
}

function storedDataControl(){
    let data = getItem("bluebat_hunting");
    if(!data) data = {"best_score" : 0};   // dataがnullの場合、新規のオブジェクトを代入
    push();
    fill("#ff0");
    noStroke();
    textSize(40);
    if(data["best_score"] < score){
        text("Congratulations! New Record!", width/2, height/7);
        data["best_score"] = score;
        storeItem("bluebat_hunting", data);   // key("bluebat_hunting")に保存するvalueを指定
    }else{
        text(`The Best Score is ${data["best_score"]}`, width/2, height/7);
    }
    pop();
    drawScore();
    noLoop();
}