export function slice(str, indexStart, indexEnd) {
  let msg = str;
  let newMsg = "";

  //引数の確認
  //End
  //NaN === NaN はfalse
  if (indexEnd === undefined) {
    indexEnd = msg.length;
  } else if (Number.isNaN(indexEnd)) {
    indexEnd = 0; // NaNの場合は0として扱う
  } else if (indexEnd < 0) {
    indexEnd = msg.length + indexEnd;
  }
  
  //Start
  if (indexStart === undefined) {
    indexStart = 0;
  } else if (Number.isNaN(indexStart)) {
    indexStart = 0; // NaNの場合は0として扱う
  } else if (indexStart < 0) {
    indexStart = msg.length + indexStart;
  }

  indexStart = Math.max(0, Math.min(indexStart, msg.length));
  indexEnd = Math.max(0, Math.min(indexEnd, msg.length));

  if (indexStart >= indexEnd) {
    return "";
  }

  //数値は丸め込み、切り出してから新しい文字列を作成
  for (let i = Math.floor(indexStart); i < Math.floor(indexEnd); i++) {
    newMsg += msg[i];
  }

  return newMsg;
}

console.log(slice("Hello, world!", 0, 5)); // "Hello"
console.log(slice("Hello, world!", -6, -5));
