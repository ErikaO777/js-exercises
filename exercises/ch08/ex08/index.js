// f()とfの呼び方によってスコープが違う
export function counterGroup() {
  return {
    counter: [], // カウンターは配列にする（すべてのカウンターを記録）

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
      this.counter.push(countObj);
      return countObj;
    },

    total: function () {
      let total = 0;
      try {
        for (let i = 0; i < this.counter.length ; i++) {
          total += this.counter[i].getCount();
        }
        return total;
      } catch (error) {
        return 0; // counterがnullのとき
      }
    },

    average: function () {
      if (this.counter.length === 0) {
        throw new TypeError();
      }
      return this.total() / this.counter.length;
    },

    variance: function () {
      if (this.counter.length < 2) {
        throw new TypeError();
      }
      let avg = this.average();
      let totalSquare = 0;
      for (let i = 0; i < this.counter.length; i++) {
        totalSquare += (this.counter[i].getCount() - avg) ** 2;
      }
      return totalSquare / this.counter.length;
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
let c2 = cg.newCounter();
console.log(c2.count());
console.log(c2.count());
console.log(cg.total());
