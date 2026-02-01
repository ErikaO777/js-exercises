// workerには重い処理を書く


self.addEventListener("message", (event) => {

    // 受け取データのセット
    const imageData = event.data;
    const width = imageData.width;
    const height = imageData.height;

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

    const outputData = new Uint8ClampedArray(imageData.data.length);

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
                    r += imageData.data[idx] * w;
                    g += imageData.data[idx + 1] * w;
                    b += imageData.data[idx + 2] * w;
                    a += imageData.data[idx + 3] * w;
                }
            }
            const outIdx = (y * width + x) * 4;
            outputData[outIdx] = Math.round(r / kSum); // 出力配列に、rgbaそれぞれ256で割った値を格納
            outputData[outIdx + 1] = Math.round(g / kSum);
            outputData[outIdx + 2] = Math.round(b / kSum);
            outputData[outIdx + 3] = Math.round(a / kSum); // aは処理する場合と処理しない場合がある？
        }
    }

    const outputImageData = new ImageData(outputData, width, height);
    self.postMessage(outputImageData);
    // ```
    // RGBそれぞれを平均してavg算出
    // for (let i = 0; i < data.length; i += 4) {
    //   const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    //   // data配列のRGBそれぞれをavgで上書き
    //   data[i] = avg;
    //   data[i + 1] = avg;
    //   data[i + 2] = avg;
    // }

});