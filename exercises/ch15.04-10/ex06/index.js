const template = document.createElement('template');
template.innerHTML = `
<style>
  .completed { 
  text-decoration: line-through; 
  }

  .item { 
  display:flex; 
  }

  li {
  display:flex; 
  }
  
  .left { 
  display:flex; 
  }
</style>

<div class="container">
  <form id="new-todo-form">
    <input type="text" id="new-todo" placeholder="What needs to be done?" />
    <button type="submit">Add</button>
  </form>
  <ul id="todo-list"></ul>
</div>
`;

class TodoApp extends HTMLElement {
  // コンストラクタと、各メソッド（アイテム追加など）の基本的な構造
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.form = this.shadowRoot.querySelector('#new-todo-form');

    // TODO: 残りを実装
    this.input = this.shadowRoot.querySelector('#new-todo');
    this.list = this.shadowRoot.querySelector('#todo-list');
    this._items = []; // アイテムの配列 ここにtext（記入した文字列）、進捗状況を保存

    this.form.addEventListener('submit', (e) => { // Addボタン押下
      e.preventDefault(); // submitイベントはキャンセル
      const v = this.input.value.trim();
      if (!v) return;
      this.input.value = '';
      this.addItem(v);
    });

    this._render();
  }

  // アイテムの追加
  addItem(text) {
    this._items.unshift({ text, done: false });
    this._render();
  }

  // アイテムの状態を反転（チェックボタン）
  toggleItem(index) {
    this._items[index].done = !this._items[index].done;
    this._render();
  }

  // アイテムの削除（削除ボタン）
  removeItem(index) {
    this._items.splice(index, 1);
    this._render();
  }

  _render() { // このrenderでリスト表示を操作
    this.list.innerHTML = '';
    this._items.forEach((item, idx) => {
      const li = document.createElement('li');
      if (item.done) li.classList.add('completed');

      const left = document.createElement('div');

      // チェックボックスの実装
      left.className = 'left'; // どういうクラス名で作るか
      const chk = document.createElement('input'); // input要素作成
      chk.type = 'checkbox'; // typeをチェックボックスにする
      chk.checked = item.done; // チェックの初期状態をdoneにする
      chk.addEventListener('change', () => this.toggleItem(idx)); // チェックボックスの変更でトリガー

      const label = document.createElement('div');

      // ラベル（テキスト）の実装
      label.className = 'label';
      label.textContent = item.text;
      left.appendChild(chk);
      left.appendChild(label);

      // 削除ボタンの実装
      const destroy = document.createElement('button');
      destroy.className = 'destroy';
      destroy.textContent = '✕';
      destroy.addEventListener('click', () => {
        destroy.disabled = true; li.classList.add('fade-out');
        setTimeout(() => this.removeItem(idx), 180);
      });

      // 最後に要素の組み立て
      li.appendChild(left);
      li.appendChild(destroy);
      this.list.appendChild(li);
    });
  }
}

customElements.define('todo-app', TodoApp);
