// 各機能を持つRobotクラスについて考える

// ---------------- SOLID原則を満たさない例 -----------------
// ロボットクラスにすべての機能を詰め込む
class Robot {
  constructor() {}

  walk() {}

  handshake() {}

  speak() {}

}

// SOLIDの観点
// 単一責任の原則：クラスに機能が集中している
// 開放/閉鎖の原則：既存のRobotクラスを直接変える必要あり
// リスコフの置換原則：継承は無し
// インターフェースの分離の原則：機能同士が依存してしまう可能性アリ
// 依存性逆転の原則：Robotが各部品に依存

// ----------------- SOLID原則を満たしている場合 ------------------
// コンポジションで、ロボット本体が各部品を持つ
class Robot {
  constructor(leg, arm, mouth) {
    this.leg = leg;
    this.arm = arm;
    this.mouth = mouth;
  }

  // 各動作は部品に委譲する
  walk() {
    this.leg.walk();
  }

  handshake() {
    this.arm.handshake();
  }

  speak() {
    this.mouth.speak();
  }
}

class Leg {
  walk() {}
}

class Arm {
  handshake() {}
}

class Mouth {
  speak() {}
}

// SOLIDの観点
// 単一責任の原則：各クラスで責務の分散
// 開放/閉鎖の原則：新しく目などを追加する場合は、既存のクラスを変更する必要はないがクラスを追加しないといけない。。
// リスコフの置換原則：継承は無いが委譲は大丈夫か…？
// インターフェースの分離の原則：不要なメソッドは無し
// 依存性逆転の原則：Robotが各部品に依存