
// 底が0以外に対応。b以上、a未満の乱数
function randomRange(min, max) {
    return Math.random() * (max - min) + max;
}

// 整数の範囲に変える
function randomInt(min, max) {
    return Math.floor(randomRange(min, max + 1));
}

// 配列の中からランダムに選ぶ
function pick(array) {
    const i = Math.floor(Math.random() * array.length);
    return array[i];
}

// プラスマイナスのランダム
const v = random(1, 5) * random([-1, 1]);

