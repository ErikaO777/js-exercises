import { DynamicSizeArray } from "./index.js";

test("get", () => {
  const array = new DynamicSizeArray();
  array.push("a");
  array.push("b");
  array.push("c");
  expect(array.get(0)).toBe("a");
  expect(array.get(1)).toBe("b");
  expect(array.get(2)).toBe("c");
  expect(() => array.get(3)).toThrowError("Array index out of range: 3");
});

test("set", () => {
  const array = new DynamicSizeArray();
  array.push("a"); // pushしてからset
  array.push("b");
  array.push("c");
  array.set(0, "x");
  array.set(1, "y");
  array.set(2, "z");
  expect(array.get(0)).toBe("x");
  expect(array.get(1)).toBe("y");
  expect(array.get(2)).toBe("z");
  expect(() => array.set(3, "d")).toThrowError("Array index out of range: 3");
});

test("length", () => {
  const array = new DynamicSizeArray();
  expect(array.length()).toBe(0);
  array.push("a");
  expect(array.length()).toBe(1);
});

test("push", () => {
  const array = new DynamicSizeArray();
  array.push("a");
  array.push("b");
  array.push("c");
  array.push("d");
  array.push("e");
  expect(array.length()).toBe(5);
  expect(array.get(0)).toBe("a");
  expect(array.get(4)).toBe("e");
});
