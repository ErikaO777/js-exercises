document.getElementById("image").addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) {
    return;
  }

  const img = new Image();
  const reader = new FileReader();

  // readerとimgそれぞれloadでイベント処理
  reader.addEventListener("load", (e) => {
    img.src = e.target.result;
  });

  img.addEventListener("load", () => {
    const originalCanvas = document.getElementById("original");
    const filteredCanvas = document.getElementById("filtered");

    // 元画像に対してフィルタ処理
    const originalCtx = originalCanvas.getContext("2d");
    const filteredCtx = filteredCanvas.getContext("2d");

    originalCanvas.width = img.width;
    originalCanvas.height = img.height;
    filteredCanvas.width = img.width;
    filteredCanvas.height = img.height;

    originalCtx.drawImage(img, 0, 0);

    // 処理画像に対しては画像ピクセルの RGBA 配列を取得
    const imageData = originalCtx.getImageData(0, 0, img.width, img.height);
    const data = imageData.data;
    const width = img.width;
    const height = img.height;

    // グレースケールへの変換 (RGB を足して平均を取っている)
    //
    // ガウシアンフィルタを実装する場合はこの周辺のコードを変更しなさい
    // imageData の中身はそのままに別の配列に結果を格納するとよい
    // ```js
    const outputData = new Uint8ClampedArray(imageData.data.length);
    //
    // TODO: ここで imageData.data を参照して outputData に結果を格納

    // 5x5のガウシアンカーネルとする
    const kernel = [
      [1, 4, 6, 4, 1],
      [4, 16, 24, 16, 4],
      [6, 24, 36, 24, 6],
      [4, 16, 24, 16, 4],
      [1, 4, 6, 4, 1],
    ];
    const kHalf = 2; // 5x5 の半分
    const kSum = 256;

    // 畳み込み
    const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
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
        outputData[outIdx] = Math.round(r / kSum);
        outputData[outIdx + 1] = Math.round(g / kSum);
        outputData[outIdx + 2] = Math.round(b / kSum);
        outputData[outIdx + 3] = Math.round(a / kSum);
      }
    }

    const outputImageData = new ImageData(outputData, img.width, img.height);
    filteredCtx.putImageData(outputImageData, 0, 0);
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

  reader.readAsDataURL(file);
});

// ガウス分布ぼかしについて
// https://nsi-freak.com/gaussian/
// 参考
// https://enth-imaginary-rail.jp/memorandum/jsblur/