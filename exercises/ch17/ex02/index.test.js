import { expect, jest, test } from '@jest/globals';
import { createIssue, listIssues, closeIssue, showHelp } from './index.js';

// GitHub APIをモックする（fetchをモック）
global.fetch = jest.fn();

test('help確認', () => {
    const mockLog = jest.spyOn(console, 'log').mockImplementation(() => { });

    showHelp();

    // console.log が呼ばれたか確認
    expect(mockLog).toHaveBeenCalled();
    // ヘルプに "Usage:" が含まれているか確認
    expect(mockLog.mock.calls[0][0]).toContain('Usage:');

    mockLog.mockRestore();
});

test('verbose確認', () => {
    const mockLog = jest.spyOn(console, 'log').mockImplementation(() => { });

});

test('Issue作成', async () => {
    // モック準備
    const mockResponse = { number: 1, title: 'Test Issue' }; // モックレスポンス(123番目にTest Issueを作成)
    fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
    });

    await createIssue('Test Issue', 'This is a test issue');
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/issues'), expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ title: 'Test Issue', body: 'This is a test issue' })
    }));
});

test('Issueのクローズ', async () => {
    // モック準備
    const mockResponse = { number: 1, title: 'Test Issue' };
    fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
    });

    await closeIssue(123);
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/issues/123'), expect.objectContaining({
        method: 'PATCH',
        body: JSON.stringify({ state: 'closed' })
    }));
});

test('オープンなIssueの一覧表示', async () => {
    // モック準備
    const mockResponse = [
        { number: 1, title: 'Test Issue 1' },
        { number: 2, title: 'Test Issue 2' }
    ];
    fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
    });

    const issues = await listIssues();
    expect(issues).toEqual(mockResponse);
});

// https://apidog.com/jp/blog/jest-mock-api-call-jp/

// mockFn.mockResolvedValueOnce(value)
// test('async test', async () => {
//   const asyncMock = jest
//     .fn()
//     .mockResolvedValue('default')
//     .mockResolvedValueOnce('first call')
//     .mockResolvedValueOnce('second call');

//   await asyncMock(); // 'first call'
//   await asyncMock(); // 'second call'
//   await asyncMock(); // 'default'
//   await asyncMock(); // 'default'
// });