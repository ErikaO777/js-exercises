// べき乗関数
// 再帰
export function powWithRecursion(x, n) {
  if (n === 0) {
    // nが0のときは1
    return 1;
  } else if (n % 2 === 0) {
    // nが偶数のとき
    const half = powWithRecursion(x, n / 2); // まず半分だけ求める
    return half * half;
  } else {
    // nが奇数のとき
    return x * powWithRecursion(x, n - 1);
  }
}

// ループ
// 繰り返し二乗法（普通にx*xでループすると時間計算量がO(n)になってしまう）
// 2^11=2^8+2^2+2^1
export function powWithLoop(x, n) {
  let result = 1;
  while (n > 0) {
    if (n % 2 === 1) { // 奇数の場合
      result *= x;
    }
    x *= x;
    n = Math.floor(n / 2); // ここでnを半分にする
  }
  return result;
}

// 確認
console.log(powWithRecursion(2, 3));
console.log(powWithLoop(2, 3));

console.log(powWithRecursion(0, 0));
console.log(powWithLoop(0, 0));
