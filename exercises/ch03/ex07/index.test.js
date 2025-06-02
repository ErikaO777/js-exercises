import { equalArrays } from "./index.js";

test("ch03-ex07", () => {
  const x = NaN; // ここを変更
  const y = 0; // ここを変更

  expect(equalArrays(x, y)).toBe(true);
  expect(x).not.toEqual(y);
});

//試したもの
// x = ["AAA"], y = "AAA"
// x = 0.2-0.1, y = 0.1