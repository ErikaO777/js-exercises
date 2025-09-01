// 以下を書き直し
const args = [];
function call() {
  args.push(Array.from(arguments));
}

call(1, 2, 3);
call("A", "B");

console.log(args[0]); // [1, 2, 3]
console.log(args[1]); // ["A", "B"]


// 回答
const newArgs = [];
export function newCall(...value) { // レストパラメータを使用
  newArgs.push(value);
}

newCall(1, 2, 3);
newCall("A", "B");

console.log(newArgs[0]); // [1, 2, 3]
console.log(newArgs[1]); // ["A", "B"]