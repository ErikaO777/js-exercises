import { showAllProperties } from "./index.js";


describe("継承チェックとプロパティ", () => {
  test("自身のプロパティのみを持つオブジェクト", () => {
    const obj = { a: 1, b: 2 };
    expect(showAllProperties(obj)).toContain("a:1");
    expect(showAllProperties(obj)).toContain("b:2");
  });

  test("継承プロパティを持つオブジェクト", () => {
    const parent = { name: "Jack" };
    const child = Object.create(parent);
    child.age = 19;
    expect(showAllProperties(child)).toContain("age:19");
    expect(showAllProperties(child)).toContain("name:Jack");
  });
});
