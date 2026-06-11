class Explosion {
    constructor(x, y, img) {
        this.x = x;
        this.y = y;
        this.img = img;
        this.w = this.img.width / 3;
        this.h = this.img.height / 3;
        this.spriteX = 0;
        this.spriteY = 0;
        this.show = true;
    }

    draw() {
        // 切り取り開始位置 = this.spriteX * this.w
        // 切り取る幅 = 1つ当たりの画像のサイズ
        image(this.img, this.x, this.y, this.w, this.h, this.spriteX * this.w, this.spriteY * this.h, this.w, this.h);
    }

    update() {
        this.spriteX += 1;
        if(this.spriteX > 3) {
            this.spriteX = 0;
            this.spriteY += 1
            if(this.spriteY > 3) this.show = false;
        }
    }
}