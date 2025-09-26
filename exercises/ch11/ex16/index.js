export function retryWithExponentialBackoff(func, maxRetry, callback){

    const result = func(); // 引数の関数の呼び出し
    let count = 0;

    // funcがfalseの時はリトライ
    if(result === false){
        setTimeout(() => {
            if(maxRetry > 0){ // 最大リトライ回数より小さい場合
                console.log(`リトライ`);
                count++;
                retryWithExponentialBackoff(func, maxRetry - 1, callback); // ここでfunc?
            }else{
                console.log("最大リトライ回数に達しました。");
                callback(false);
            }
        }, 2 * count * 1000); // カウントの2倍の秒数
    }else if(result === true){
        callback(true);
    }



}

function booleanFunc(){
    return Math.random() < 0.5; // trueかfalseをランダムに返す
}

function callback(boolean){
    console.log("結果: " + boolean);
    return boolean;
}

console.log(retryWithExponentialBackoff(booleanFunc, 3, callback));