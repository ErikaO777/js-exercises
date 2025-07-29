import { selectionSort } from "./index.js";

test("選択ソートのテスト", () => {
  expect(selectionSort([5, 3, 8, 1, 2])).toStrictEqual([1, 2, 3, 5, 8]);
  expect(selectionSort([3, 1, 4, 1, 5, 9])).toStrictEqual([1, 1, 3, 4, 5, 9]);
});

test("選択ソートのテスト 例外", () => {
  expect(selectionSort([5, 3, 8, 1, null])).toStrictEqual([null, 1, 3, 5, 8]);
  expect(selectionSort([])).toStrictEqual([]);
});
