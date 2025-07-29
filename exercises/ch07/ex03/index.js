// reduce を使って実装

export function sum(array) {
  // 合計
  if (!array || !Array.isArray(array) || array.length === 0) {
    return 0; // 空配列や配列でない場合は0を返す
  } else if (Array.isArray(array)) {
    let result = array.reduce((x, y) => x + y, 0); // 初期値は0
    return result;
  }
}

export function join(array, separator = ",") { // 引数はリストとセパレータ
  // 配列のすべての要素を文字列に変換し連結し、連結した文字列を返す
  if (array === undefined) {
    throw new Error();
  }
  if (!array || !Array.isArray(array) || array.length === 0) {
    return ""; 
  }
  
  // null や undefined は空文字列に変換
  const stringArray = array.map((x) => (x !== null && x !== undefined ? x.toString() : ""));
  
  // reduceを使って結合
  let result = stringArray.reduce((acc, curr, index) => {
    return index === 0 ? curr : acc + separator + curr;
  }, "");
  
  return result;
}

export function reverse(array) {
  // 配列の要素の順番を逆にする
  let result = array.reduce((x, y) => [y, ...x], []); // 初期値は空配列
  return result;
}

export function every(array, predicate) {
  // すべての要素に対して、指定した述語関数がtrue を返した場合にのみtrue
  if (!array || !Array.isArray(array)) {
    return ; 
  } else if (Array.isArray(array)) {
    let result = array.reduce((acc, cur, index , arr) => acc && predicate(cur, index, arr), true); // 初期値はtrue
    return result;
  }
}

export function some(array, predicate) {
  // 配列の中の少なくとも1つの要素に対して、述語関数がtrueを返した場合に、some()メソッドはtrueを返します。
  // 配列のすべての要素に対して、述語関数がfalseを返した場合にのみ、some()メソッドはfalse
  if(!array || !Array.isArray(array)) {
    return ; 
  }else if (Array.isArray(array)) {
    let result = array.reduce((acc, cur, index , arr) => acc || predicate(cur, index, arr), false); // 初期値はfalse
  return result;
  }
  
}
