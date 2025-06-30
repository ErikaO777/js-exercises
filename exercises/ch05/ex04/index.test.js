import {
  fibonacciWithWHILE,
  fibonacciWithDO_WHILE,
  fibonacciWithFOR,
} from "./index.js";

describe("フィボナッチ数列によるリストを10項まで表示", () => {
  test("while文 ", () => {
    expect(fibonacciWithWHILE()).toStrictEqual([1, 1, 2, 3, 5, 8, 13, 21, 34, 55]);
  });
  test("do-while文", () => {
    expect(fibonacciWithDO_WHILE()).toStrictEqual([1, 1, 2, 3, 5, 8, 13, 21, 34, 55]);
  });
  test("for文 ", () => {
    expect(fibonacciWithFOR()).toStrictEqual([1, 1, 2, 3, 5, 8, 13, 21, 34, 55]);
  });
});
