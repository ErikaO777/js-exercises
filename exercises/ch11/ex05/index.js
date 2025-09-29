// PDF, ZIP, GIF, PNG のファイルタイプを判別
// ZIP...[0x50, 0x4b, 0x03, 0x04, 0x00, 0x00, 0x00]

export function detectFileType(data) {
  // 受け取ったデータをビッグエンディアンで読み込む
  let result;
  let setData = []; // 新しく配列を定義
  const dataView = new DataView(data);

  const type = { // ファイルの種類の定義
    PDF: [
      0x25, 0x50, 0x44, 0x46, 0x2d, 0x31, 0x2e, 0x34, 0x0a, 0x25, 0xc3, 0xa4,
      0xc3, 0xbc, 0xc3, 0xb6,
    ],
    ZIP1: [0x50, 0x4b, 0x03, 0x04, 0x00, 0x00, 0x00],
    ZIP2: [0x50, 0x4b, 0x05, 0x06, 0x00, 0x00],
    ZIP3: [0x50, 0x4b, 0x07, 0x08, 0x00, 0x00],
    GIF1: [0x47, 0x49, 0x46, 0x38, 0x37, 0x61, 0x00, 0x00],
    GIF2: [0x47, 0x49, 0x46, 0x38, 0x39, 0x61, 0x00, 0x00],
    PNG: [
      0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00, 0x00, 0x00,
    ]
  };

  for (let i = 0; i < dataView.byteLength; i++) {
    setData.push(dataView.getUint8(i, false)); // 配列にビッグエンディアンで値を格納
  }

  console.log(setData);
  switch (setData.join(",")) {
    case type.PDF.join(","):
      result = "PDF";
      break;
    case type.ZIP1.join(","):
    case type.ZIP2.join(","):
    case type.ZIP3.join(","):
      result = "ZIP";
      break;
    case type.GIF1.join(","):
    case type.GIF2.join(","):
      result = "GIF";
      break;
    case type.PNG.join(","):
      result = "PNG";
      break;
    default:
      result = "UNKNOWN";
      break;
  }

  return result;
}

const zipdata = new Uint8Array([0x50, 0x4b, 0x03, 0x04, 0x00, 0x00, 0x00]);
console.log(detectFileType(zipdata.buffer)); 
const gifdata = new Uint8Array([0x47, 0x49, 0x46, 0x38, 0x37, 0x61]);
console.log(detectFileType(gifdata.buffer));
