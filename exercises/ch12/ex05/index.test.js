import { readLines } from "./index.js";
// import "./test.txt";

describe("readLines関数のテスト", () => {
    test("配列展開でのテスト", () => {
        const lines = [...readLines("./test.txt")];
        expect(lines).toEqual(["AAAA", "BBBB", "CCCCC"]);
    });
});

