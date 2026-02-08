let locationX = 0
let locationY = 0;
let velocityX = 0;
let velocityY = 0;
let accelX;

function setup() {
    frameRate(15);
    createCanvas(500, 500);
    colorMode(HSB);
    locationX = width / 2;
    locationY = height / 2;
    velocityX = 10;
    velocityY = 5;
    accelX = -0.1;
}

function draw() {
    noStroke();
    background("#000");
    fill(200,100,100,1);
    ellipse(locationX, locationY, 80, 80);

    velocityX += accelX;
    locationX += velocityX;
    // locationY += velocityY;
    if(locationX > width) {
        locationX = 0;
    }
    // if(locationX > width || locationX < 0) {
    //     velocityX *= -1;
    // }
    // if(locationY > height || locationY < 0) {
    //     velocityY *= -1;
    // }
    console.log(velocityX);
}