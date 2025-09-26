// f はオブジェクトを1つ引数に取る関数
export function cache(f) {
  // この関数を実装する

  const cacheMap = new WeakMap(); // WeakMapだとキャッシュに残らない

  return function cachedSlowFn(obj) {
    if (cacheMap.has(obj)) {
      console.log("cacheから取得: " + JSON.stringify(obj));
      return cacheMap.get(obj); // すでにキャッシュがある場合は結果を返すのみ
    }
    console.log("計算してキャッシュに保存: " + JSON.stringify(obj));
    const result = f(obj); // 引数の関数に渡して計算
    cacheMap.set(obj, result); // 計算して結果をキャッシュに保存
    return result; // 結果を返す
  };
}
export function slowFn(obj) {
  // 時間のかかる処理
  let result = obj.x + obj.y;
  return result;
}

// cachedSlowFnを同じ引数で複数回呼び出すと、2回目以降はキャッシュが返る
const cachedSlowFn = cache(slowFn);

// ---------- 確認 ----------
const obj1 = { x: 2, y: 3 };
const obj2 = { x: 1, y: 1 };
console.log(cachedSlowFn(obj1));
console.log(cachedSlowFn(obj1));
console.log(cachedSlowFn(obj2));

// ------------- 失敗 -------------
// const cacheMap = new Map();
// if(cacheMap.has(f)){ // すでにキャッシュがある場合は結果を返すのみ
//   return function cachedSlowFn(){ // キャッシュを返す関数
//     return cacheMap.get(f);
//   }
// }else if(!cacheMap.has(f)){ // キャッシュがない場合は計算してキャッシュに保存
//     return function cachedSlowFn(){ // キャッシュを返す関数
//       const result = f();
//       cacheMap.set(f, result);
//       return result;
//     }
// }

// ------- メモ -------
// 一度計算した結果を保存しておき、次回同じ入力が来たときに再計算せずに保存済みの結果を返す
// 関数名をkeyに、時間をvalueにしてMapに保存
// オブジェクトの到達不能とはそのオブジェクトにアクセスする方法がプログラム上から完全になくなる状態のこと
// メモ化
// ガベージコレクションの対象にするにはnullをセットするなどしてメモリリークを防ぐ?
