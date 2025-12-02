import { makeProxyAndLogs } from "./index.js";

describe("テンプレートリテラルを文字列で返す", () => {

    test("正常", () => {
        const a = {
            p: 1,
            f: (x, y) => {
                return x + y;
            },
        };

        const [proxy, logs] = makeProxyAndLogs(a);
        expect(logs).toEqual([]);
        expect(proxy.p).toBe(1);
        expect(proxy.f(1, 2)).toBe(3);
        expect(logs).toEqual([{ name: "f", args: [1, 2], timestamp: expect.any(Number) }]);
        expect(proxy.f(3, 5)).toBe(8);
        expect(logs).toEqual([
            { name: "f", args: [1, 2], timestamp: expect.any(Number) },
            { name: "f", args: [3, 5], timestamp: expect.any(Number) }
        ]);

    });

});
