export function stringifyJSON(json) {
  let stringJson; // 新しくオブジェクトを作成し、ここに入れていく

  if (Array.isArray(json)) {
    // 配列
    stringJson = json.map((item) => { // さらに中身のタイプによって分岐
      if (item === null || item === undefined) return "null";
      if (typeof item === "number") return item;
      if (typeof item === "boolean") return item ? true : false;
      return `"${item}"`;
    });
  
    return `[${stringJson.join(",")}]`;

  } else if (typeof json === "object") {
    // オブジェクト
    if (Object.keys(json).length) {
      // キーがある場合はキーペアで格納
      stringJson = Object.entries(json).map(
        ([key, val]) => `"${key}":${val.toString()}`
      );
      return `{${stringJson.join(",")}}`;
    } else {
      // キーが無い場合は値を文字列化して格納
      stringJson = Object.entries(json).map(([val]) => `${val}`);
      return `{${stringJson.join(",")}}`;
    }
  }

  return stringJson;
}

// ----------- 確認 ---------------
console.log({ x: 5, y: 6 });
console.log(JSON.stringify({ x: 5, y: 6 }));
console.log(stringifyJSON({ x: 5, y: 6 }));

console.log(
  JSON.stringify([new Number(3), new String("false"), new Boolean(false)])
);
console.log(
  stringifyJSON([new Number(3), new String("false"), new Boolean(false)])
);

console.log(stringifyJSON(["\u0123"]));
console.log(JSON.stringify([[]]));
console.log(stringifyJSON([[]]));

console.log(stringifyJSON(["\u0060\u012a\u12AB"]));
console.log(JSON.stringify(["\u0060\u012A\u12AB"]));

console.log(JSON.stringify([1E22]));
console.log(stringifyJSON([1E22]));

// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
// シリアライズ　→　JSON.stringify()
// デシリアライズ　→　JSON.parse()

// object.entries() はキーペアの配列を返す
