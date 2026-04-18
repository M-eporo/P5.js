class Background{
    constructor(img){
        this.img = img;
        this.x = 0;
        this.y = 0;
        this.speed = -4;
    }

    draw(){
        push();
        imageMode(CORNER);
        image(this.img, this.x, this.y, width, height);
        image(this.img, this.x+width, this.y, width, height);
        pop();
    }

    update(){
        this.x += this.speed;
        if(this.x <= -width) this.x = 0;
    }
}