import { convertToCRLF, convertToLF } from "./index.js";

describe("改行の変換", () => {
  test("LF → CRLF", () => {
    expect(convertToCRLF("Hello,\n world")).toBe("Hello,\r\n world");
  });

  test("CRLF → LF", () => {
    expect(convertToLF("Hello,\r\n world")).toBe("Hello,\n world");
  });
});
