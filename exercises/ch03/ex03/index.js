export function equalCheckNum(x , y) {
    //10^-10の桁まで見る
    x = x*10;
    y = y*10;
    x = Math.round(x);
    y = Math.round(y);
    x = x / 10;
    y = y / 10;
    return x === y;
}

console.log(equalCheckNum(1, 1)); // true