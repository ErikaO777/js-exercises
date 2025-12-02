### グローバルオブジェクトを参照する方法
- globalThis：環境依存しない
JSの新機能で、環境に依存せずグローバルオブジェクトにアクセスできる。
使用例）
`
foo = 123;
console.log(globalThis.foo); // 123
`

- global：node
使い方はglobalThisと同じ。

- this
関数ではないトップレベルではthisはグローバルオブジェクトになる。
`
foo = 123;
console.log(this.foo); // this.fooは123
`

### 比較


### 過去のES仕様での問題
ECMAScript3ではundefinedは代入可能なグローバルオブジェクトであり、上書きすることができた。ECMAScript5からグローバルの undefinedを上書きすることはできなくなったが、代入することは可能。
// https://zenn.dev/lollipop_onl/articles/eoz-using-undef-on-js