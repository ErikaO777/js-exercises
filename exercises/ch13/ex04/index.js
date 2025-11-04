import * as fs from "node:fs";
import * as fsPromises from "node:fs/promises";

// readdirはディレクトリ内のファイルやディレクトリの一覧を取得
// statは情報の取得

export function fetchFirstFileSize(path, callback) { // 最初のファイルのサイズ
    fsPromises.readdir(path)
        .then((files) => { // 成功したとき
            if (files.length === 0) {
                callback(null, null);
                return;
            }

            fsPromises.stat(path) // さらにファイルデータを取得する
                .then((stats) => {
                    callback(null, stats.size, files[0]);
                })
                .catch((err) => {
                    callback(err);
                    return;
                });
        }
        )
        .catch((err) => { // エラーの場合はコールバック
            callback(err);
            return;
        });
}


export function fetchSumOfFileSizes(path, callback) { // すべてのファイルのサイズ合計
    let sum = 0;
    fsPromises.readdir(path)
        .then((files) => { // 成功したとき
            console.log(files);
            if (files.length === 0) {
                callback(null, null);
                return;
            }

            let sum = 0;
            // reduceでPromiseチェーンを構築してリストの中を順次処理
            files.reduce((promiseChain, file) => {
                return promiseChain.then(() => {
                    return fsPromises.stat(path + '/' + file)
                        .then((stats) => {
                            console.log(file, stats.size);
                            sum += stats.size;
                            console.log('sum:', sum);
                        });
                });
            }, Promise.resolve())


            // これだとstatが全部完了する前にcallbackが呼ばれる
            // for (const file of files) {
            //     fsPromises.stat(path + '/' + file) // さらにファイルデータを取得する
            //         .then((stats) => {
            //             console.log(file, stats.size);
            //             sum += stats.size;
            //             console.log('sum:', sum);
            //         })
            //         .catch((err) => {
            //             callback(err);
            //             return;
            //         });
            // }
        }
        ).then(() => {
            callback(null, sum);
        })
        .catch((err) => { // エラーの場合はコールバック
            callback(err);
            return;
        });

};



// ---------- 確認 ----------
// console.log('--- fetchFirstFileSize ---');
// fetchFirstFileSize('./', (err, size, file) => {
//     if (err) {
//         console.error('Error:', err);
//         return;
//     }
//     console.log('Size of first file:', size);
//     console.log('Name of first file:', file);
// });

// fetchFirstFileSize('../node_modules', (err, size, file) => {
//     if (err) {
//         console.error('Error:', err);
//         return;
//     }
//     console.log('Size of first file:', size);
//     console.log('Name of first file:', file);
// });

// console.log('--- fetchSumOfFileSizes ---');
// fetchSumOfFileSizes('./', (err, size) => {
//     if (err) {
//         console.error('Error:', err);
//         return;
//     }
//     console.log('Sum Size of file:', size);
// })
// fetchSumOfFileSizes('../node_modules', (err, size) => {
//     if (err) {
//         console.error('Error:', err);
//         return;
//     }
//     console.log('Sum Size of file:', size);
// });