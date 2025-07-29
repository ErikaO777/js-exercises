function fizzbuzz(n) {
  let num = Array(n)
    .fill()
    .map((_, i) => i + 1);

  let result = num.map(
    (
      x // filterではうまくいかず filterは抽出のみ？
    ) =>
      x % 15 === 0
        ? "FizzBuzz"
        : x % 3 === 0
        ? "Fizz"
        : x % 5 === 0
        ? "Buzz"
        : x
  );
  result.forEach((item) => console.log(item));
}

fizzbuzz(100);

function sumOfSquaredDifference(f, g) {
  // 差の二乗の合計
  let result = 0;
  f.forEach((x, i, arr) => {
    // 引数は配列要素の値、配列要素のインデックス、配列自身
    result += (x - g[i]) ** 2;
  });

  console.log(result);
  return result;
}

sumOfSquaredDifference([1, 2, 3], [4, 5, 6]); // => 27

function sumOfEvensIsLargerThan42(array) {
  // 偶数の合計が42以上かどうか
  let sum = 0;
  array.forEach((x) => {
    if (x % 2 === 0) {
      sum += x;
    }
  });

  console.log(sum>= 42);
  return sum >= 42;
}

sumOfEvensIsLargerThan42([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]); // => false