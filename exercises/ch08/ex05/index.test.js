import { sequenceToObject } from "./index.js";

describe("sequenceToObject", () => {
  test("正常", () => {
  expect(sequenceToObject("a", 1, "b", 2)).toEqual({ a: 1, b: 2 });
  expect(sequenceToObject("c", 3, "d", 4, "e", 5)).toEqual({ c: 3, d: 4, e: 5 });
  });

  test("異常", () => {
  expect(() => sequenceToObject("f", 6, "g")).toThrow("引数の個数が奇数です");
  expect(() => sequenceToObject("h", 7, 8, 9)).toThrow("キーの型がstringではありません");
  });
});
