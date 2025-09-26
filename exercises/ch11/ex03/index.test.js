import { convertToBig, convertToLittle } from "./index.js";

describe("リトルエンディアンとビッグエンディアン", () => {
  // JavaScriptではUint32Arrayはリトルエンディアンとして扱われる
  // リトルエンディアン: 下位バイトから格納 (例: 0x12345678 → メモリ: 78 56 34 12)
  // ビッグエンディアン: 上位バイトから格納 (例: 0x12345678 → メモリ: 12 34 56 78)

  test("リトルエンディアン→ビッグエンディアンへの変換", () => {
    const result1 = convertToBig(new Uint32Array([0x12345678, 0x90abcdef]));
    const result2 = convertToBig(new Uint32Array([0b10100010]));
    const result3 = convertToBig(new Uint32Array([1000]));

    // バイトオーダーが反転するので、16進数表現も反転する
    // 0x12345678 → 0x78563412、0x90abcdef → 0xefcdab90
    expect(Array.from(result1).map((x) => x.toString(16))).toEqual([
      "78563412",
      "efcdab90",
    ]);
    // expect(Array.from(result2).map(x => x.toString(2))).toEqual(['10000101000000000000000000000000']);
    expect(Array.from(result3).map((x) => x.toString(10))).toEqual([
      "3355443200",
    ]);
  });

  test("ビッグエンディアン→リトルエンディアンへの変換", () => {
    // 入力値を明示的にビッグエンディアン順に指定する (ただしJavaScriptはリトルエンディアンとして扱う)
    const result1 = convertToLittle(new Uint32Array([0x78563412, 0xefcdab90]));
    const result2 = convertToLittle(new Uint32Array([0b10000101]));
    const result3 = convertToLittle(new Uint32Array([3355443200])); // 0x78563412の10進数表現

    // バイトオーダーが反転するので、16進数表現も反転する
    // 0x78563412 → 0x12345678、0xefcdab90 → 0x90abcdef
    expect(Array.from(result1).map((x) => x.toString(16))).toEqual([
      "12345678",
      "90abcdef",
    ]);
    // expect(Array.from(result2).map(x => x.toString(2))).toEqual(['10100010000000000000000000000000']);
    expect(Array.from(result3).map((x) => x.toString(10))).toEqual([
      "305419896",
    ]); // 0x12345678の10進数表現
  });
});
