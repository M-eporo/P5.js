class Bluebat {
    constructor(img) {
        this.img = img;
        this.originalW = this.img.width / 11;
        this.originalH = this.img.height;
        this.x = random() * width / 2;
        this.y = random() * height / 2;
        this.w = this.originalW;
        this.h = this.img.height;
        this.offsetValue = 0.05;
        this.centerOffset = this.originalW * this.offsetValue;
        this.cx = this.x - this.centerOffset;
        this.cy = this.y + this.centerOffset;
        this.speedX = 10 * random() * random([-1, 1]);
        this.speedY = 10 * random() * random([-1, 1]);
        this.dead = false;
        this.spriteX = 0;
        this.spriteY = 0;
    }

    draw() {
        if(this.speedX < 0) {
            image(this.img, this.x, this.y, this.w, this.h, this.spriteX * this.originalW, this.spriteY * this.originalH, this.originalW, this.originalH);
            // image(PATH or LOADED_IMAGE, destinationX, destinationY, destinationWidth, destinationHeight,[subsectionX(区切り位置), subsectionY(区切り位置),] [subsectionWidth, subsectionHeight]);
            push();
            noFill();
            stroke("#f00");
            circle(this.cx, this.cy, this.w * 0.7);
            pop();
        } else {
            push();
            translate(this.x, this.y);
            scale(-1, 1);
            image(this.img, 0, 0, this.w, this.h, this.spriteX * this.originalW, this.spriteY * this.originalH, this.originalW, this.originalH);
            // image(PATH or LOADED_IMAGE, destinationX, destinationY, destinationWidth, destinationHeight,[subsectionX(区切り位置), subsectionY(区切り位置),] [subsectionWidth, subsectionHeight]);
            noFill();
            stroke("#f00");
            circle(0 - this.centerOffset, 0 + this.centerOffset, this.w * 0.7);
            pop();
        }
        
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.cx = this.x - this.centerOffset;
        this.cy = this.y + this.centerOffset;
        if((0 < this.speedY && height < this.cy + this.w * 0.7 / 2) || (this.speedY < 0 && this.cy - this.w * 0.7 / 2 < 0)) this.speedY *= -1;
        if((0 < this.speedX && width < this.cx + this.w * 0.7 / 2) || (this.speedX < 0 && this.cx - this.w * 0.7 / 2 < 0)) this.speedX *= -1;

        if(frameCount % 2 === 0) {
            this.spriteX += 1;
            if(this.spriteX > 10) {
                this.spriteX = 0;
            }
        }
    }

    clicked() {
        this.w *= 0.9;
        this.h *= 0.9;
        this.offsetValue *= 0.9;
        this.centerOffset = this.originalW * this.offsetValue;
        this.dead = this.w <= this.originalW * (0.9 ** 5);
    }
}