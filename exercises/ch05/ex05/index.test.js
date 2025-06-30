import { extractEvenObject } from "./index.js";

describe("引数のオブジェクトから偶数のものだけ抽出", () => {
  test("o = { x: 1, y: 2, z: 3 }", () => {
    expect(extractEvenObject({ x: 1, y: 2, z: 3 })).toStrictEqual({ y: 2 });
  });
  test("偶数のみ", () => {
    expect(extractEvenObject({ a: 64, b: 48, c: 84, d: 22, e: 64 })).toStrictEqual({ a: 64, b: 48, c: 84, d: 22, e: 64 });
  });
  test("混合", () => {
    expect(extractEvenObject(
{ a: 56, b: 32, c: 93, d: 13, e: 57, f: 41 }
)).toStrictEqual({a: 56, b: 32 });
  });
  test("文字列入り", () => {
    expect(extractEvenObject({ a: 76, b: "hello", c: 90, d: "aiueo", e: "DAY"})).toStrictEqual({a: 76, c: 90 });
  });
});
