import { getDays, getWeekdays, dayToString, getDateObj } from "./index.js";

// ---------------- getDays -------------------
describe("getDays", () => {
  test("月の日数を返す", () => {
    // 2020年（閏年）のテスト
    expect(getDays(2020, 1)).toBe(31); // 1月は31日  
    // 2021年（通常年）のテスト
    expect(getDays(2021, 2)).toBe(28); // 通常年の2月は28日
  });

  test("数値以外のエラー", () => {
    expect(() => getDays(null, 1)).toThrow("引数は数値です");
    expect(() => getDays(2020, undefined)).toThrow("引数は数値です");
  });
});

// ---------------- getWeekdays -------------------
describe("getWeekdays", () => {
  test("期間の平日数", () => {
    // 2020年1月1日から2020年1月10日までの平日数
    expect(getWeekdays("2020-01-01", "2020-01-10")).toBe(8);
  });

  test("形式エラー", () => {
    expect(() => getWeekdays("2020/01/01", "2020-01-31")).toThrow("形式エラー");
  });
});

// ---------------- dayToString -------------------
describe("dayToString", () => {
  test("日付の曜日をロケール形式で返す", () => {
    // 日本語ロケールでのテスト
    expect(dayToString("2020-01-01", "ja-JP")).toContain("2020");
    
    // 英語ロケールでのテスト
    expect(dayToString("2020-01-01", "en-US")).toContain("2020");
  });

  test("形式エラー", () => {
    expect(() => dayToString("2020/01/01", "ja-JP")).toThrow("形式エラー");
    expect(() => dayToString("2020年01月01日", "ja-JP")).toThrow("形式エラー");
  });
});

// ---------------- getDateObj -------------------
describe("getDateObj", () => {
  test("先月1日の Date オブジェクト", () => {
    // 現在の日付を取得
    const now = new Date();
    const currentYear = now.getFullYear();
    
    // 現在の月を取得（0から始まる）
    const currentMonth = now.getMonth();
    
    // 先月の年月を計算
    let expectedYear = currentYear;
    let expectedMonth = currentMonth - 1;
    
    // 関数の結果を取得
    const result = getDateObj();
    
    // 期待値と実際の値を比較
    expect(result.getFullYear()).toBe(expectedYear);
    expect(result.getMonth()).toBe(expectedMonth);
    expect(result.getDate()).toBe(1); // 1日
    expect(result.getHours()).toBe(0); // 0時
    expect(result.getMinutes()).toBe(0); // 0分
    expect(result.getSeconds()).toBe(0); // 0秒
  });
});
