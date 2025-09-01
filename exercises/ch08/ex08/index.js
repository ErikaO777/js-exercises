export function counterGroup() {
  return {
    counter: null,

    newCounter: function () {
      let n = 0;
      const countObj = { // count,reset,getCountを持つオブジェクトを作成しないとうまくいかない
        count: function () {
          return n++;
        },
        reset: function () {
          n = 0;
        },
        getCount: function () {
          // 他の関数でnewConunterの値を参照するときにインクリメントが増えないようにするため
          console.log("現在のカウントは: " + n);
          return n;
        },
      };
      this.counter = countObj;
      return countObj;
    },

    total: function () {
      let total = 0;
      try {
        let nowCount = this.counter.getCount();
        console.log("現在のカウントは: " + nowCount);
        for (let i = 0; i < nowCount ; i++) {
          total += i;
        }
        return total;
      } catch (error) {
        return 0; // counterがnullのとき
      }
    },

    average: function () {
      let total = this.total(); // それぞれオブジェクト内の関数から取得
      let nowCount = this.counter.getCount();
      if (nowCount === 0) {
        throw new TypeError();
      }
      return total / nowCount;
    },

    variance: function () {
      let avg = this.average();
      let totalSquare = 0;
      let nowCount = this.counter.getCount();
      if (nowCount === 0) {
        throw new TypeError();
      }
      let countNum = 1; // カウント数
      for (let i = 1; i < nowCount; i++) {
        totalSquare += (countNum - avg) ** 2;
        countNum++;
      }
      return totalSquare / nowCount;
    },
  };
}

// 確認
const cg = counterGroup();
let c1 = cg.newCounter();
console.log(c1.count());
console.log(c1.count());
console.log(c1.count());
console.log(cg.total());
