import { obj } from "./index.js";

describe("極座標変換オブジェクト", () => {
  beforeEach(() => {
    obj.r = 1.0;
    obj.theta = 0.5;
  });

  test("getter正常", () => {
    expect(obj.r).toBe(1.0);
    expect(obj.theta).toBe(0.5);
    expect(obj.x).toBeCloseTo(0.8775825618903728);
    expect(obj.y).toBeCloseTo(0.479425538604203);
  });
  test("setter正常 - x", () => {
    obj.x = 2.0;
    expect(obj.r).toBeCloseTo(2.056659633256298);
    expect(obj.theta).toBeCloseTo(0.23527337575298907);
    expect(obj.y).toBeCloseTo(0.479425538604203);
  });
  test("setter正常 - y", () => {
    obj.y = 2.0;
    expect(obj.r).toBeCloseTo(2.1840675705971346);
    expect(obj.theta).toBeCloseTo(1.1573025700504225);
    expect(obj.x).toBeCloseTo(0.877582561890373);
  });
  test("NaNチェック", () => {
    expect(() => {
      obj.x = NaN;
    }).toThrowError("Error: x は数値");
    expect(() => {
      obj.y = NaN;
    }).toThrowError("Error: y は数値");
  });
});
