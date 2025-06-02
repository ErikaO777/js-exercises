import { fib  } from "./index.js";

describe("math", () => {
  describe("fib", () => {
    it("5", () => {
      expect(fib(5)).toBe(5);
    });

    it("75", () => {
      expect(fib(75)).toBe(2111485077978050);
    });

  });

});