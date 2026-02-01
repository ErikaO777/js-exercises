const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

// クエリのアイテム
const DB_NAME = "todoDB";
const DB_VERSION = 1;
const STORE_NAME = "todoItems";

// テストをするには毎回クエリを打つのではなく以下のように関数を作る。。。
// DBを開く関数
export function openDb() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onsuccess = (event) => resolve(event.target.result);
    request.onerror = (event) => reject(event.target.error);
  });
}

// 保存
export async function saveToIndexedDB(item) {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    store.put(item);
    tx.oncomplete = () => { db.close(); resolve(item); };
    tx.onerror = (e) => { db.close(); reject(e); };
  });
}

// 取得
export async function getAllFromIndexedDB() {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const req = store.getAll();
    req.onsuccess = () => { db.close(); resolve(req.result || []); };
    req.onerror = (e) => { db.close(); reject(e); };
  });
}

// 更新（completed を更新）
export async function updateCompletedById(id, completed) {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    const getReq = store.get(id);
    getReq.onsuccess = () => {
      const current = getReq.result;
      const updated = { ...current, completed };
      store.put(updated);
    };
    tx.oncomplete = () => { db.close(); resolve(true); };
    tx.onerror = (e) => { db.close(); reject(e); };
  });
}

// 削除
export async function removeById(id) {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    store.delete(id);
    tx.oncomplete = () => { db.close(); resolve(true); };
    tx.onerror = (e) => { db.close(); reject(e); };
  });
}

// はじめに開かれたときにlistにはDBから読み込んだデータを表示
function render() {
  const request = indexedDB.open(DB_NAME, DB_VERSION);

  // 初回作成時にオブジェクトストアを作る
  request.onupgradeneeded = (event) => {
    const db = event.target.result;
    db.createObjectStore(STORE_NAME, { keyPath: "id" });
  };

  request.onsuccess = (event) => {
    const db = event.target.result;

    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const getReq = store.getAll();

    getReq.onerror = (e) => {
      console.error("getAll error:", e);
    };

    getReq.onsuccess = () => {
      const items = getReq.result || [];

      items.forEach((item) => {
        if (!item || list.querySelector(`li[data-id="${item.id}"]`)) return;

        const elem = document.createElement("li");
        elem.dataset.id = item.id;

        const toggle = document.createElement("input");
        toggle.type = "checkbox";
        toggle.checked = !!item.completed;

        const label = document.createElement("label");
        label.textContent = item.name;
        label.style.textDecorationLine = item.completed ? "line-through" : "none";

        const destroy = document.createElement("button");
        destroy.textContent = "✖";
        destroy.type = "button";
        destroy.style.color = "red";

        toggle.addEventListener("change", () => {
          label.style.textDecorationLine = toggle.checked ? "line-through" : "none";
          updateCompletedById(item.id, toggle.checked);
        });
        destroy.addEventListener("click", () => {
          elem.remove();
          removeById(item.id);
        });

        elem.prepend(toggle);
        elem.appendChild(label);
        elem.appendChild(destroy);
        list.appendChild(elem);
      });
    };

    tx.oncomplete = () => db.close();
    tx.onerror = (e) => console.error("tx error:", e);
  };


}
document.addEventListener("DOMContentLoaded", render);

// Addボタンが押されたときにアイテム追加
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let item = {
    id: Date.now(),
    name: input.value.trim(),
    completed: false
  };

  if (input.value.trim() === "") {
    return;
  }
  const todo = input.value.trim(); // todoに文字列が入る
  input.value = "";

  const elem = document.createElement("li");

  const label = document.createElement("label");
  label.textContent = todo;
  label.style.textDecorationLine = "none";

  const toggle = document.createElement("input");
  toggle.type = "checkbox";
  toggle.addEventListener("change", () => {
    label.style.textDecorationLine = toggle.checked ? "line-through" : "none";
    // DBの内容も更新
    item.completed = toggle.checked;
    updateCompletedById(item.id, toggle.checked);
  });

  const destroy = document.createElement("button");
  destroy.textContent = "✖";
  destroy.type = "button";
  destroy.style.color = "red";
  destroy.addEventListener("click", () => {
    elem.remove();
    removeById(item.id);
  });

  saveToIndexedDB(item); // itemをindexedDBに保存

  elem.dataset.id = item.id;
  elem.appendChild(toggle);
  elem.appendChild(label);
  elem.appendChild(destroy);
  list.prepend(elem);
});

// 送信されたらindexedDBに保存するようにする
// function saveToIndexedDB(item) {
//   const request = indexedDB.open(DB_NAME, DB_VERSION); // まずDBを開く
//   request.onupgradeneeded = (event) => {
//     const db = event.target.result;
//     db.createObjectStore(STORE_NAME, { keyPath: "id" }); // オブジェクトストア（テーブル）を作成
//   };
//   request.onsuccess = (event) => {
//     const db = event.target.result;
//     const tx = db.transaction(STORE_NAME, "readwrite"); // データの追加
//     const store = tx.objectStore(STORE_NAME);
//     store.put(item);
//     tx.oncomplete = () => db.close();
//   };
// }

// // 保存されているアイテムの更新
// function updateCompletedById(id, completed) {
//   const openReq = indexedDB.open(DB_NAME, DB_VERSION);
//   openReq.onsuccess = () => {
//     const db = openReq.result;
//     const tx = db.transaction(STORE_NAME, 'readwrite');
//     const store = tx.objectStore(STORE_NAME);
//     const getReq = store.get(id);

//     getReq.onsuccess = () => {
//       const current = getReq.result;
//       const updated = { ...current, completed: completed };
//       store.put(updated);
//     };
//     tx.oncomplete = () => db.close();
//   };
//   return true;
// }

// // アイテム削除
// function removeById(id) {
//   const openReq = indexedDB.open(DB_NAME, DB_VERSION);
//   openReq.onsuccess = () => {
//     const db = openReq.result;
//     const tx = db.transaction(STORE_NAME, 'readwrite');
//     const store = tx.objectStore(STORE_NAME);
//     store.delete(id); // ← ここ
//     tx.oncomplete = () => db.close();
//     tx.onerror = (e) => console.error('delete failed', e);
//   };

// }

// タブ別でDBへの書き込みを管理する BroadcastChannel
const bc = new BroadcastChannel('todos');
// 変更時に送る
bc.postMessage({ type: 'changed' });
// 受信したら再描画
bc.onmessage = (e) => { if (e.data?.type === 'changed') render(); };



// https://zenn.dev/peter_norio/articles/e0620bfd7feb8f

// 別タブ監視　https://www.ey-office.com/blog_archive/2022/10/25/learned-about-an-api-called-broadcastchannel/