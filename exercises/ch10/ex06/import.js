console.log('Start');
import "./index.js"; 
// エクスポートしないモジュールに対して使う
// 最初にインポートした時に実行される
console.log('one');
import "./index.js"; 

console.log('two');
import "./index.js"; 
console.log('three');
console.log('End');
