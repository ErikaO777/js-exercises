import { Hiragana } from "./index.js";

describe("ひらがな1文字の判定", () => {

    test("表示", () => {
        const a = new Hiragana('あ');
        expect(String(a)).toBe('あ');
        expect(Number(a)).toBe(12354);
        expect(a.toString()).toBe('あ');
    });

    test("比較", () => {
        const a = new Hiragana('あ');
        const ka = new Hiragana('か');
        const sa = new Hiragana('さ');

        expect(a < ka).toBe(true);
        expect(sa > ka).toBe(true);
    });

});
