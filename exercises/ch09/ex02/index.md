### 問題点
今回の実装方法では、this.countが外部から直接呼び出し可能なため、勝手に書き換えられてしまう危険性がある。これを防ぐには9.3.3のプライベートフィールドを使う方法がある。以下に例を示す。
`
export class C {
  #count = 0;

  increment() {
    this.#count++;
  }

  get x() {
    return this.#count;
  }
}
`
参考：
https://programming-cafe.com/programming/javascript-programming/js-reserved/javascript-private/
https://af-e.net/java-private-fields/
