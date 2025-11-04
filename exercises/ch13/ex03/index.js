import * as fs from "node:fs";
import { promisify } from 'node:util';

// fs.readdir
// ディレクトリ内のファイルやサブディレクトリの一覧を取得
export function readdir(path, options) {
    return new Promise((resolve, reject) => {
        fs.readdir(path, options, (err, files) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(files);
        });
    }
    )
}

// promisify版
export function readdir2(path, options) {
    const readdirPromise = promisify(fs.readdir);
    return readdirPromise(path, options);
}


// fs.stat
// ファイルやディレクトリの情報（サイズ、作成日時、更新日時、パーミッションなど）を取得
export function stat(path, options) {
    return new Promise((resolve, reject) => {
        fs.stat(path, options, (err, stats) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(stats);
        });
    }
    )
}

// promisify版
export function stat2(path, options) {
    const statPromise = promisify(fs.stat);
    return statPromise(path, options);
}

// ---------- 確認　----------
// readdir('./')
//     .then((files) => console.log('readdir success:', files))
//     .catch((err) => console.error('readdir error:', err));

// readdir2('./')
//     .then((files) => console.log('readdir2 success:', files))
//     .catch((err) => console.error('readdir2 error:', err));

// stat('./')
//     .then((stats) => console.log('stat success:', stats))
//     .catch((err) => console.error('stat error:', err));

// stat2('./')
//     .then((stats) => console.log('stat2 success:', stats))
//     .catch((err) => console.error('stat2 error:', err));