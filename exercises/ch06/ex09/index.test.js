test("問題6.9-テスト", () => {
  const mock = jest.fn();

  const obj = {
    x: 0,
    y: 0,
    sum() {
      // 3つめには合計値が入る
      mock();
      return this.x + this.y;
    },
  };

  // ここに１行のコードを書く
  // obj["sum"] = obj.sum();これだとsumが0になってしまうので、x,yが決まった後に再びsumが実行される必要がある
  obj.toJSON = function () { return { x: this.x, y: this.y, sum: this.sum() }; };
  // JSON.stringify()はシリアライズ対象のオブジェクトにtoJSON()メソッドが存在するかどうかを調べるので、この性質を使う

  obj.x = 1;
  obj.y = 2;
  console.log(JSON.stringify(obj));
  expect(JSON.stringify(obj)).toBe(`{"x":1,"y":2,"sum":3}`);
  expect(mock).toHaveBeenCalled();
});

// 変更前は{\"x\":1,\"y\":2}"
