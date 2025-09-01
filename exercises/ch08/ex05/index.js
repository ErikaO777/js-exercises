// arguments オブジェクトは「配列のような」オブジェクト
// 関数に渡された引数の値を、名前ではなく数値インデックスで読み出すことができます
// ... は複数の要素を持つ配列などの要素を展開するときに使われる

export function sequenceToObject(...values) {
  // 引数の確認
  if (arguments.length % 2 !== 0) {
    throw new Error("引数の個数が奇数です");
  }

  let obj = {};
  let valueType;

  // 引数の個数分ループを回し、偶数はキー、奇数は値としてオブジェクトに追加
  for (let i = 0; i < arguments.length; i++) {
    if (i % 2 === 1) {
      valueType = typeof arguments[i - 1];
      if (valueType !== "string") {
        throw new Error(`キーの型がstringではありません`);
      }

      obj[arguments[i - 1]] = arguments[i]; // i番目(奇数)の次のi+1番目(偶数)を値に追加
    } else {
      continue;
    }
  }
  console.log(obj);
  return obj;
}

// 確認
sequenceToObject("a", 1, "b", 2);
sequenceToObject("a", 1, "b", 2, "c", 3, "d", 4, "e", 5, "f", 6);
