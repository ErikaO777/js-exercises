// throw()を使ってリセットできるカウンタ
// throw()を使って例外を送ることで、カウンタをゼロに初期化
export function* count() {
    let count = 1;

    while (true) {
        try {
            yield count++;
        } catch (e) {
            count = 0;
        }
    }

}
// ---------確認-----------
let counter = count();
console.log(counter.next().value);
console.log(counter.next().value);
console.log(counter.next().value);
counter.throw(new Error("Reset"));
console.log(counter.next().value);