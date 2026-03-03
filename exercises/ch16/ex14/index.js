// 今回は同じファイル内にメインとワーカーどちらも書く
import threads from "worker_threads";
import http from "http";
import fs from "fs";
import path from "path";
import sharp from "sharp"; // 画像処理を行うためのライブラリ

// isMainThreadがtrueの時はメインスレッドを実行し、falseの時はワーカースレッドを実行する
if (threads.isMainThread) {
    // メインの処理は画面操作、画像の受け取り
    // htmlで入力していたファイル受け取りを、コマンドラインでファイルパス受け取りにする
    const infile = process.argv[2];
    let outfile = process.argv[3];

    if (!outfile) {
        const { dir, name } = path.parse(infile);
        outfile = path.join(dir, `${name}.gray.png`);
    }

    const worker = new threads.Worker(new URL(import.meta.url), { // import.meta.urlは現在のファイルのURLを表す そのまま渡すとエラーなのでURLオブジェクト化
        workerData: {
            infile,
            outfile
        },
    });

    // workerの状態を見る
    worker.on('message', (msg) => {
        if (msg.type === 'done') {
            console.log(`完了`);
        } else {
            console.log(`エラー`);
        }
    });

    worker.on('error', (err) => {
        console.error('Worker error:', err);
    });

} else {
    // サブには画像の処理など重い処理を書く
    (async () => {
        const { infile, outfile } = threads.workerData;
        console.log(`infile: ${infile}, outfile: ${outfile}`);

        // データの読み込みを待つ
        const { data, info } = await sharp(infile)
            .ensureAlpha() // 画像にアルファチャンネルがない場合は追加
            .raw()
            .toBuffer({ resolveWithObject: true });
        // 画像ファイルパスから画像認識

        // 受け取データのセット
        const width = info.width;
        const height = info.height;

        // 5x5のガウシアンカーネルとする（フィルタ行列）
        const kernel = [
            [1, 4, 6, 4, 1],
            [4, 16, 24, 16, 4],
            [6, 24, 36, 24, 6],
            [4, 16, 24, 16, 4],
            [1, 4, 6, 4, 1],
        ];
        // 畳み込みに必要な値
        const kHalf = 2; // 5x5 の半分
        const kSum = 256;

        const outputData = new Uint8ClampedArray(data.length);

        // 畳み込み　（２D畳み込み）
        const clamp = (v, a, b) => (v < a ? a : v > b ? b : v); // clamp関数でvを範囲内に収める
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                let r = 0, g = 0, b = 0, a = 0;
                for (let ky = -kHalf; ky <= kHalf; ky++) {
                    const sy = clamp(y + ky, 0, height - 1);
                    const row = kernel[ky + kHalf];
                    for (let kx = -kHalf; kx <= kHalf; kx++) {
                        const sx = clamp(x + kx, 0, width - 1);
                        const w = row[kx + kHalf];
                        const idx = (sy * width + sx) * 4;
                        r += data[idx] * w;
                        g += data[idx + 1] * w;
                        b += data[idx + 2] * w;
                        a += data[idx + 3] * w;
                    }
                }
                const outIdx = (y * width + x) * 4;
                outputData[outIdx] = Math.round(r / kSum); // 出力配列に、rgbaそれぞれ256で割った値を格納
                outputData[outIdx + 1] = Math.round(g / kSum);
                outputData[outIdx + 2] = Math.round(b / kSum);
                outputData[outIdx + 3] = Math.round(a / kSum); // aは処理する場合と処理しない場合がある？
            }
        }

        // 出力結果を書きだし
        await sharp(
            Buffer.from(outputData.buffer, outputData.byteOffset, outputData.byteLength),
            { raw: { width, height, channels: 4 } } // channelsはRGBAの4チャンネル
        ).toFile(outfile);

        threads.parentPort.postMessage({ type: 'done', outfile });
    })();

}
// ガウス分布ぼかしについて
// https://nsi-freak.com/gaussian/
// 参考
// https://enth-imaginary-rail.jp/memorandum/jsblur/
// https://www.clg.niigata-u.ac.jp/~medimg/practice_medical_imaging/imgproc_scion/4filter/index.htm

// ２d畳み込み　https://stackoverflow.com/questions/64669531/2d-convolution-for-javascript-arrays