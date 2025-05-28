import { abs, sum, factorial, factorial2  } from "./index.js";

describe("math", () => {
  //absのテスト //PASS
  describe("abs", () => {
    it("returns same value when positive value given", () => {
      expect(abs(42)).toBe(42);
    });

    it("returns negated value when negative value given", () => {
      expect(abs(-42)).toBe(42);
    });

    it("returns zero value when zero given", () => {
      expect(abs(0)).toBe(0);
    });
  });

  //sumのテスト //PASS
  describe("sum", () =>{
    it("returns same value when positive value given", () => {
      expect(sum([2, 3, 5, 7, 11])).toBe(28);
    });

    it("returns negated value when negative value given", () => {
      expect(sum([-2, -3, -5, -7, -11])).toBe(-28);
    });

    it("returns zero value when zero given", () => {
      expect(sum([0,0,0,0,0])).toBe(0);
    });
  })

  //factorialのテスト //PASS
  describe("factorial", () => {
    it("returns same value when positive value given", () => {
      expect(factorial(4)).toBe(24);
    });
  })

  //factorial2のテスト //PASS
  describe("factorial2", () => {
    it("returns same value when positive value given", () => {
      expect(factorial2(5)).toBe(120);
    });
  })

});
