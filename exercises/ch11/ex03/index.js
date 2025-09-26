
export function convertToBig(array){
// リトルエンディアンとして読み込み,ビッグエンディアンに格納しなおして配列を返す
    const newBuffer = new ArrayBuffer(array.buffer.byteLength);
    const dataView = new DataView(newBuffer);
    const sourceView = new DataView(array.buffer);

    for (let i = 0; i < array.length; i++) {
        // リトルエンディアンで読み込み
        const value = sourceView.getUint32(i * 4, true);
        // ビッグエンディアンで書き込み
        dataView.setUint32(i * 4, value, false);
    }
    return new Uint32Array(newBuffer);
}

export function convertToLittle(array){
// ビッグエンディアンとして読み込み,リトルエンディアンに格納しなおして配列を返す
    const newBuffer = new ArrayBuffer(array.buffer.byteLength);
    const dataView = new DataView(newBuffer);
    const sourceView = new DataView(array.buffer);

    for (let i = 0; i < array.length; i++) {
        // ビッグエンディアンで読み込み
        const value = sourceView.getUint32(i * 4, false);
        // リトルエンディアンで書き込み
        dataView.setUint32(i * 4, value, true);
    }
    return new Uint32Array(newBuffer);
}

// ----　確認　----
console.log("ビッグエンディアンに変換");
console.log(Array.from(convertToBig(new Uint32Array([0x12345678, 0x90abcdef]))).map(x => x.toString(16)));
console.log(Array.from(convertToBig(new Uint32Array([0x12345678]))).map(x => x.toString(16))); // 毎回新しい配列を作成
console.log("リトルエンディアンに変換");
console.log(Array.from(convertToLittle(new Uint32Array([0x12345678, 0x90abcdef]))).map(x => x.toString(16)));
console.log(Array.from(convertToLittle(new Uint32Array([0x12345678]))).map(x => x.toString(16))); // 毎回新しい配列を作成



// 32ビットは4バイト
// dataview.setUint32(byteOffset, value [, littleEndian]) 位置、値、リトルエンディアンかどうか
// dataview.getUint32(byteOffset [, littleEndian]) 位置、リトルエンディアンかどうか