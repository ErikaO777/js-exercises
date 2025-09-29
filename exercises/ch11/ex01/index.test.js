import { TypeMap } from "./index.js";

describe("TypeMapクラス", () => {
  test("問題文に記載のテスト", () => {
    class Foo {}
    const typeMap = new TypeMap();
    typeMap.set(String, "string");
    typeMap.set(Number, 123);
    typeMap.set(Foo, new Foo());
    expect(typeMap.get(String)).toBe("string");
    expect(typeMap.get(Number)).toBe(123);
    expect(typeMap.get(Foo) instanceof Foo).toBe(true);
  });

  test("エラーテスト", () => {
    // setterエラー
    const typeMap = new TypeMap();
    expect(() => {
      typeMap.set(Date, "not a date");
    }).toThrow("Invalid key");

    expect(() => {
    typeMap.set(123, 123);
    }).toThrow("Invalid key");
    

    expect(() => {
    typeMap.set(123, 123);
    }).toThrow("Invalid key");
  
    typeMap.set(String, "string");
    typeMap.set(Number, 123);

    // getterエラー
    expect(() => {
    typeMap.get(123);
    }).toThrow("Not found"); // 見つからないエラー。。。
});
});