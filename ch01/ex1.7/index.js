class Point { // クラス名は大文字から記述するのが慣習。
    constructor(x, y) { // 新しいインスタンスを初期化するコンストラクタ関数。
        this.x = x; // this キーワードで、初期化中のオブジェクトを参照できる。
        this.y = y; // 関数の引数をオブジェクトのプロパティとして保存する。
    } // return 文は必要ない。

    distance() { // 原点からの距離を計算するメソッド。
        return Math.sqrt( // x² + y² の平方根を返す。
            this.x * this.x + // this が参照しているのは
            this.y * this.y // distance メソッドが呼び出されているオブジェクト。
        );
    }

    //引数として渡されたPointクラスのインスタンスの座標を自分の座標に加算するメソッド 　
    //引数として渡すPointクラスのインスタンス座標　let q = new Point(1, 1);　→add(q);
    //自分の座標をlet p = new Point(1, 1);とするとp.add(q)は座標(2,2)を返す。
    add(point) {
        return new Point(this.x + point.x, this.y + point.y);
    }
}
// 「new」キーワードとPoint() コンストラクタ関数を使って、Point オブジェクトを生成する。
let p = new Point(1, 1); // 座標(1,1)。
// Point オブジェクトp のメソッドを使う。
p.distance() // => Math.SQRT2

let q = new Point(1, 1);
p.add(q) // => Point(2, 2)