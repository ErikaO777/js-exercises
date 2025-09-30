export function stringifyJSON(json) {
  let stringJson; // 新しくオブジェクトを作成し、ここにシリアライズしたものを入れていく

  if (Array.isArray(json)) {
    // 引数が配列
    stringJson = json.map((item) => {
      // さらに中身のタイプによって分岐
      if (item === null || item === undefined) return "null";
      if (typeof item === "number") return item;
      if (typeof item === "boolean") return item ? true : false;
      if (typeof item === "string") {
        // 文字列の場合はエスケープ処理を行う
        const escapedItem = escapeString(item);
        return `"${escapedItem}"`;
      }
      return `"${item}"`;
    });

    return `[${stringJson.join(",")}]`;
  } else if (typeof json === "object") {
    // 引数がオブジェクト
    if (Object.keys(json).length) {
      // キーがある場合はキーペアで格納
      stringJson = Object.entries(json).map(([key, val]) => {
        // valueの値の型に応じて処理を分岐
        if (val === null || val === undefined) return `"${key}":null`;
        if (typeof val === "number") return `"${key}":${val}`;
        if (typeof val === "boolean") return `"${key}":${val}`;
        if (typeof val === "string") {
          // 文字列の場合はエスケープ処理を行う
          const escapedKey = escapeString(key);
          const escapedVal = escapeString(val);
          return `"${escapedKey}":"${escapedVal}"`;
        }
        return `"${key}":"${val}"`;
      });
      return `{${stringJson.join(",")}}`;
    } else {
      // キーが無い場合は値を文字列化して格納
      stringJson = Object.entries(json).map(([val]) => `${val}`);
      return `{${stringJson.join(",")}}`;
    }
  }

  return stringJson;
}

// エスケープシーケンス関数
function escapeString(str) {
  return str
    .replace(/\\/g, "\\\\")    
    .replace(/"/g, '\\"')      
    .replace(/\n/g, "\\n")     
    .replace(/\r/g, "\\r")     
    .replace(/\t/g, "\\t")   
    .replace(/\u0000/g, "\\u0000")  
    .replace(/[\u0001-\u001f]/g, (match) => {  
      return "\\u" + match.charCodeAt(0).toString(16).padStart(4, '0'); // 制御文字を1つずつ変換
    });
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

console.log(JSON.stringify([1e22]));
console.log(stringifyJSON([1e22]));

// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
// シリアライズ　→　JSON.stringify()
// デシリアライズ　→　JSON.parse()

// object.entries() はキーペアの配列を返す
