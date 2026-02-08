function setup() {
    createCanvas(400, 400);
    colorMode(HSB);
    noStroke();

    let colorA = color(100, 90, 100);
    let colorB = color(250,80,20);
    //ストライプ数
    let stripeCount = 12;
    //高さをストライプの数で割って、各ストライプの高さを計算
    let stripeHeight = height / stripeCount;

    //各ストライプを描画するループ
    //lerpColor(interpolate from, interpolate to, amount: 0.0 - 1.0)
    for(let i = 0; i < height; i +=stripeHeight) {
        let fadeAmount = i / height;
        let betweenColor = lerpColor(colorA, colorB, fadeAmount);
        fill(betweenColor);
        rect(0, i, width, stripeHeight);
    }

    let margin = 5;
    let boxWidth = 60;
    let cornerRadius = 5;
    textAlign(CENTER, CENTER);
    fill(255);
    rect(margin, margin, boxWidth, stripeHeight - margin * 2, cornerRadius);
    fill(0);
    text('Color A', margin, margin, boxWidth, stripeHeight - margin * 2);
    fill(255);
    rect(
        5,
        height - stripeHeight + margin,
        boxWidth,
        stripeHeight - margin * 2,
        cornerRadius
    );
    fill(0);
    text(
        'Color B',
        5,
        height - stripeHeight + margin,
        60,
        stripeHeight - margin * 2
    );
}