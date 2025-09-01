import { PositiveNumber } from "./index.js"; // ts でも可

describe("PositiveNumber", () => {
  test("常に正の数値を保持する", () => {
    const c = new PositiveNumber(2);
    expect(c.getX()).toBe(2);
    c.setX(9);
    expect(c.getX()).toBe(9);
    c.setX(100);
    expect(c.getX()).toBe(100);
  });

  test("マイナスエラー", () => {
    const c = new PositiveNumber(1);
    expect(() => c.setX(-1)).toThrowError("require : x > 0"); // 関数を渡す
  });

  test("外部アクセス確認", () => {
    const c = new PositiveNumber(1);
    c.setX(1);
    c.x = -5;
    expect(c.getX()).toBe(1);
  });
});
