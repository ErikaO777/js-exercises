import { mul, sum } from "./index.js";

describe("行列の積と和", () => {
  test("正常な行列の積", () => {
    const A = [[1, 2]];
    const B = [[3], [4]];
    expect(mul(A, B)).toStrictEqual([[11]]);

    const C = [[1, 2], [3, 4]];
    const D = [[5], [7]];
    expect(mul(C, D)).toStrictEqual([[19], [43]]);
  });
  test("正常な行列の和", () => {
    const A = [[1, 2]];
    const B = [[3, 4]];
    expect(sum(A, B)).toStrictEqual([[4, 6]]);

    const C = [[1], [2]];
    const D = [[3], [4]];
    expect(sum(C, D)).toStrictEqual([[4], [6]]);
  });
  test("違う型(和)", () => {
    const A = [[1, 2]];
    const B = [[3], [4]];
    expect(() => sum(A, B)).toThrow("行列の型が一致しません");
  });
});
