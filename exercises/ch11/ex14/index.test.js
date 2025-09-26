import { sortJapanese, toJapaneseDateString } from "./index.js";

describe("sortJapanese関数のテスト", () => {
  test("基本的な日本語文字列配列のソート", () => {
    const input = ["りんご", "京都", "みかん", "イチゴ", "ぶどう"];
    const expected = ["イチゴ", "ぶどう", "みかん", "りんご", "京都"];
    expect(sortJapanese(input)).toEqual(expected);
  });

  test("大文字・小文字", () => {
    const input = ["つき", "っき", "づき", "ツキ"];
    const result = sortJapanese(input);
    expect(result).toHaveLength(input.length);
    input.forEach(item => {
      expect(result).toContain(item);
    });
  });

  test("濁点・半濁点", () => {
    const input = ["はな", "ばな", "ぱな"];
    const result = sortJapanese(input);
    expect(result).toHaveLength(input.length);
    input.forEach(item => {
      expect(result).toContain(item);
    });
  });

  test("配列でない引数が渡された場合はエラーを投げる", () => {
    expect(() => sortJapanese(123)).toThrow("引数は配列");
    expect(() => sortJapanese(null)).toThrow("引数は配列");
  });

});

describe("toJapaneseDateString関数のテスト", () => {
  test("令和", () => {
    const date = new Date("2024-04-02"); 
    expect(toJapaneseDateString(date)).toBe("令和6年4月2日");
  });

  test("平成", () => {
    const date = new Date("2019-04-30"); 
    expect(toJapaneseDateString(date)).toBe("平成31年4月30日");
  });

  test("明治", () => {
    const date = new Date("1912-07-29"); 
    expect(toJapaneseDateString(date)).toBe("明治45年7月29日");
  });

  test("Date オブジェクトでない引数が渡された場合はエラーを投げる", () => {
    expect(() => toJapaneseDateString("2024-04-02")).toThrow("引数はDateオブジェクト");
    expect(() => toJapaneseDateString(null)).toThrow("引数はDateオブジェクト");
  });
});
