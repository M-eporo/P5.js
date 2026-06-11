let bluebat_image;
let background_image;
let click_sound, dead_sound, bgm;
let canvas;
let playing;
let x, y, w, h;
let offset_value, center_offset, cx, cy;
let speed_x, speed_y;
let bluebat_is_clicked;
let bluebat_is_dead;
let state;
let score;

function preload() {
    bluebat_image = loadImage('./assets/bluebat.png');
    background_image = loadImage('./assets/background.png');
    click_sound = loadSound('./assets/click_sound.wav');
    click_sound.setVolume(0.3);
    dead_sound = loadSound('./assets/dead_sound.mp3');
    dead_sound.setVolume(0.3);
    bgm = loadSound('./assets/background_music.ogg');
    bgm.setVolume(0.05);
}

function setup() {
    canvas = createCanvas(windowWidth *  9 / 10, windowHeight * 9 / 10);
    canvas.parent('p5_section');
    imageMode(CENTER);
    textAlign(CENTER, CENTER);
    bgm.loop();
    bgm.stop();
    playing = false;
    x = width / 2;
    y = height / 2;
    w = bluebat_image.width;
    h = bluebat_image.height;
    offset_value = 0.05;
    center_offset = w * offset_value;
    cx = x - center_offset;
    cy = y + center_offset;
    speed_x = 5;
    speed_y = 5;
    bluebat_is_dead = false;
    state = "start";
    score = 0;
}

function draw() {
    image(background_image, width / 2, height / 2, width, height);
    push();
    textAlign(LEFT, CENTER);
    text(bluebat_image.width, 20, 20);
    text(w, 20, 40);
    pop();

    drawScore();

    if(state === "playing") {
        image(bluebat_image,x, y, w, h);
        push();
        noFill();
        stroke("red");
        circle(cx, cy, w * 0.7);
        pop();
        moveBluebat();
    }

    drawMessage();
}

function keyPressed() {
    if(keyCode === 32) {
        if(bgm.isPlaying()) {
            bgm.pause();
        } else {
            bgm.play();
        }
        if(state === "start") {
            playing = true;        
        }
        updateState();
        if(state === "end") {
            setup();
        }
    }
}

function mouseClicked() {
    bluebat_is_clicked = dist(cx, cy, mouseX, mouseY) < (w * 0.7) / 2;
    if(state === "playing" &&bluebat_is_clicked) {
        click_sound.play();
        score += 2000;
        w *= 0.9;
        h *= 0.9;
        offset_value *= 0.9;
        center_offset = bluebat_image.width * offset_value;
        bluebat_is_dead = w < (bluebat_image.width * (0.9 ** 5));
        updateState();
        if(state === "clear") {
            dead_sound.play();
            playing = false;
            updateState();
        }
    }

}

function moveBluebat() {
    x += speed_x;
    y += speed_y;
    cx = x - center_offset;
    cy = y + center_offset;
    if(cx - (w * 0.7) / 2 < 0 || cx + (w * 0.7) / 2 > width) speed_x *= -1;
    if(cy - (h * 0.7) / 2 < 0 || cy + (h * 0.7) / 2 > height) speed_y *= -1;
}

function updateState() {
    if(!playing && !bluebat_is_dead) state = "start";
    if(playing && !bluebat_is_dead) state = "playing";
    if(playing && bluebat_is_dead) state = "clear";
    if(!playing && bluebat_is_dead) state = "end";
}

function drawScore() {
    const colour = color("#888");
    colour.setAlpha(150);
    push();
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