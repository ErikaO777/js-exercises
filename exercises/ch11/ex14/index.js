// 日本語文字列の配列を受け取り、文字列中の大文字・小文字("つ"と"っ"等)、
// 濁点・半濁点("は"と"ば"と"ば"等)の違いを無視してソートする sortJapanese 関数

// Intl.Collator オブジェクトを作成して、
// compare()メソッドをsort() メソッドに引数として渡せば、ロケールに適切な順序で文字列を並べ替えることができる
// オプション：sensitivity
export function sortJapanese(array) {
  // 引数チェック
  if (!Array.isArray(array)) {
    throw new Error("引数は配列");
  }
  if (!array.every((item) => typeof item === "string")) {
    throw new Error("配列の要素は文字列");
  }

  let sortedArray = [...array];
  const collator = new Intl.Collator("ja-JP", { sensitivity: "base" }).compare;
  return sortedArray.sort(collator);
}

const jp = ["りんご", "京都", "みかん", "イチゴ", "ぶどう"];

console.log(sortJapanese(jp)); // ["イチゴ", "ぶどう", "みかん", "りんご", "京都"]

// ----------------------------------------------

// Date オブジェクトを受け取り、令和6年4月2日 のように (和暦)y年m月d日 のフォーマットで
// 日付の文字列を返す toJapaneseDateString 関数

export function toJapaneseDateString(dateObj) {
  // 引数チェック
  if (!(dateObj instanceof Date)) {
    throw new Error("引数はDateオブジェクト");
  }

  // 和暦フォーマットのオプション設定
  const options = {
    era: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };

  let dateString = Intl.DateTimeFormat("ja-JP-u-ca-japanese", options).format(
    dateObj
  );

  // 手動で(和暦)y年m月d日に整形
  const parts = dateString.split("/");
  if (parts.length === 3) {
    const [era_year, month, day] = parts;
    dateString = `${era_year}年${month}月${day}日`;
  }

  return dateString;
}

console.log(toJapaneseDateString(new Date("2024-04-02")));

// 以下の記事ではeraの指定だけで (和暦)y年m月d日 になっている？
// https://qiita.com/shisama/items/cb0abb5435fac82e87d6
