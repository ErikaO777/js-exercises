// Object.prototype.isPrototypeOf() は Object インスタンスのメソッドで、
// オブジェクトが別のオブジェクトのプロトタイプチェーンに存在するかどうかを判定

let o = {}; 
o.x = 1;
console.log(o);
let p = Object.create(o); 
p.y = 2; 
console.log(Object.getPrototypeOf(p));
let q = Object.create(p); 
q.z = 3; 
console.log(Object.getPrototypeOf(q));
let f = q.toString(); 
q.x + q.y ;

console.log("pはoのプロトタイプチェーンか？" + o.isPrototypeOf(p));
console.log("qはoのプロトタイプチェーンか？" + o.isPrototypeOf(q));
console.log("qはpのプロトタイプチェーンか？" + p.isPrototypeOf(q));

// 結果は上から
// { x: 1 }
// { x: 1 }
// { y: 2 }
// pはoのプロトタイプチェーンか？true
// qはoのプロトタイプチェーンか？true
// qはpのプロトタイプチェーンか？true

// Object, Array, Date, Map のプロトタイプチェーンの継承関係を確認する
let obj = new Object(); 
let array = new Array(); 
let date = new Date(); 
let map = new Map(); 

// そのまま
console.log(Object.getPrototypeOf(obj));
console.log(Object.getPrototypeOf(array));
console.log(Object.getPrototypeOf(date));
console.log(Object.getPrototypeOf(map));

// 結果 それぞれの意味が分からない
// [Object: null prototype] {}
// Object(0) []
// {}
// Object [Map] {}

// 階層まで見る
function prototypeChain(obj) {
    console.log("オブジェクト:", JSON.stringify(obj));
    let current = obj;
    let level = 0;
    while (current) {
        console.log(`階層 ${level}:`, current);
        current = Object.getPrototypeOf(current);
        level++;
    }
}

prototypeChain(obj);
prototypeChain(array);
prototypeChain(date);
prototypeChain(map);

// オブジェクト: {}
// 階層 0: {}
// 階層 1: [Object: null prototype] {}
// オブジェクト: []
// 階層 0: []
// 階層 1: Object(0) []
// 階層 2: [Object: null prototype] {}
// オブジェクト: "2025-07-29T09:34:09.914Z"
// 階層 0: 2025-07-29T09:34:09.914Z
// 階層 1: {}
// 階層 2: [Object: null prototype] {}
// オブジェクト: {}
// 階層 0: Map(0) {}
// 階層 1: Object [Map] {}
// 階層 2: [Object: null prototype] {}