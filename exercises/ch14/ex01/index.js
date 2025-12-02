// 書き込み不可、再定義不可のオブジェクト
export function unwritableAndUnconfigurableObj() {
    let obj = {};
    Object.defineProperty(obj, "a", { // Object.definePropertyでプロパティを定義
        value: 1,
        writable: false,
        configurable: false,
        enumerable: true
    });

    return obj;
}


// 書き込み可、再定義不可のオブジェクト
export function writableAndUnconfigurableObj() {
    let obj = {};
    Object.defineProperty(obj, "b", {
        value: 2,
        writable: true,
        configurable: false,
        enumerable: true
    });

    return obj;
}

// ネストの書き込み不可オブジェクト
export function nestedUnwritableObj() {
    let obj = { c: { d: { e: 3 } } };

    function unwritable(obj) { // ネストの中まで設定するために関数を作って再帰的に呼び出す
        Object.preventExtensions(obj); // 拡張を不可にしてプロパティ追加を不可にする
        for (const key of Object.keys(obj)) { // key in obj だとダメ
            const value = obj[key];
            Object.defineProperty(obj, key, {
                writable: false,
                configurable: false,
                enumerable: true
            });

            if (value && typeof value === 'object') {
                unwritable(value);
            }

        }
    }

    unwritable(obj);
    return obj;
}

console.log(nestedUnwritableObj());
console.log(unwritableAndUnconfigurableObj());
console.log(writableAndUnconfigurableObj());