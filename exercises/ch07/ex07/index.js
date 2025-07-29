// 問題の挿入ソート
function inserSort(
  array,
  compare = (lhs, rhs) => (lhs < rhs ? -1 : lhs > rhs ? +1 : 0)
) {
  // array[0 ... i-1] が常にソート済みになるように処理を進める
  // (0 <= j < i-1 に対して compare(array[j], array[j + 1]) <= 0 が成り立つ)
  for (let i = 1; i < array.length; i++) {
    const v = array[i];

    // array[i] を array[0 ... i] の適切な場所に挿入する
    let j = i;
    while (j > 0 && compare(array[j - 1], v) > 0) {
      array[j] = array[j - 1];
      j--;
    }
    array[j] = v;
  }
  return array;
}

// 他のソート
// 選択ソート
// 1.未整列部分から最小値を探す
// 2.それを先頭の要素と交換する
// 3.次の位置から再び最小値を探して交換
// 4.これを配列の最後まで繰り返す

// [5, 3, 8, 1, 2]
// 最小値 1 を探して先頭 5 と交換 → [1, 3, 8, 5, 2]
// 次の範囲 [3, 8, 5, 2] で最小値 2 を探して 3 と交換 → [1, 2, 8, 5, 3]
// 次の範囲 [8, 5, 3] で最小値 3 を探して 8 と交換 → [1, 2, 3, 5, 8]

export function selectionSort(
  array,
  compare = (lhs, rhs) => (lhs < rhs ? -1 : lhs > rhs ? +1 : 0) // lhs, rhsは左の要素と右の要素
) {
  for (let i = 0; i < array.length - 1; i++) {
    let minIndex = i; // 最小値のインデックス
    for (let j = i + 1; j < array.length; j++) {
      if (compare(array[j], array[minIndex]) < 0) { 
        // 左の要素(j番目の)array[j]と、右の要素(最小値インデックスの)array[minIndex]し、もし小さければ最小値のインデックスを更新
        minIndex = j;
      }
    }
    
    if (minIndex !== i) { // 最小値のインデックスがiと異なるとき、要素の順番を交換する
      [array[i], array[minIndex]] = [array[minIndex], array[i]];
    }
  }
  return array;
}


console.log("選択ソート:", selectionSort([5, 3, 8, 1, 2])); 
console.log("選択ソート:", selectionSort([1,2,null])); 
console.log("選択ソート:", selectionSort([])); 