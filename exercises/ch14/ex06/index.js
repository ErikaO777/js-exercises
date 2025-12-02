// オブジェクトのメソッドの履歴を配列に記録する
// 呼び出された時刻、メソッド名、パラメータ
// オブジェクトはProxy経由で呼び出し
export function makeProxyAndLogs(obj) {

    const logs = []; // 履歴を保存する配列
    let log =
    {
        name: "",
        args: [],
        timestamp: null
    } // logの初期値

    const handler = { // ハンドラー
        get(obj, prop, receiver) { // ターゲットのオブジェクト、プロパティキー、レシーバー
            const value = Reflect.get(obj, prop, receiver);

            // メソッドが呼ばれたときは記録する
            if (typeof obj[prop] === "function") {
                return new Proxy(value, {
                    apply(target, thisArg, argumentsList) { // applyで取得（引数まで取得するため）
                        logs.push({
                            name: prop,
                            args: argumentsList,
                            timestamp: Date.now()
                        });
                        return Reflect.apply(target, thisArg, argumentsList);
                    }
                });
            }

            return value; // メソッド以外はそのまま返す

        }
    }

    let p = new Proxy(obj, handler); // ターゲットのobjのプロキシ作成

    return [p, logs];
}

// ------- 確認 -------
// aは値p=1とメソッドfを持つオブジェクト
const a = {
    p: 1,
    f: (x, y) => {
        return x + y;
    },
};

const [proxy, logs] = makeProxyAndLogs(a);

console.log(logs); // [] logsを読んだとき
console.log(proxy.p); // 1 プロキシ経由でpへアクセス
console.log(proxy.f(1, 2)); // 3 プロキシ経由でfを呼び出し
console.log(logs); // [{ name: "c", args: [1, 2], timestamp: ... }]
console.log(proxy.f(3, 5));
console.log(logs); 
