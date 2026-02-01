// index.jsからworkerを呼び出す

let worker = new Worker("./worker.js");

worker.addEventListener("message", (event) => {
  const filteredCanvas = document.getElementById("filtered");
  const filteredCtx = filteredCanvas.getContext("2d");
  const outputImageData = event.data;

  filteredCanvas.width = outputImageData.width;
  filteredCanvas.height = outputImageData.height;

  filteredCtx.putImageData(outputImageData, 0, 0);
});


// 画面の操作や、画像の受け取りのみにして、その他の処理はworkerに任せる
document.getElementById("image").addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) {
    return;
  }

  const img = new Image();
  const reader = new FileReader();

  // readerとimgそれぞれloadでイベント処理
  // readerで読み込んだデータをimgのsrcにセット
  reader.addEventListener("load", (e) => {
    img.src = e.target.result;
  });

  // imgのloadでキャンバスに描画、フィルタ処理
  img.addEventListener("load", () => {
    const originalCanvas = document.getElementById("original");
    const originalCtx = originalCanvas.getContext("2d");

    originalCanvas.width = img.width;
    originalCanvas.height = img.height;
    originalCtx.drawImage(img, 0, 0);

    // 処理画像に対しては画像ピクセルの RGBA 配列を取得
    const imageData = originalCtx.getImageData(0, 0, img.width, img.height);
    worker.postMessage(imageData);

  });

  reader.readAsDataURL(file);
});

// ガウス分布ぼかしについて
// https://nsi-freak.com/gaussian/
// 参考
// https://enth-imaginary-rail.jp/memorandum/jsblur/
// https://www.clg.niigata-u.ac.jp/~medimg/practice_medical_imaging/imgproc_scion/4filter/index.htm

// ２d畳み込み　https://stackoverflow.com/questions/64669531/2d-convolution-for-javascript-arrays