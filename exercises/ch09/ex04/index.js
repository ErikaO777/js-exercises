// 戦士クラスと魔法戦士クラス

/////////////////////// class記法 //////////////////////////
// 戦士クラス
export class warriorClass {
  atk;
  attack() {
    return this.atk * 2;
  }
}

export class magicWarriorClass extends warriorClass {
  mgc;
  constructor() {
    super();
  }
  magicAttack() {
    return this.attack() + this.mgc;
  }
}

const Jack = new warriorClass();
Jack.atk = 10;
console.log(Jack.attack());

const Daniel = new magicWarriorClass();
Daniel.atk = 10;
Daniel.mgc = 5;
console.log(Daniel.magicAttack());

//////////////////////// prototype記法 ////////////////////////
// 戦士クラス
export function warriorFn() {
  this.atk;
}
// 攻撃メソッドを追加
warriorFn.prototype.attack = function () {
  return this.atk * 2;
};

// 魔法戦士クラス
export function magicWarriorFn() {
  warriorFn.call(this);
}
magicWarriorFn.prototype = Object.create(warriorFn.prototype);
// コンストラクタは引き継がない
magicWarriorFn.prototype.constructor = magicWarriorFn;
// 独自のメソッド(戦士としての attack の値にそのインスタンスの mgc の値を加算した値をダメージとして返す)
magicWarriorFn.prototype.magicAttack = function () {
  this.mgc;
  return this.attack() + this.mgc;
};

const Alice = new warriorFn();
Alice.atk = 10;
console.log(Alice.attack());

const Misa = new magicWarriorFn();
Misa.atk = 10;
Misa.mgc = 5;
console.log(Misa.magicAttack());