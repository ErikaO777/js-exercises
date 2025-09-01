import { any, catching } from "./index.js";

describe("any", () => {
  test("正常", () => {
    const isNonZero = any(
      (n) => n > 0,
      (n) => n < 0
    );
    expect(isNonZero(0)).toBe(false);
    expect(isNonZero(42)).toBe(true);
    expect(isNonZero(-0.5)).toBe(true);
  });
});

describe("catching", () => {
  const safeJsonParse = catching(JSON.parse, (e) => {
    return { error: e.toString() };
  });

  test("正常", () => {
    expect(safeJsonParse('{"a": 1}')).toEqual({ a: 1 });
  });

  test("異常", () => {
    expect(safeJsonParse("{Invalid Json}")).toEqual({
      error: expect.any(String),
    });
  });
});
