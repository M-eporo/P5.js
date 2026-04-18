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
let amp;
let webPG;
let div, divX, button, body;

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

function windowResized(){
    setup();
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

    increaseCount = 120;

    player = new Player(playerImage);

    bg = new Background(backgroundImage);

    amp = new p5.Amplitude();
    amp.setInput(bgm);

    webPG = createGraphics(width, height);
    const webColor = color("#fff");
    webColor.setAlpha(10);
    webPG.stroke(webColor);
    drawWeb();   // webPG上への描画

    div = createDiv("Good Luck!");
    div.style("font-size", "30px").style("color", "#0fa");
    divX = width - 100;
    div.position(divX, 0);

    button = createButton("light mode");
    button.style("padding", "5px");
    button.position(windowWidth - 100, windowHeight - 35);

    body = select("body");

    loop();
}

function draw(){
    // image(backgroundImage, width/2, height/2, width, height);
    bg.draw();
    bgmVolumeRect();   // bgmの音量に合わせた四角形を描画
    drawScore();
    if(state === "playing"){
        bg.update();
        player.draw();
        player.update();
        bluebatsControl();
        if(player.dead) playing = false;
        updateState();
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
        explosionsControl();

        if(player.bullets){
            player.bullets.forEach(bullet => {
                bullet.draw();
                bullet.update();
            })
        }

        shootBluebat();
        collide();
        invaded();
        levelUp();
    }
    drawMessage();
    image(webPG, width/2, height/2);

    scrollDiv();
    toggleMode();
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

    if(keyCode === 68){   // "D"
        saveCanvas(canvas, `canvas_${frameCount}`, "png");
        clickSound.play();
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
        // messagePG.fill("#38f");
        const from = color("red");
        const to = color("blue");
        const colour = lerpColor(from, to, frameCount % 200 / 199);
        messagePG.fill(colour);
        messagePG.text("Bluebat Hunting!", width/2-width/20, height*2/5-height/20);
        messagePG.textSize(60);
        messagePG.fill("#ed225d");
        messagePG.text("Press Space to Start", width/2-width/20, height*3/4-height/20);
        image(messagePG, width/2, height/2);
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
        storedDataControl();
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
                bullet.hit = true;
                deadSound.play();
                explosions.push(new Explosion(bullet.x, bullet.y, explosionImage));
                score += 200;
                bluebat.shooted();
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
            player.x -= 50;
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
    let data = getItem("bluebat_hunting");   // local storageのデータを取得
    if(!data) data = {"best_score" : 0};
    push();
    fill("#ff0");
    noStroke();
    textSize(40);
    if(data["best_score"] < score){
        text("Congratulations! New Record!", width/2, height/7);
        data["best_score"] = score;
        storeItem("bluebat_hunting", data);   // local storageにデータを保存
    }else{
        text(`The Best Score is ${data["best_score"]}`, width/2, height/7);
    }
    pop();
    drawScore();
    noLoop();
}

function levelUp(){
    if(increaseCount < 30) increaseCount = 30;
    else if(score % 5000 === 0 && 0 < score) increaseCount = round(increaseCount * 0.9, -1);   // 四捨五入
}

function bgmVolumeRect(){
    const level = amp.getLevel();   // 音量を取得
    // console.log(level);
    const size = map(level, 0, 0.01, 0, 400);   // 0.01未満であることを確認し、範囲を設定
    push();
    const colour = color("#48f");
    colour.setAlpha(200);
    stroke(colour);
    strokeWeight(5);
    noFill();
    rectMode(CENTER);
    rect(player.x, player.y, size, size);
    pop();
}

function drawWeb(){
    let lastX = 0;
    let lastY = 0;
    for(let i = 0; i < 5000; i++){
        const x = floor(width * random());   // 切り捨て。整数値に
        const y = floor(height * random());
        webPG.line(lastX, lastY, x, y);
        lastX = x;
        lastY = y;
    }
}

function scrollDiv(){
    divX -= 3;
    div.position(divX, 0);
    if(divX < 0) divX = width - 100;
}

function toggleMode(){
    button.mouseClicked(() => {
        if(button.html() === "light mode"){
            button.html("dark mode");
            body.style("background", "#aaa");
        }else{
            button.html("light mode");
            body.style("background", "#222");
        }
    })
}