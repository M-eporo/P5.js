function norm(v, min, max) {
    return (v - min) / (max - min);
}

function interpolate(min, max, t) {
    return min + (max - min) * t;
}

function map(v, minOrigin, maxOrigin, minNew, maxNew) {
    return (interpolate(minNew, maxNew, norm(v, minOrigin, maxOrigin)));
}
// 0～359の範囲の色相を、0～100の範囲の色相に変換する
//下限が0なので、h / 359 * 100 で簡潔に書ける
const newH = map(h, 0, 359, 0, 100);