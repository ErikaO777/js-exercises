const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

document.addEventListener("DOMContentLoaded", async () => {
  // TODO: ここで API を呼び出してタスク一覧を取得し、
  // 成功したら取得したタスクを appendToDoItem で ToDo リストの要素として追加しなさい

  // タスクが追加されたときに全部を取得して表示
  // タスク一覧取得はGETで/api/tasksにリクエスト
  fetch("http://localhost:3000/api/tasks",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((response) => response.json()) // これでJSONをパース
    .then((tasks) => {
      // responseを受け取ったらtasksに対してappendToDoItemで追加
      console.log(tasks);
      tasks.forEach(appendToDoItem);
    })
    .catch((error) => {
      alert(error);
    });
});

form.addEventListener("submit", (e) => {
  // TODO: ここで form のイベントのキャンセルを実施しなさい (なぜでしょう？)
  e.preventDefault();
  // 両端からホワイトスペースを取り除いた文字列を取得する
  const todo = input.value.trim();
  if (todo === "") {
    return;
  }

  // new-todo の中身は空にする
  input.value = "";

  console.log("クッキー: " + document.cookie);

  // TODO: ここで API を呼び出して新しいタスクを作成し
  // 成功したら作成したタスクを appendToDoItem で ToDo リストの要素として追加しなさい

  // タスク追加はPOSTで/api/tasksにリクエスト
  // Addボタンを送信したときにタスクを追加
  fetch("http://localhost:3000/api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name: todo }) // nameのみ送信
  })
    .then((response) => response.json())
    .then((task) => {
      appendToDoItem(task);
    })
    .catch((error) => {
      alert(error);
    });

});

// API から取得したタスクオブジェクトを受け取って、ToDo リストの要素を追加する
function appendToDoItem(task) {
  // ここから #todo-list に追加する要素を構築する
  const elem = document.createElement("li");

  const label = document.createElement("label");
  label.textContent = task.name;
  label.style.textDecorationLine = "none";

  const toggle = document.createElement("input");
  // TODO: toggle が変化 (change) した際に API を呼び出してタスクの状態を更新し
  // 成功したら label.style.textDecorationLine を変更しなさい
  toggle.type = "checkbox";
  toggle.addEventListener('change', () => {
    fetch(`http://localhost:3000/api/tasks/${task.id}`, {
      method: "PATCH",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ status: "completed" })
    })
      .then((response) => response.json())
      .then((updatedTask) => {
        label.style.textDecorationLine = "line-through";
      })
      .catch((error) => {
        alert(error);
      });
  });

  const destroy = document.createElement("button");
  // TODO: destroy がクリック (click) された場合に API を呼び出してタスク を削除し
  // 成功したら elem を削除しなさい
  destroy.textContent = "✕";
  destroy.addEventListener('click', () => {
    fetch(`http://localhost:3000/api/tasks/${task.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((response) => {
        if (response.ok) {
          elem.remove();
        }
      })
      .catch((error) => {
        alert(error);
      });
  });

  // TODO: elem 内に toggle, label, destroy を追加しなさい
  elem.append(toggle, label, destroy);
  list.prepend(elem);
}
