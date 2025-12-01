// テキスト入力し、addボタンを押すと、入力された内容がTODOリストに追加される
// アイテムはチェックボックスと削除ボタンを持つ
// チェックボックスを押すとテキストに取り消し線が入る
//　削除ボタンを押すとそのアイテムがTODOリストから削除される

const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

form.addEventListener("submit", (e) => {
  // TODO: ここで form のイベントのキャンセルを実施しなさい (なぜでしょう？)
  e.preventDefault();

  // 両端からホワイトスペースを取り除いた文字列を取得する
  if (input.value.trim() === "") {
    return;
  }
  const todo = input.value.trim();
  // new-todo の中身は空にする
  input.value = "";

  // ここから #todo-list に追加する要素を構築する
  // リストアイテムは、チェックボックス、ラベル（入力したテキスト）、削除ボタン
  const elem = document.createElement("li");

  // 入力するアイテム
  const label = document.createElement("label");
  label.textContent = todo;
  label.style.textDecorationLine = "none";

  // チェックボックス
  const toggle = document.createElement("input");
  toggle.type = "checkbox";
  // TODO: toggle が変化 (change) した際に label.style.textDecorationLine を変更しなさい
  toggle.addEventListener("change", () => {
    label.style.textDecorationLine = toggle.checked ? "line-through" : "none";
  });

  // 削除ボタン
  const destroy = document.createElement("button");
  destroy.textContent = "✖";
  destroy.type = "button";
  destroy.style.color = "red";
  // TODO: destroy がクリック (click) された場合に elem を削除しなさい
  destroy.addEventListener("click", () => {
    elem.remove();
  });

  // TODO: elem 内に toggle, label, destroy を追加しなさい
  elem.appendChild(toggle);
  elem.appendChild(label);
  elem.appendChild(destroy);
  list.prepend(elem);
});

// なぜ最初にイベントをキャンセルするのか？
// htmlでは、Addボタンがsubmitボタンになっている。このjsでは、formでsubmitされるとイベントが発火する。
// formからsubmitされるとき、データがサーバへ送信されるほか、ブラウザはページを再読み込みしてしまう。
// これを防ぐために、最初にイベントをキャンセルする。（入力内容を保持するため）

// 参考
// イベントキャンセル　https://qiita.com/tamakiiii/items/f47e38bb8f03ef92f298
// 文字修飾　https://developer.mozilla.org/ja/docs/Web/CSS/Reference/Properties/text-decoration-line