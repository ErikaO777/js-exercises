export async function retryWithExponentialBackoff(func, maxRetry, callback, count = 0) {
    // 引数のfuncはPromiseを返す

    try {

        const result = await func(); // 引数の関数の呼び出し,ここでawaitで待つ
        let count = 0;

        // funcがfalseの時はリトライ
        if (result === false) {
            setTimeout(() => {
                if (maxRetry > 0) { // 最大リトライ回数より小さい場合
                    console.log(`リトライ`);
                    retryWithExponentialBackoff(func, maxRetry - 1, callback, count + 1);
                } else {
                    console.log("最大リトライ回数に達しました。");
                    callback(result);
                }
            }, 2 * count * 1000); // カウントの2倍の秒数
        } else if (result === true) {
            callback(result);
        }
    }
    catch (e) {
        console.log("エラーが発生しました:", e);
        callback(e);
    }

}

function booleanFunc() {
    return Math.random() < 0.5; // trueかfalseをランダムに返す
}

function callback(boolean) {
    console.log("結果: " + boolean);
    return boolean;
}

console.log(retryWithExponentialBackoff(booleanFunc, 3, callback));