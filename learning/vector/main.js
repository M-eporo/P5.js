let mouse, origin;
function setup() {
    createCanvas(400,400);
}

function draw() {
    background(220);
    let cx = 200;
    let cy = 200;

    let dx = mouseX - cx;
    let dy = mouseY - cy;
    console.log(mouseX);
    // 三平方の定理
    let dist = sqrt(dx*dx + dy+dy);
    console.log("dist: " ,dist);
    let r = dist * 0.1;
    
    fill(200,100,100,1);
    circle(cx, cy,r);

}