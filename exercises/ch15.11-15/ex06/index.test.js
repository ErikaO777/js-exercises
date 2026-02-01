/** @jest-environment jsdom */

import { saveToLocalStorage, updateCompletedById, removeById, getItems } from './index.js';
// 関数テスト

describe("localStorageの確認 (関数ユニットテスト)", () => {
    beforeEach(() => localStorage.clear());
    afterEach(() => localStorage.clear());

    test("アイテム追加", () => {
        const item = { id: 1, name: "タスクA", completed: false };
        saveToLocalStorage(item);

        const items = getItems();
        expect(items).toHaveLength(1);
        expect(items[0]).toEqual(item);
    });

    test("アイテム更新", () => {
        const item = { id: 2, name: "タスクB", completed: false };
        saveToLocalStorage(item);

        const ok = updateCompletedById(2, true);
        expect(ok).toBe(true);

        const items = getItems();
        expect(items).toHaveLength(1);
        expect(items[0].completed).toBe(true);
    });

    test("アイテム削除", () => {
        const item = { id: 3, name: "タスクC", completed: false };
        saveToLocalStorage(item);

        removeById(3);

        const items = getItems();
        expect(items).toHaveLength(0);
    });
});
