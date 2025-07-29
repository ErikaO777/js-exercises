let obj = {
    name: "Jeen",
    age: 20
};

let prof = Object.create(obj); // objをプロトタイプとする新しいオブジェクト

console.log(obj);
console.log(prof);
console.log(Object.getPrototypeOf(prof)); // Object.getPrototypeOf()は指定されたオブジェクトのプロトタイプを返す

// 結果は上から
// { name: 'Jeen', age: 20 }
// {}
// { name: 'Jeen', age: 20 }
