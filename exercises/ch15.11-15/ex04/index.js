const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

// はじめに開かれたときにlistにはlocalStorageから読み込んだデータを表示
function render() {
  if (!window.localStorage) {
    console.log("localstorage非対応");
    // ここを変える
  }

  const items = getItems();
  items.forEach(item => {
    if (list.querySelector(`li[data-id="${item.id}"]`)) return;
    const elem = document.createElement("li");
    elem.textContent = item.name;
    elem.dataset.id = item.id; // idで重複表示を管理

    const toggle = document.createElement("input");
    toggle.type = "checkbox";

    const destroy = document.createElement("button");
    destroy.textContent = "✖";
    destroy.type = "button";
    destroy.style.color = "red";

    elem.prepend(toggle);
    elem.appendChild(destroy);
    list.appendChild(elem);
  });
}
document.addEventListener("DOMContentLoaded", render);

// Addボタンが押されたときにアイテム追加
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let item = {
      id: Date.now(),
      name: input.value.trim(),
      completed: false
    }
    // let itemName = item.name;
    // let getValue = window.localStorage.getItem(itemName);
    // console.log("保存されているアイテム");
    // console.log(getValue);

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
      // localStorageの内容も更新
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

    saveToLocalStorage(item); // itemをlocalStorageに保存

    elem.dataset.id = item.id;
    elem.appendChild(toggle);
    elem.appendChild(label);
    elem.appendChild(destroy);
    list.prepend(elem);
  });
}

// 関数テストのためにget,setを追加
export function getItems() {
  return JSON.parse(window.localStorage.getItem('todoItems')) || [];
}

export function setItems(items) {
  window.localStorage.setItem('todoItems', JSON.stringify(items));
}

// 送信されたらlocalStorageに保存するようにする
export function saveToLocalStorage(item) {
  const items = getItems();
  items.push(item);
  setItems(items);
}

// 保存されているアイテムの更新
export function updateCompletedById(id, completed) {
  const items = getItems();
  const idx = items.findIndex(it => it.id === id);
  if (idx === -1) return false;
  items[idx] = { ...items[idx], completed };
  setItems(items);
  return true;
}

// アイテム削除
export function removeById(id) {
  const items = getItems();
  const next = items.filter(it => it.id !== id);
  setItems(next);
}

// タブ別でlocalStorageへの書き込みを管理するならstorageイベント
window.addEventListener('storage', (e) => {
  if (e.key === 'todoItems') {
    render();
  }
});


// https://qiita.com/iiishokoiii/items/4a8fc7a4231e20bdf6cf