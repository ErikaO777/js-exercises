/** @jest-environment jsdom */
import 'fake-indexeddb/auto';

let mod; // 動的 import 後に代入

beforeEach(async () => {
    // テスト用の最小 DOM を用意（index.js が参照する要素）
    document.body.innerHTML = `
    <form id="new-todo-form"><input id="new-todo" /><button type="submit">Add</button></form>
    <ul id="todo-list"></ul>
  `;

    // 古いDBを削除してクリーンな状態にする
    await new Promise((r) => {
        const del = indexedDB.deleteDatabase('todoDB');
        del.onsuccess = del.onerror = del.onblocked = () => r();
    });

    // DOM 準備が終わってからモジュールを読み込む（トップレベルの DOM 操作が安全になる）
    mod = await import('./index.js');
});

afterEach(async () => {
    document.body.innerHTML = '';
    await new Promise((r) => {
        const del = indexedDB.deleteDatabase('todoDB');
        del.onsuccess = del.onerror = del.onblocked = () => r();
    });
});

test('save -> getAll', async () => {
    const item = { id: 1, name: 'タスクA', completed: false };
    await mod.saveToIndexedDB(item);
    const all = await mod.getAllFromIndexedDB();
    expect(all.length).toBe(1);
    expect(all[0].name).toBe('タスクA');
    expect(all[0].completed).toBe(false);
});

test('updateCompletedById updates completed', async () => {
    const item = { id: 2, name: 'タスクB', completed: false };
    await mod.saveToIndexedDB(item);
    await mod.updateCompletedById(2, true);
    const all = await mod.getAllFromIndexedDB();
    expect(all.find(x => x.id === 2).completed).toBe(true);
});

test('removeById deletes item', async () => {
    const item = { id: 3, name: 'タスクC', completed: false };
    await mod.saveToIndexedDB(item);
    await mod.removeById(3);
    const all = await mod.getAllFromIndexedDB();
    expect(all.find(x => x.id === 3)).toBeUndefined();
});