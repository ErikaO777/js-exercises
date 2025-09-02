// Function コンストラクタの最後の引数が本体になる
export const f = (template) => {
  const list = ["$1", "$2", "$3", "$4", "$5", "$6", "$7", "$8", "$9", "$10"];
  // const contains = list.some((char) => template.includes(char));
  let setTemplate = template.replace(/\n/g, " "); // 外行がある場合にスペースに置き換える
  //   if (contains) {
  //     setTemplate = setTemplate.replace(/\$(\d+)/g, (_, i) => `$${i}`);
  //   } // 置換は不要

  const isStatement = setTemplate.trim().startsWith("{");
  const body = isStatement ? setTemplate : `return ${setTemplate};`; // templateが分かどうかをチェック
  console.log(setTemplate);
  return new Function(...list, body);
};

// 文字列から関数を動的に生成する
// f は引数に関数の本体を文字列として受け取る
// 関数の本体で使用する引数は $1, $2, ... のように記載し、 $10 までサポートする


// 確認
const arr = [1, 2, 3, 4, 5];
console.log(arr.reduce(f("$1 + $2"), 0));
console.log(arr.sort(f("$1 - $2")));

console.log(f("42")());
console.log(f("{ const result = $1 + $2;\n return result; }")(1, 2));
