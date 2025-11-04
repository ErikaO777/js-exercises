import { jest } from '@jest/globals';

const mockReaddir = jest.fn();
const mockStat = jest.fn();

// node:fs/promisesをモック
jest.unstable_mockModule('node:fs/promises', () => ({
    readdir: mockReaddir,
    stat: mockStat
}));

// モジュールのインポートはモック設定後に行う 普通のimportではだめ
const { fetchFirstFileSize } = await import("./index.js");
const { fetchSumOfFileSizes } = await import("./index.js");

describe("fetchFirstFileSize、fetchSumOfFileSizes関数のテスト", () => {
    beforeEach(() => {
        // 各テスト前にモックをクリア
        jest.clearAllMocks();
    });

    test("fetchFirstFileSize-正常系", (done) => {
        const mockFiles = ['file1.txt', 'file2.txt'];
        const mockStats = [{ size: 100 }, { size: 200 }];

        // モック関数の戻り値を設定
        mockReaddir.mockResolvedValue(mockFiles);
        mockStat
            .mockResolvedValueOnce(mockStats[0])
            .mockResolvedValueOnce(mockStats[1]);

        fetchFirstFileSize("./", (err, result) => {
            expect(err).toBeNull();
            expect(result).toBe(100);
            done();
        });
    });
    test("fetchFirstFileSize-エラー系", (done) => {
        // readdirでエラーを発生させる
        const mockError = new Error("読み込み失敗");
        mockReaddir.mockRejectedValue(mockError);

        fetchSumOfFileSizes("./", (err, result) => {
            expect(err).toBeInstanceOf(Error);
            expect(err.message).toBe("読み込み失敗");
            done();
        });

    });

    test("fetchSumOfFileSizes-正常系", (done) => {
        const mockFiles = ['file1.txt', 'file2.txt'];
        const mockStats = [{ size: 100 }, { size: 200 }];

        // モック関数の戻り値を設定
        mockReaddir.mockResolvedValue(mockFiles);
        mockStat
            .mockResolvedValueOnce(mockStats[0])
            .mockResolvedValueOnce(mockStats[1]);

        fetchSumOfFileSizes("./", (err, result) => {
            expect(err).toBeNull();
            expect(result).toBe(300);
            done();
        });
    });

    test("fetchSumOfFileSizes-エラー系", (done) => {
        // readdirでエラーを発生させる
        const mockError = new Error("読み込み失敗");
        mockReaddir.mockRejectedValue(mockError);

        fetchSumOfFileSizes("./", (err, sum) => {
            expect(err).toBeInstanceOf(Error);
            expect(err.message).toBe("読み込み失敗");
            expect(sum).toBeUndefined();
            done();
        });

    });
});

