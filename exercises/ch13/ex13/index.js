import fs from 'fs';
import path from 'path';
import * as fsPromises from "node:fs/promises";
export async function* walk(rootPath) {
    let list = [];
    const items = await fsPromises.readdir(rootPath);

    for (const item of items) { // for-ofを使う。Promise.allでは使えない
        const fullPath = path.join(rootPath, item);
        const fileinfo = await fsPromises.stat(fullPath);
        const data = { path: fullPath, isDirectory: fileinfo.isDirectory() };

        if (data.isDirectory) {// ディレクトリなら中身を再帰的に探索

            for await (const subItem of walk(fullPath)) {
                list.push(subItem);
            }

        }

        list.push(data);

    }

    yield* list;

}

// ---------------- 確認 ----------------
console.log("確認");
// (async () => {
//     // カレントディレクトリ (.) のファイル・フォルダを再帰的に取得し表示する
//     for await (const elem of walk(".")) {
//         console.log(elem);
//     }
// })();

// ------------ ダメだったもの ------------
// const fullPath = path.join(rootPath, items[index]);
// const statPromises = items.map((item) => {
//     return fsPromises.stat(rootPath + '/' + item);
// });

// await Promise.all(statPromises) // Promise.allですべてのstatの完了を待ってから計算
//     .then((statsArray) => {
//         statsArray.forEach(async (stats, index) => {
//             console.log(stats, index);
//             const fullPath = path.join(rootPath, items[index]);
//             const data = { path: fullPath, isDirectory: stats.isDirectory() };
//             console.log(data);
//             if (data.isDirectory) {// ディレクトリなら中身を再帰的に探索
//                 await walk(fullPath);
//             }
//             list.push(data);
//         });
//     });

// console.log("list:", list);