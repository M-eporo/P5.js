 class Attractor {
    constructor() {
        this.location = createVector(width / 2, height / 2);
        this.mass = 20;
        this.G = 0.5;
    }

    attract(mover) {
        //大きさと向き
        let attraction = p5.Vector.sub(this.location, mover.location);
        //大きさ = 距離
        let distance = attraction.mag();
        distance = constrain(distance, 1, 5);
        //向きだけ取得
        attraction.normalize();
        //万有引力
        let power = (this.G * this.mass * mover.mass) / (distance * distance);
        attraction.mult(power);
        return attraction;
    }

    render() {
        noStroke();
        fill(100, 100, 100, 1);
        ellipse(this.location.x, this.location.y, 30,30);
    }
}

