import fs from 'fs';

// ファイルならfile、ディレクトリならdirectoryを返す
export function checkEntry(path) {

    try {
        const stats = fs.statSync(path);
        if (stats.isFile()) {
            console.log(`${path}はファイル`);
            return 'file';
        } else if (stats.isDirectory()) {
            console.log(`${path}はディレクトリ`);
            return 'directory';
        } else {
            return;
        }
    } catch (err) {
        switch (err.code) {
            case 'ENOENT':
                console.error(`エラー: ${path}がありません`);
                break;
            default:
                console.error(`エラー: ${err.message}`);
        }
    }
}

checkEntry('./index.test.js');
checkEntry('./ch16/ex07/index.test.js');
checkEntry('./ch16/ex06');