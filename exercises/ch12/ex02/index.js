function* fibonacciSequence() { // ジェネレータ関数 無限に値を生成し続ける
    let x = 0, y = 1;
    for (; ;) { // 無限ループ
        yield y; // yield 文で値を生成　次のフィボナッチ数を1つずつ返す
        [x, y] = [y, x + y]; // 分割代入を行っている。
    }
}

// イテレータはnext()メソッドを持つ反復可能なオブジェクト
// 順番に値を返す
// クラスを反復可能にするには、Symbol.iterator
// 無限ループするフィボナッチ関数
// イテレータオブジェクトは反復結果オブジェクトを返さなければならない。
export function fibonacciIter() {
    let x = 0, y = 1;
    return {
        [Symbol.iterator]() { return this; },
        next() { // next()メソッドの中でforは使わない
            let value = y;
            [x, y] = [y, x + y];
            return { value: y, done: false };
        }
    };
}

// -------確認-----------
const fib = fibonacciIter(); // ジェネレータオブジェクトを生成
export function fibonacci(n) {
    for (let f of fib) { // イテレータオブジェクトのnext()メソッドを呼び出している
        if (n-- <= 0) return f;
    }
}

console.log(fibonacci(20)); // 17711
// console.log(fib.next().value);
// console.log(fib.next().value);
// console.log(fib.next().value);



// TypeError: fib.next is not a function or its return value is not iterable