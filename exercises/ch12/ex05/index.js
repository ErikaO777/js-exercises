// 指定されたファイルパスを受け取り、そのファイルを改行コード \n の出現ごとに分割して返すジェネレータ関数 
// テキストファイル
// 一定サイズごとに区切って、読み込む中から改行コードを都度探し、分割
import fs from 'fs';

export function* readLines(filePath) {
    try {

        let text = "";

        // バッファサイズで区切って読む
        const bufferSize = 32 * 1024;

        // ストリーム作成で、少しずつデータを読み込む
        const stream = fs.createReadStream(filePath, {
            highWaterMark: bufferSize,
            encoding: 'utf8' // バイナリ処理したい場合は省略
        });

        stream.on('data', (chunk) => { // ここでデータを読む(読み込まれるたびに走る)
            text += chunk;
        });

        stream.on('end', () => { // 読み込み終わったら呼ばれる
            console.log('完了');
            console.log(text);
            stream.close(); // ファイルを閉じる
        });

        yield text.split('\n');

    } catch (e) {
        console.error('エラー発生 ファイルを閉じます');
        stream.close(); // ファイルを閉じる
    }

}

// -------確認-----------
// let line = readLines('./ex05/memo.txt');
// console.log([...line]);

// let line = readLines('./ex05/test.txt');
// console.log([...line]);
