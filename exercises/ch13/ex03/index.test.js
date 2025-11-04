import { jest } from '@jest/globals';

// node:fsとnode:utilをモック
const mockReaddir = jest.fn();
const mockStat = jest.fn();
const mockPromisify = jest.fn();

jest.unstable_mockModule('node:fs', () => ({
    readdir: mockReaddir,
    stat: mockStat
}));

jest.unstable_mockModule('node:util', () => ({
    promisify: mockPromisify
}));

const { readdir, readdir2, stat, stat2 } = await import("./index.js");

// jest.fn()でモック関数の作成
// -------------------------- readdir --------------------------
describe("readdir関数のテスト", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("成功", async () => {
        const mockFiles = ['file1.txt', 'file2.txt'];

        // fs.readdirのモック - コールバック形式
        mockReaddir.mockImplementation((path, options, callback) => {
            callback(null, mockFiles);
        });

        const result = await readdir('./');
        expect(result).toEqual(mockFiles);
    });

    test("失敗", async () => {
        const errorMessage = 'Directory not found';

        mockReaddir.mockImplementation((path, options, callback) => {
            callback(new Error(errorMessage));
        });

        await expect(readdir('./')).rejects.toThrow(errorMessage);
    });
});

describe("readdir2関数のテスト", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("成功", async () => {
        const mockFiles = ['file1.txt', 'file2.txt'];

        // promisifyのモック
        const mockPromisifiedReaddir = jest.fn().mockResolvedValue(mockFiles);
        mockPromisify.mockReturnValue(mockPromisifiedReaddir);

        const result = await readdir2('./');
        expect(result).toEqual(mockFiles);
    });

    test("失敗", async () => {
        const errorMessage = 'Directory not found';

        const mockPromisifiedReaddir = jest.fn().mockRejectedValue(new Error(errorMessage));
        mockPromisify.mockReturnValue(mockPromisifiedReaddir);

        await expect(readdir2('./')).rejects.toThrow(errorMessage);
    });
});

// -------------------------- stat --------------------------
describe("stat関数のテスト", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("成功", async () => {
        const mockStats = { size: 100, isFile: () => true };

        // fs.statのモック - コールバック形式
        mockStat.mockImplementation((path, options, callback) => {
            callback(null, mockStats);
        });

        const result = await stat('./file.txt');
        expect(result).toEqual(mockStats);
    });

    test("失敗", async () => {
        const errorMessage = 'File not found';

        mockStat.mockImplementation((path, options, callback) => {
            callback(new Error(errorMessage));
        });

        await expect(stat('./file.txt')).rejects.toThrow(errorMessage);
    });
});

describe("stat2関数のテスト", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("成功", async () => {
        const mockStats = { size: 100, isFile: () => true };

        // promisifyのモック
        const mockPromisifiedStat = jest.fn().mockResolvedValue(mockStats);
        mockPromisify.mockReturnValue(mockPromisifiedStat);

        const result = await stat2('./file.txt');
        expect(result).toEqual(mockStats);
    });

    test("失敗", async () => {
        const errorMessage = 'File not found';

        const mockPromisifiedStat = jest.fn().mockRejectedValue(new Error(errorMessage));
        mockPromisify.mockReturnValue(mockPromisifiedStat);

        await expect(stat2('./file.txt')).rejects.toThrow(errorMessage);
    });
});