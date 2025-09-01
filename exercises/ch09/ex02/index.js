// 呼び出すたびに増える
// ゲッターメソッド
export class C {
  constructor() {
    this.count = 0;
  }

  get x() {
    console.log(this.count);
    return this.count++;
  }
}

const getter = new C();
getter.x;
getter.x;
getter.x;
getter.x;