import { primes } from "./index.js";

describe("素数呼び出しテスト", () => {
    test("正常", () => {
        const prime = primes();
        expect(prime.next().value).toBe(2);
        expect(prime.next().value).toBe(3);
        expect(prime.next().value).toBe(5);
    });
});

