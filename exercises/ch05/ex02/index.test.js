import { toEscapeSequencewithIF, toEscapeSequencewithSWITCH } from "./index.js";

describe("エスケープシーケンスへの変換", () => {
  test("バックスラッシュの確認 ", () => {
    expect(toEscapeSequencewithIF("Hello\\, world! ")).toBe("Hello\\\\, world! ");
    expect(toEscapeSequencewithSWITCH("Hello\\, world! ")).toBe("Hello\\\, world! ");
  });
  test("アポストロフィの確認 ", () => {
    expect(toEscapeSequencewithIF("Hello, `world!` ")).toBe("Hello, `world!` ");
    expect(toEscapeSequencewithSWITCH("Hello, `world!` ")).toBe("Hello, `world!` ");
  });
  test("ダブルクォーテーションの確認 ", () => {
    expect(toEscapeSequencewithIF('Hello, "world!" ')).toBe('Hello, \"world!\" ');
    expect(toEscapeSequencewithSWITCH('Hello, "world!" ')).toBe('Hello, \"world!\" ');
  });
});
