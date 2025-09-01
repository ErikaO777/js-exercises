// 関数を引数に受け取り、 call 相当の動きをするプロパティ myCall を追加する
// 関数を一時的に他のオブジェクトのメソッドとして呼び出す
// 引数を個別に並べて渡す
// bindをつかって、受け取った関数にバインドする

export function addMyCall(fn) {
  // fnに新しくmyCallプロパティを追加
  fn.myCall = function (obj, ...args) {
    return fn.bind(obj)(...args);
  };
}

// 問題文中の例
const square = (n) => n * n;

addMyCall(square);

console.log(square.myCall(null, 5)); // 25
// squareにmyCallプロパティが追加されている
