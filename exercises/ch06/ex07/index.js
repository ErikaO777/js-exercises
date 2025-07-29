// 引数として2 つ以上のオブジェクトを渡します。
// 最初の引数で指定したオブジェクトがコピー先となり変更されます。2 つ目以降の引数がコピー元
// コピー元に同じキーのプロパティがあると上書きされます。
// testが5つ通らない

export function assign(target, ...sources) {
  console.log(target, sources);

  // targetがnullまたはundefinedの場合はエラー
  if (target == null) {
    throw new TypeError("Cannot convert undefined or null to object");
  }
  
  if (typeof target === "number" || typeof target === "boolean") {
    target = Object(target); // プリミティブ値をオブジェクトに変換
  } else if (target instanceof Date) {
    // Dateの場合はそのまま使用（新しいDateオブジェクトは作らない）
    target = target;
  } else if (target instanceof Map) {
    // Mapの場合はそのまま使用
    target = target;
  }

  for (let source of sources) {
    // sourceがnull/undefinedの場合はスキップ
    if (source == null) {
      continue;
    }

    if (Array.isArray(source)) {
      // 配列の場合は要素をコピーする
      for (let i = 0; i < source.length; i++) {
        target[i] = source[i];
      }
    } else if (source instanceof Date) {
      continue;
    } else if (source instanceof Map) {
      continue;
    } else if (source != null) {
      // null や undefined かを確認
      for (let key of Object.keys(source)) {
        target[key] = source[key];
      }
    }

    // シンボルプロパティもコピー（列挙可能なもののみ）
    const symbols = Object.getOwnPropertySymbols(source);
    for (const symbol of symbols) {
      const descriptor = Object.getOwnPropertyDescriptor(source, symbol);
      if (descriptor && descriptor.enumerable) {
        target[symbol] = source[symbol];
      }
    }
  }

  console.log(target);
  return target;
}

Object.assign({ x: 1 }, { x: 2, y: 2 }, { y: 3, z: 4 }); // => {x: 2, y: 3, z: 4}
assign({ x: 1 }, { x: 2, y: 2 }, { y: 3, z: 4 }); // =>  {x: 2, y: 3, z: 4}
assign({}, { x: 1 }, { y: 2 }); // => {x: 1, y: 2}

//////// 以下確認 ////////
console.log("Object.assign");
console.log(
  Object.assign(
    { foo: "foo", hello: "world" },
    { foo: "foo", hello: "world" },
    [123, true, ["aa", "bb", "cc"], null, undefined]
  )
);
assign({ foo: "foo", hello: "world" }, { foo: "foo", hello: "world" }, [
  123,
  true,
  ["aa", "bb", "cc"],
  null,
  undefined,
]);
assign(new Map(), new Map(), [{ foo: "foo", bar: "bar" }]);
assign(1, 1, [{ foo: "foo", bar: "bar" }]);
assign(new Date(), new Date(), [{ foo: "foo", bar: "bar" }]);
