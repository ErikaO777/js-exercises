import { ncList, square, nowTime  } from "./index.js";

test("ncList", () => {
    // toBeではなくtoEqualを使う
    // toBeは参照の一致を確認
  expect(ncList(3,"A")).toEqual(["A", "A", "A"]); 
  expect(ncList(2,"B")).toEqual(["B", "B"]);
  expect(ncList(1,"C")).toEqual(["C"]);
  expect(ncList(0,"D")).toEqual([]);
});

test("square", () => {
  expect(square(3)).toBe(9);
  expect(square(0)).toBe(0);
});

test("nowTime", () => {
  expect(nowTime()).toHaveProperty("now");
  expect(nowTime().now).toBeInstanceOf(Date);
});