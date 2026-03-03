import { checkEntry } from "./index.js";
import { jest } from '@jest/globals';

describe("ファイル、ディレクトリを確認", () => {

    let errorLog;

    beforeEach(() => {
        errorLog = jest.spyOn(console, 'error').mockImplementation(() => { });
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test("正常 -ファイルの確認", () => {
        expect(checkEntry('./ch16/ex07/index.js')).toBe('file');
    });

    test("正常 -ディレクトリの確認", () => {
        expect(checkEntry('./ch16/ex06')).toBe('directory');
    });

    test("パスエラー", () => {
        expect(errorLog).toHaveBeenCalledWith(expect.stringContaining('がありません'));
    });

});

