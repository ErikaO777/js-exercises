// stats モジュールを定義する。
const stats = (function () {
  // モジュールに閉じたユーティリティ関数。
  const sum = (x, y) => x + y;
  const square = (x) => x * x;
  // エクスポートする公開関数。
  function mean(data) {
    return data.reduce(sum) / data.length;
  }
  // エクスポートする公開関数。
  function stddev(data) {
    let m = mean(data);
    return Math.sqrt(
      data
        .map((x) => x - m)
        .map(square)
        .reduce(sum) /
        (data.length - 1)
    );
  }
  // オブジェクトのプロパティとして公開関数をエクスポートする。
  return { mean, stddev };
})();
// モジュールの使い方を以下に示す。
stats.mean([1, 3, 5, 7, 9]); // => 5
stats.stddev([1, 3, 5, 7, 9]); // => Math.sqrt(10)
