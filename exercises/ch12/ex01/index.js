export function counterIter(max) { // 最大呼び出しを引数にとるカウンター関数
  console.log("counterIter");
  let c = 1;
  return {
    [Symbol.iterator]() {
      console.log("counterIter: Symbol.iterator");
      return this;
    },
    next() {
      console.log("counterIter: next");
      if (c >= max + 1) {
        return { value: undefined, done: true };
      }
      const value = c;
      c++;
      return { value, done: false };
    },
    return(value) {
      console.log("counterIter: return:", value);
      return { value, done: true };
    },
    throw(e) {
      console.log("counterIter: throw:", e);
      throw e;
    },
  };
}

export function* counterGen(max) {
  console.log("counterGen");
  try {
    for (let c = 1; c <= max; c++) {
      console.log("counterGen: next");
      yield c;
    }
  } catch (e) {
    console.log("counterGen: catch:", e);
    throw e;
  } finally {
    console.log("counterGen: finally");
  }
}

// -------------- 調査対象の操作 --------------
const iter = counterIter(5);
const gen = counterGen(5);

// 明示的にイテレータプロトコルの next() を呼び出す
// console.log("イテレータのnext():");
// console.log(iter.next());
// console.log("ジェネレータのnext():");
// console.log(gen.next());

// // // 明示的にイテレータプロトコルの return() を呼び出す
// console.log("イテレータのreturn():");
// console.log(iter.return("終了"));
// console.log("ジェネレータのreturn():");
// console.log(gen.return("終了"));

// // 明示的にイテレータプロトコルの throw() を呼び出す
// // console.log(iter.throw(new Error("例外発生")));
// console.log(gen.throw(new Error("例外発生")));

// console.log("counterIterのループ");
// for-of ループを実行
// for (const v of iter) {
//   console.log(v);
// }
// console.log("counterIterのループ完了");

// for-of ループを実行途中で break
// console.log("counterIterのループ-途中で break");
// for (const v of iter) {
//   console.log(v);
//   if (v === 2) {
//     break;
//   }
// }
// console.log("counterIterのループ-途中で break 完了");

// for-of ループを実行中に例外発生
console.log("counterIterのループ-途中で例外発生");
for (const v of iter) {
  console.log(v);
  if (v === 2) {
    throw new Error("例外発生");
  }
}
console.log("counterIterのループ-途中で例外発生 完了");

// console.log("--------- ここからジェネレータ ---------");
// console.log("counterGenのループ");
// // for-of ループを実行
// for (const v of gen) {
//   console.log(v);
// }
// console.log("counterGenのループ完了");



// // for-of ループを実行途中で break
// console.log("counterGenのループ-途中で break");
// for (const v of gen) {
//   console.log(v);
//   if (v === 2) {
//     break;
//   }
// }
// console.log("counterGenのループ-途中で break 完了");

// // for-of ループを実行中に例外発生
// console.log("counterGenのループ-途中で例外発生");
// for (const v of gen) {
//   console.log(v);
//   if (v === 2) {
//     throw new Error("例外発生");
//   }
// }
// console.log("counterGenのループ-途中で例外発生 完了");

// メモ
// throw() を使う場合は try...catch で囲む