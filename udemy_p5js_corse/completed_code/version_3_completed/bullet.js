class Bullet{
    constructor(img, x, y){
        this.img = img;
        this.x = x;
        this.y = y;
        this.speed = 15;
        this.hit = false;
    }

    draw(){
        image(this.img, this.x, this.y, 100, 100);
    }

    update(){
        this.x += this.speed;
    }
}