const maxNum = 60;
const speed = 4;
const circles = [];
function setup() {
    createCanvas(windowWidth, windowHeight);
    noFill();
    stroke(230);
    for(let i = 0; i < maxNum; i++) {
        const circle = {
            x: width / 2,
            y: height / 2,
            radius: 60 + i * 12,
        };
        circles.push(circle);
    }
}

function draw() {
    background(50);
    circles.forEach((circle, index) => {
        if(index === 0) {
            circle.y += (mouseY - circle.y) / speed;
        }else{
            const prev = circles[index - 1];
            circle.y += (prev.y - circle.y) / speed;
        }
        ellipse(circle.x, circle.y, circle.radius, circle.radius / 2);
    });
}