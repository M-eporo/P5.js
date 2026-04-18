class Explosion{
    constructor(x, y, img){
        this.x = x;
        this.y = y;
        this.img = img;
        this.w = this.img.width/3;
        this.h = this.img.height/3;
        this.spriteX = 0;
        this.spriteY = 0;
        this.show = true;   // 一巡したら表示を終了させる
    }

    draw(){
        image(this.img, this.x, this.y, this.w, this.h, this.spriteX * this.w, this.spriteY * this.h, this.w, this.h);
    }

    update(){
        this.spriteX += 1;
        if(3 < this.spriteX){
            this.spriteX = 0;
            this.spriteY += 1;
            if(3 < this.spriteY) this.show = false;
        }
    }
}