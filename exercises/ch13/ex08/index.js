import * as fsPromises from "node:fs/promises";

// 13.4をasync/await で書き直す

export async function fetchFirstFileSize(path, callback) { // 最初のファイルのサイズ
    try {
        const files = await fsPromises.readdir(path);
        if (files.length === 0) {
            callback(null, null);
            return;
        }
        const stats = await fsPromises.stat(path);
        callback(null, stats.size, files[0]);
    } catch (err) {
        callback(err);
        return;
    }
}

// Promise.allは引数でPromiseの配列を受け取り、Promiseオブジェクトを返す
export async function fetchSumOfFileSizes(path, callback) { // すべてのファイルのサイズ合計
    let sum = 0;
    try {
        const files = await fsPromises.readdir(path);
        if (files.length === 0) {
            callback(null, null);
            return;
        }

        const statPromises = files.map((file) => { // 教科書13.2.5参照
            return fsPromises.stat(path + '/' + file); // ファイル配列filesから、各ファイルごとのstatのPromise
        });

        const statsArray = await Promise.all(statPromises); // Promise.allですべてのstatの完了を待ってから計算
        statsArray.forEach((stats) => {
            sum += stats.size;
        });

    } catch (err) {
        callback(err);
        return;
    }
}