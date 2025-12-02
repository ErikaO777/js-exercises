export class MyArrayLike {
  // TODO
  // あくまでArrayっぽいクラスで、Arrayは継承しない
  // 配列のように動くクラス
  // インデックスでアクセスでき、lengthで長さを取得でき、sliceができる
  constructor(items) {
    this._items = [items]; //初期化
    this.length = this._items.length;

    this._items.forEach((item, index) => { // インデックスでアクセス可にする
      this[index] = item;
    });
  }
  // getter:lengthで配列の長さを返す
  get length() {
    return this._length;
  }

  // setter:lengthで配列の長さを設定する
  set length(value) {
    this._length = value; // slice() が設定できるようにする
    for (let i = value; i < this._length; i++) {
      delete this[i]; // 余分なインデックスプロパティを削除
    }
  }

  [Symbol.iterator]() { // イテレータで反復可能にする
    return this._items[Symbol.iterator]();
  }

}

export class MyArray extends Array {
  constructor(items) {
    super(...items);
  }

  // TODO
  static get [Symbol.species]() { return MyArrayLike; }
}

// -------- 確認 --------
// map
const array = new MyArray([1, 2, 3, 4, 5]);
const result = array.map((x) => x * x);
console.log(result.length);
console.log(Array.from(result));

// slice
const array2 = new MyArray(["A", "B", "C", "D"]);
const result2 = array2.slice(1, 3);
console.log(result2.length);
console.log(Array.from(result2));