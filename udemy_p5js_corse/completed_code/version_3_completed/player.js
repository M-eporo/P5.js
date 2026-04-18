class Player{
    constructor(img){
        this.img = img;
        this.originalW = this.img.width/4;
        this.originalH = this.img.height;
        this.w = this.img.width/4/5;
        this.h = this.img.height/5;
        this.x = width/2;
        this.y = height/2;
        this.spriteX = 0;
        this.spriteY = 0;
        this.speed = 10;
        this.controlKeys = [83, 37, 38, 39, 40];   // "s", "ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown"
        this.keys = [];
        this.bullets = [];
        this.life = 300;
        this.dead = false;
    }

    draw(){
        this.drawLife();
        image(this.img, this.x, this.y, this.w, this.h, this.spriteX * this.originalW, this.spriteY * this.originalH, this.originalW, this.originalH);
    }

    update(){
        if(frameCount % 4 === 0){
            this.spriteX ++;
            if(3 < this.spriteX) this.spriteX = 0;
        }
        this.keyControl();
        this.move();
        this.shootControl();
    }

    move(){
        // if(keyIsPressed){
        //     if(keyCode === 37) this.x -= this.speed;
        //     if(keyCode === 38) this.y -= this.speed;
        //     if(keyCode === 39) this.x += this.speed;
        //     if(keyCode === 40) this.y += this.speed;
        // }
        if(0 < this.life){
            if(this.keys.includes(this.controlKeys[1])) this.x -= this.speed;
            if(this.keys.includes(this.controlKeys[2])) this.y -= this.speed;
            if(this.keys.includes(this.controlKeys[3])) this.x += this.speed;
            if(this.keys.includes(this.controlKeys[4])) this.y += this.speed;
    
            if(this.x <= this.w/2) this.x = this.w/2;
            if(width - this.w/2 < this.x) this.x = width - this.w/2;
            if(this.y <= this.h/2) this.y = this.h/2;
            if(height - this.h/2 < this.y) this.y = height - this.h/2;
        }else{   //     右下へ墜落
            this.x += 3;
            this.y += 3;
            if(height*2 < this.y) this.dead = true;   // lifeの数値ではなく、height*2を越えたらdeadをtrueにする
        }
    }

    keyControl(){
        this.controlKeys.forEach(key => {
            if(keyIsDown(key) && !this.keys.includes(key)) this.keys.push(key);
            if(!keyIsDown(key) && this.keys.includes(key)) this.keys.splice(this.keys.indexOf(key), 1);
        })
    }

    shootControl(){  // Bulletのインスタンスをbulletsリストを用いてここで管理
        if(this.keys.includes(this.controlKeys[0]) && frameCount % 10 === 0 && this.bullets.length < 5){
            this.bullets.push(new Bullet(bulletImage, this.x + this.w/2, this.y));
            clickSound.play();
        }
        this.bullets = this.bullets.filter(bullet => bullet.x < width*3/2);
        this.bullets = this.bullets.filter(bullet => !bullet.hit);
    }

    drawLife(){
        push();
        textSize(30);
        noStroke();
        fill("#fff");
        textAlign(LEFT, CENTER);
        text("LIFE", 20, 37);
        pop();

        push();
        noStroke();
        fill("#5f5");
        rect(100, 20, this.life, 30);
        pop();

        push();
        noFill();
        stroke("#060");
        strokeWeight(2);
        rect(100, 20, 300, 30);
        pop();
    }
}