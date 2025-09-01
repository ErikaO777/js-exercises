import { TypedMap } from "./index";

describe("TypedMap", () => {
  test("正しい型の entries ", () => {
    const map = new TypedMap("string", "number", [["a", 1], ["b", 2]]);
    expect(map.map.get("a")).toBe(1);
    expect(map.map.get("b")).toBe(2);
  });

  test("誤った型の entries", () => {
    expect(() => {
      new TypedMap("string", "number", [["a", "wrong"]]);
    }).toThrow(TypeError);
  });

  test("正しい型の key/value", () => {
    const map = new TypedMap("string", "number");
    map.set("age", 30);
    expect(map.map.get("age")).toBe(30);
  });

  test("誤った型の key ", () => {
    const map = new TypedMap("string", "number");
    expect(() => {
      map.set(123, 30);
    }).toThrow(TypeError);
  });

  test("誤った型の value ", () => {
    const map = new TypedMap("string", "number");
    expect(() => {
      map.set("age", "thirty");
    }).toThrow(TypeError);
  });
});
