import { jest } from '@jest/globals';
import { join } from 'node:path';

// モック関数を作成

const mockReaddirSync = jest.fn();
const mockStatSync = jest.fn();

// fs モジュールをモック
// このモジュールはindex.j内で使われているモジュールル
jest.unstable_mockModule('fs', () => ({
    default: {
        readdirSync: mockReaddirSync,
        statSync: mockStatSync
    }
}));

// モック設定後にモジュールをインポート
import { walk } from './index.js';

describe('walk function tests', () => {
    beforeEach(() => {
        // テスト前にモックをクリア
        jest.clearAllMocks();
    });

    test('walk returns correct structure using mock', async () => {
        // モック構造を定義
        mockReaddirSync.mockImplementation((path) => {
            if (path === '.') return ['A', 'B', 'foo.txt'];
            if (path === join('.', 'B')) return ['C'];
            if (path === join('.', 'B', 'C')) return ['buz.txt'];
            return [];
        });

        mockStatSync.mockImplementation((path) => {
            const dirs = [
                join('.', 'A'),
                join('.', 'B'),
                join('.', 'B', 'C')
            ];
            const isDir = dirs.includes(path);
            return { isDirectory: () => isDir }; // isDirはtrue/false
        });

        const results = [];
        for (const item of walk('.')) {
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
