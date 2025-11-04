import { count } from "./index.js";

describe("カウンターテスト", () => {
    test("正常", () => {
        const counter = count();
        expect(counter.next().value).toBe(1);
        expect(counter.next().value).toBe(2);
        expect(counter.next().value).toBe(3);
    });

    test("異常（リセット）", () => {
        const counter = count();
        expect(counter.next().value).toBe(1);
        expect(counter.next().value).toBe(2);
        expect(counter.next().value).toBe(3);
        counter.throw(new Error("Reset")); // ここでリセット
        expect(counter.next().value).toBe(1);
    });
});

