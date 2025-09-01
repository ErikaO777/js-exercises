// 自作関数
function msg(){
    console.log("Hello, world!");
}
console.log(msg.toString()); 
// msg().toString()ではダメ。msg()はundefinedを返すので、undefined.toStringになってしまう

// 組み込み関数
console.log(Math.random.toString()); 
console.log(Object.keys.toString());