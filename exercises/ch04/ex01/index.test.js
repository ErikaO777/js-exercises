import { add, sub, mul, div  } from "./index.js";

describe("関数リテラルのテスト", () => {
  test("足し算 ", () => {
    expect(add({real: 10, imaginary : 20})).toBe(30);
  });
  test("引き算 ", () => {
    expect(sub({real: 10, imaginary : 20})).toBe(-10);
  });
  test("掛け算 ", () => {
    expect(mul({real: 10, imaginary : 20})).toBe(200);
  });
  test("割り算 ", () => {
    expect(div({real: 10, imaginary : 20})).toBe(0.5);
  });
});
