import { template } from "./index.js";

describe("テンプレートリテラルを文字列で返す", () => {

    test("正常", () => {
        expect(template``).toBe('""');
        expect(template`test`).toBe('"test"');
        expect(template`Hello, ${"A"}`).toBe('"Hello, string"');
        expect(template`${1} ${null} ${() => { }}`).toBe('"number object function"');
        expect(template`type of 'A' is ${"A"}`).toBe('"type of \'A\' is string"');
    });

});
