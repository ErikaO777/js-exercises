export function makeFixedSizeArray(size) {
  // 固定長の配列を返す
  const array = new Array(size);
  return {
    get(index) {
      if (index < 0 || array.length <= index) {
        throw new Error(`Array index out of range: ${index}`);
      }
      return array[index];
    },
    set(index, value) {
      if (index < 0 || array.length <= index) {
        throw new Error(`Array index out of range: ${index}`);
      }
      array[index] = value;
    },
    length() {
      return array.length;
    },
  };
}

export class DynamicSizeArray {
  // 動的配列　get,set,length,push関数を実装
  static INITIAL_SIZE = 4; // 初期サイズ

  constructor() {
    this.len = 0;
    this.array = makeFixedSizeArray(DynamicSizeArray.INITIAL_SIZE); // 固定長の配列関数から配列を作成
  }
  get(index) {
    if (index < 0 || this.len <= index) {
      throw new Error(`Array index out of range: ${index}`);
    }
    console.log(this.array[index]);
    return this.array.get(index); // 固定長の配列のget関数を呼び出す
    // return this.array[index]; // これだとエラー
  }
  set(index, value) {
    if (index < 0 || this.len <= index) {
      throw new Error(`Array index out of range: ${index}`);
    }
    this.array.set(index, value);
    console.log(this.array.get(index));
  }
  length() {
    // this.len = this.array.length(); // 現在の配列の長さを取得、lenにセット
    console.log(this.len);
    return this.len;
  }
  push(value) {
    // this.array に空が無い場合は「再配置」を行う
    if (this.len >= this.array.length()) {
      // 新しい固定長配列を作成
      const old = this.array;
      this.array = makeFixedSizeArray(old.length() * 2);
      // 古い配列 (old) の要素を新しい配列にコピー set()を使う
      for (let i = 0; i < old.length(); i++) {
        this.array.set(i, old.get(i));
      }
    }
    // 空きがあれば末尾に値を追加するだけ
    this.array.set(this.len, value);
    console.log(this.len, value);
    // 最後に長さを更新
    this.len++;
  }
}

// 配列におけるpushとsetの違いは？
// →pushは配列の末尾に要素を追加、setは指定したインデックスに値を設定

// 浅いコピー、深いコピーの使い分け

let array = new DynamicSizeArray();
array.push("a");
console.log(array.get(0)); // "a"