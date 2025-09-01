import { powWithRecursion, powWithLoop  } from "./index.js";

test("powWithRecursion", () => {
  expect(powWithRecursion(2, 3)).toBe(Math.pow(2, 3));
  expect(powWithRecursion(3, 2)).toBe(Math.pow(3, 2));
  expect(powWithRecursion(4, 0)).toBe(Math.pow(4, 0));
  expect(powWithRecursion(0, 0)).toBe(Math.pow(0, 0));
});

test("powWithLoop", () => {
  expect(powWithLoop(2, 3)).toBe(Math.pow(2, 3));
  expect(powWithLoop(3, 2)).toBe(Math.pow(3, 2));
  expect(powWithLoop(4, 0)).toBe(Math.pow(4, 0));
  expect(powWithLoop(0, 0)).toBe(Math.pow(0, 0));
});