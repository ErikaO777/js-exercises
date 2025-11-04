import * as fsPromises from "node:fs/promises";

export function fetchSumOfFileSizes(path, callback) { // すべてのファイルのサイズ合計
    let sum = 0;

    fsPromises.readdir(path)
        .then((files) => { // 成功したとき（ファイル一覧取得）
            console.log(files);
            if (files.length === 0) {
                callback(null, null);
                return;
            }

            const statPromises = files.map((file) => { // 教科書13.2.5参照
                return fsPromises.stat(path + '/' + file); // ファイル配列filesから、各ファイルごとのstatのPromise
            });

            return Promise.all(statPromises) // Promise.allですべてのstatの完了を待ってから計算
                .then((statsArray) => {
                    statsArray.forEach((stats) => {
                        sum += stats.size;
                    });
                });
        })
        .then(() => {
            callback(null, sum);
        })
        .catch((err) => { // エラーの場合はコールバック
            callback(err);
            return;
        });

}