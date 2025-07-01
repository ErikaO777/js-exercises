let list = ["r", "i", "c", "o", "h"];
// 削除前
console.log("内容 " + list);
console.log("長さ " + list.length);

delete list[3];
// 削除後
console.log("内容 " + list);
console.log("長さ " + list.length);

// 結果
// 内容 r,i,c,o,h
// 長さ 5
// 内容 r,i,c,,h
// 長さ 5