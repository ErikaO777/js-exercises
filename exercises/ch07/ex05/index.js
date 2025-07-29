const seq = [1, 2, 3, 4, 5];

export function pop(array) {
  // 配列の末尾の要素を削除
  let newArray = Array.from(array);
  newArray.splice(array.length - 1, 1);
  return newArray; 
}

export function push(array, factor) {
  // 配列の末尾に要素を追加
  let newArray = Array.from(array);
  newArray[newArray.length] = factor;
  return newArray;
}

export function shift(array) {
  // 配列の先頭の要素を削除
  let newArray = Array.from(array);
  newArray.splice(0, 1); 
  return newArray;
}

export function unshift(array, factor) {
  // 配列の先頭に要素を追加
  let newArray = [factor, ...array]; 
  return newArray; 
}

export function sort(array, filter) {
  // 配列をソート
  let newArray = Array.from(array);

  if (filter === null || filter === undefined) {
      return ;
  } else {
    for (let i = 0; i < newArray.length - 1; i++) {
      for (let j = 0; j < newArray.length - i - 1; j++) {
        if (filter(newArray[j], newArray[j + 1]) > 0) { // filter関数を使って比較 (a,bどちらが大きいか)
          // 要素を交換
          let temp = newArray[j]; 
          newArray[j] = newArray[j + 1]; // 新しい配列のj番目の要素にj+1番目の要素を代入
          newArray[j + 1] = temp; // j+1番目の要素にtempを代入
        } 
      }
    }
  }
  return newArray; 
}

console.log(pop(seq)); // [1, 2, 3, 4]
console.log(push(seq, 6)); // [1, 2, 3, 4, 5, 6]
console.log(shift(seq)); // [2, 3, 4, 5]
console.log(unshift(seq, 0)); // [0, 1, 2, 3, 4, 5]
console.log(sort(seq, (a, b) => b - a)); // [5, 4, 3, 2, 1]

// 元の配列は変更されていない
console.log(seq); // [1, 2, 3, 4, 5]
