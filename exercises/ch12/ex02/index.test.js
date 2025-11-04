import { fibonacciSequence, fibonacciIter, fibonacci } from "./index.js";

describe("イテレータ、ジェネレータ関数のテスト", () => {
    test("正常 -イテレータの挙動", () => {
        const fibIter = fibonacciIter();
        expect(fibIter.next().value).toBe(1);
    });

    test("正常 -fibonacciを用いて一致するかどうか", () => {
        const fibGen = fibonacciSequence();
        function fibonacciGen(n) {
            for (let f of fibGen) { // イテレータオブジェクトのnext()メソッドを呼び出している
                if (n-- <= 0) return f;
            }
        }
        expect(fibonacciGen(20)).toBe(fibonacci(20));
    });

});

