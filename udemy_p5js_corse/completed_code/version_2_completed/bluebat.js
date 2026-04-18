class Bluebat{
    constructor(img){
        this.img = img;
        this.originalW = this.img.width/11;   // 11の画像がつながっているため
        this.originalH = this.img.height
        this.x = random()*width;
        this.y = random()*height;
        this.offsetValue = 0.05;
        this.centerOffset = this.originalW*this.offsetValue;
        this.cX = this.x - this.centerOffset;
        this.cY = this.y + this.centerOffset;
        this.w = this.originalW;
        this.h = this.img.height;
        this.speedX = 10 * random() * random([-1, 1]);   // random(ARRAY)はランダムチョイス
        this.speedY = 10 * random() * random([-1, 1]);
        this.dead = false;
        this.spriteX = 0;
        this.spriteY = 0;
    }

    draw(){
        if(this.speedX < 0){
            image(this.img, this.x, this.y, this.w, this.h, this.spriteX * this.originalW, this.spriteY * this.img.height, this.originalW, this.originalH);
            // image(PATH or LOADED_IMAGE, destinationX, destinationY, destinationWidth, destinationHeight,[subsectionX, subsectionY,] [subsectionWidth, subsectionHeight]);
            // 切り取りを開始する点、その幅、その高さを指定
            // 開始点をずらすことによりアニメーションを実現させる
            push();
            noFill();
            stroke("#f00");
            circle(this.cX, this.cY, this.w*0.7);
            pop();
        }else{
            push();
            translate(this.x, this.y);
            scale(-1, 1);
            image(this.img, 0, 0, this.w, this.h, this.spriteX * this.originalW, this.spriteY * this.img.height, this.originalW, this.originalH);
            // image(PATH or LOADED_IMAGE, destinationX, destinationY, destinationWidth, destinationHeight,[subsectionX, subsectionY,] [subsectionWidth, subsectionHeight]);
            noFill();
            stroke("#f00");
            circle(0 - this.centerOffset, 0 + this.centerOffset, this.w*0.7);
            pop();
        }
    }

    update(){
        this.x += this.speedX;
        this.y += this.speedY;
        this.cX = this.x - this.centerOffset;
        this.cY = this.y + this.centerOffset;
        if((0 < this.speedY && height < this.cY + this.w*0.7/2) || (this.speedY < 0 && this.cY - this.w*0.7/2 < 0)) this.speedY *= -1;
        if((0 < this.speedX && width < this.cX + this.w*0.7/2) || (this.speedX < 0 && this.cX - this.w*0.7/2 < 0)) this.speedX *= -1;

        if(frameCount % 2 === 0){
            this.spriteX += 1;
            if(10 < this.spriteX) this.spriteX = 0;
        }
    }

    clicked(){
        this.w *= 0.9;
        this.h *= 0.9;
        this.offsetValue *= 0.9;
        this.centerOffset = this.originalW*this.offsetValue;
        this.dead = this.w <= this.originalW*(0.9**5);
    }
}