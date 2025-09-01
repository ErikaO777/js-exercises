import { instanceOf } from "./index.js";

describe("instanceOf", () => {
  test("多段に継承したクラスのインスタンスと基底クラスのコンストラクタを入力するケース", () => {
    class Animal {}
    class Dog extends Animal {}

    const d = new Dog();

    expect(instanceOf(d, Dog)).toBe(true);
    expect(instanceOf(d, Animal)).toBe(true);
    expect(instanceOf(d, Array)).toBe(false);
  });

  test("継承関係にないインスタンスとクラスのコンストラクタを入力するケース", () => {
    class Animal {}
    class Dog extends Animal {}
    class Cat extends Animal {}

    const d = new Dog();
    const c = new Cat();
    expect(instanceOf(c, Dog)).toBe(false);
    expect(instanceOf(d, Cat)).toBe(false);
  });
});
