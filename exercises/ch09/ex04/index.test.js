import { warriorClass, magicWarriorClass, warriorFn, magicWarriorFn} from "./index.js";

describe("クラス記法", () => {
  test("正常なダメージ値が返ってくる", () => {
    const magicWarrior = new magicWarriorClass();
    magicWarrior.atk = 10;
    expect(magicWarrior.attack()).toBe(magicWarrior.atk * 2); // 2倍の値
  });
});

describe("プロトタイプ記法", () => {
  test("正常なダメージ値が返ってくる", () => {
    const magicWarrior = new magicWarriorFn();
    magicWarrior.atk = 10;
    magicWarrior.mgc = 5;
    expect(magicWarrior.magicAttack()).toBe(magicWarrior.atk * 2 + magicWarrior.mgc);
  });
});
