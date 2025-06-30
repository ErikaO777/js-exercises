import { bitCount } from "./index.js";

describe("1の数を数える", () => {
  test("例 0bのついた2進数", () => {
    expect(bitCount(0b111)).toBe(3);
    expect(bitCount(0b1111111111111111111111111111111)).toBe(31);
  });
});
