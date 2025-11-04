// 指定されたディクトリ内のファイル/ディレクトリを再帰的に探索する
// ディレクトリだった場合、中身をファイルに到達するまで探索
import fs from 'fs';
import path from 'path';
export function* walk(rootPath) {
    let list = [];
    const items = fs.readdirSync(rootPath);

    for (const item of items) {
        const fullPath = path.join(rootPath, item);
        const fileinfo = fs.statSync(fullPath);
        const data = { path: fullPath, isDirectory: fileinfo.isDirectory() };

        if (data.isDirectory) {// ディレクトリなら中身を再帰的に探索
            yield* walk(fullPath);
        }

        list.push(data);

    }

    yield* list;

}

// ---------------- 確認 ----------------
// console.log([...walk('./')]);
// [ { path: 'exercises/ch12/ex06', isDirectory: true }, { path: 'exercises/ch12/ex06/index.js', isDirectory: false } ]