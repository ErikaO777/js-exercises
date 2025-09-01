// アロー関数以外の入れ子型の関数は外側のthisの値を継承しない
// 入れ子型の関数がメソッドとして呼び出された場合、関数を呼び出したオブジェクトがthisの値になる

const obj = {
  om: function () {
    const nest = { // nestの中にnm,arrowの二つの関数
      nm: function () {
        console.log(this === obj, this === nest);
      },
      arrow: () => {
        console.log(this === obj, this === nest);
      },
    };
    // 実行はnm,arrowの順
    nest.nm();
    nest.arrow();
  },
};
obj.om();

// 予想
// false , false
// true, true

// 結果
// false , true
// true, false
// nm→thisは呼び出し元オブジェクトを指す
// arrow→thisは外側の関数のthisを継承するのでこの場合obj