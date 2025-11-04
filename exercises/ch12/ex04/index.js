// 呼び出しごとに素数を順番に返す無限ジェネレータ
// 整数列を返すジェネレータintegersから、素数のみとりだして、呼ばれるごとに一つずつ返す
export function* primes() {
    let int = integers();
    for (; ;) {
        const prime = int.next().value;
        yield prime;
        int = filter(int, prime);
    }
}

// 指定したiterable をフィルタした反復可能なオブジェクトを返す。
// predicate がtrue を返す要素のみを反復する。
export function* filter(iterable, prime) {
    const predicate = x => x % prime !== 0;
    for (const i of iterable) {
        if (predicate(i)) {
            yield i;
        }
    }
}

// 無限に整数を返すジェネレータ
export function* integers() {
    for (let i = 2; ; i++) {
        yield i;
    }
}

// ---------確認-----------
// これだと同じジェネレータを使っているので常に2を返す
// console.log(primes().next().value);
// console.log(primes().next().value);
// console.log(primes().next().value);
// console.log(primes().next().value);
// 参考　https://ja.wikibooks.org/wiki/JavaScript/Generator/%E7%B4%A0%E6%95%B0%E3%82%B8%E3%82%A7%E3%83%8D%E3%83%AC%E3%82%BF%E3%83%BC

const p = primes();
console.log(p.next().value);
console.log(p.next().value);
console.log(p.next().value);
console.log(p.next().value);