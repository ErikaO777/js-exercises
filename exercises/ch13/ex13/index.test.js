import { jest } from '@jest/globals';
import { join } from 'node:path';

// モック関数を作成
const mockReaddir = jest.fn();
const mockStat = jest.fn();

// node:fs/promises をモック
jest.unstable_mockModule('node:fs/promises', () => ({
    readdir: mockReaddir,
    stat: mockStat
}));

// モック設定後にモジュールをインポート
const { walk } = await import('./index.js');

describe('walk function tests', () => {
    beforeEach(() => {
        // テスト前にモックをクリア
        jest.clearAllMocks();
    });

    test('walk returns correct structure using mock', async () => {
        // モック構造を定義
        mockReaddir.mockImplementation((path) => {
            console.log('mockReaddir called with:', path);
            if (path === '.') return Promise.resolve(['A', 'B', 'foo.txt']);
            if (path === join('.', 'B')) return Promise.resolve(['C']);
            if (path === join('.', 'B', 'C')) return Promise.resolve(['buz.txt']);
            return Promise.resolve([]);
        });

        mockStat.mockImplementation((path) => {
            console.log('mockStat called with:', path);
            const dirs = [
                join('.', 'A'),
                join('.', 'B'),
                join('.', 'B', 'C')
            ];
            const isDir = dirs.includes(path);
            console.log(`${path} is directory: ${isDir}`);
            return Promise.resolve({
                isDirectory: () => isDir
            });
        });

        const results = [];
        for await (const item of walk('.')) {
            results.push(item);
        }

        expect(results).toEqual(expect.arrayContaining([
            { path: join('.', 'A'), isDirectory: true },
            { path: join('.', 'B'), isDirectory: true },
            { path: join('.', 'B', 'C'), isDirectory: true },
            { path: join('.', 'B', 'C', 'buz.txt'), isDirectory: false },
            { path: join('.', 'foo.txt'), isDirectory: false }
        ]));
    });
});