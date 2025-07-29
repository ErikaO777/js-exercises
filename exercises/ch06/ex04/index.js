const obj = {};

Object.defineProperty(obj, "key1", {
  // key1の変更は不可
  enumerable: false,
  configurable: false,
  writable: false,
  value: "value1",
});

Object.defineProperty(obj, "key2", {
  // key2の変更は可能
  enumerable: true,
  configurable: true,
  writable: true,
  value: "value2",
});

// プロパティの変更
//obj.key1 = 1;  // エラー
obj.key2 = 2;
console.log("obj.key1: " + obj.key1); // obj.key1: value1
console.log("obj.key2: " + obj.key2); // obj.key2: 2

// プロパティの削除
// delete obj.key1; // エラー
delete obj.key2;
console.log("obj.key1: " + obj.key1); // obj.key1: value1
console.log("obj.key2: " + obj.key2); // obj.key2: undefined

// hasOwnProperty 引数に指定されたプロパティを持っているかどうか
console.log("obj.hasOwnProperty('key1'): " + obj.hasOwnProperty("key1")); // obj.hasOwnProperty('key1'): true
console.log("obj.hasOwnProperty('key2'): " + obj.hasOwnProperty("key2")); // obj.hasOwnProperty('key2'): false

// propertyIsEnumerable 指定されたプロパティが列挙可能で、かつオブジェクト自身のプロパティであるかどうか
console.log(
  "obj.propertyIsEnumerable('key1'): " + obj.propertyIsEnumerable("key1")
); // obj.propertyIsEnumerable('key1'): false
console.log(
  "obj.propertyIsEnumerable('key2'): " + obj.propertyIsEnumerable("key2")
); // obj.propertyIsEnumerable('key2'): false

// key2に値を戻す
obj.key2 = "value2";
console.log("obj.hasOwnProperty('key2'): " + obj.hasOwnProperty("key2")); // obj.hasOwnProperty('key2'): true
console.log(
  "obj.propertyIsEnumerable('key2'): " + obj.propertyIsEnumerable("key2")
); // obj.propertyIsEnumerable('key2'): true
