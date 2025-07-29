// obj1は以下を持つ
// プロパティ名が数値のプロパティ
// プロパティ名が文字列のプロパティ
// 列挙可能なプロパティ
let obj1 = {
  1: 1000,
  tenki: "hare",
};

Object.defineProperty(obj1, "name", {
  enumerable: true,
  value: "Jeen",
});

// obj2はobj1をプロトタイプとして持つ
let obj2 = Object.create(obj1);
for (let key in obj2) {
  console.log(`${key}=${obj2[key]}`);
}
// 結果
// 1=1000
// tenki=hare
// name=Jeen

// さらにobj2は以下を持つ
// プロパティ名が数値かつプロトタイプの数値プロパティと同名のプロパティ
// プロパティ名が数値かつプロトタイプの数値プロパティと同名でないプロパティ
// プロパティ名が文字列かつプロトタイプの文字列プロパティと同名のプロパティ
// プロパティ名が文字列かつプロトタイプの文字列プロパティと同名でないプロパティ
// 列挙不可かつプロトタイプの列挙可能プロパティと同名のプロパティ
obj2 = {
  1: 2000,
  2: 3000,
  tenki: "ame",
  ondo: 28,
};

Object.defineProperty(obj2, "name", {
  enumerable: false,
  value: "Jeen",
});

for (let key in obj2) {
  console.log(`${key}=${obj2[key]}`);
}

// 結果
// 1=2000
// 2=3000
// tenki=ame
// ondo=28
// →継承したプロトタイプは列挙されない