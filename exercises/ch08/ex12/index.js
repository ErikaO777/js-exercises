const list = ["$1", "$2", "$3", "$4", "$5", "$6", "$7", "$8", "$9", "$10"]
const f = (template) => new Function(...list, `return ${template};`); // 引数にリストもとれる

// 文字列から関数を動的に生成する
// f は引数に関数の本体を文字列として受け取る
// 関数の本体で使用する引数は $1, $2, ... のように記載し、 $10 までサポートする

const arr = [1, 2, 3, 4, 5];
console.log(arr.reduce(f("$1 + $2"), 0)); 
console.log(arr.sort(f("$1 - $2")));