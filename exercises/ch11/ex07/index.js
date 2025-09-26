let obj = {
  okKakkos: ["(()(()))", "(((())))"],
  ngKakkos: ["((())", "()()())"]
};

let list = [];　
let r = /[（）]*/; // [ '(()(()))', '(((())))', '((())', '()()())' ]
let r1 = /[（]*[）]*/; // [ '(()(()))', '(((())))', '((())', '()()())' ]

for (let key in obj) {
    for (let word of obj[key]) {
        if (r.test(word)) {
            list.push(word);
        }
    }
}
console.log(list);

// ()がセットになっていること＝2つの文字が同じ数だけ存在することがポイント

let list2 = [];
const regexA = /^(（+）+)*（*$/; // （）をセットにして、その後に（が0個以上
const regexB = /^(（+）+)*）*$/; // （）をセットにして、その後に）が0個以上

for (let key in obj) {
    for (let word of obj[key]) {
        if (regexB.test(word)) {
            list2.push(word);
        }
    }
}
console.log(list2);
// [ '(()(()))', '(((())))', '((())', '()()())' ]