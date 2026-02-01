const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");

const URL_TASK = `http://localhost:3000/api/tasks`;
// onst URL_ID = `http://localhost:3000/api/tasks/${task.id}`;
const GET = "GET";
const POST = "POST";
const PATCH = "PATCH";
const DELETE = "DELETE";

// タスク一覧表示
document.addEventListener("DOMContentLoaded", async () => {
  // TODO: ここで API を呼び出してタスク一覧を取得し、
  // 成功したら取得したタスクを appendToDoItem で ToDo リストの要素として追加しなさい
  await retryWithExponentialBackoff(() => getAllTasks()); // リトライ関数から呼ぶ
});

async function getAllTasks() {
  try {
    const response = await fetchWithTimeout(URL_TASK, GET, null);

    // statusコードに応じてリトライ
    switch (response.status) {
      case 408:
      case 429:
      case 500:
      case 502:
      case 503:
      case 504:
        return false;
      default:
        break;
    }

    const tasks = await response.json(); // jsonパース
    tasks.forEach(appendToDoItem);
    return true;

  } catch (err) {
    alert(err);
  }

}

// 新しいタスクの追加
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

  // TODO: ここで API を呼び出して新しいタスクを作成し
  // 成功したら作成したタスクを appendToDoItem で ToDo リストの要素として追加しなさい

  retryWithExponentialBackoff(() => createTask(todo));
});

async function createTask(todo) {
  try {
    const response = await fetchWithTimeout(URL_TASK, POST, JSON.stringify({ name: todo }));

    // statusコードに応じてリトライ
    console.log(response.status);
    switch (response.status) {
      case 408:
      case 429:
      case 500:
      case 502:
      case 503:
      case 504:
        return false;
      default:
        break;
    }

    const task = await response.json();
    appendToDoItem(task);
    return true;
    return true;
  } catch (err) {
    alert(err);
  }
}


// API から取得したタスクオブジェクトを受け取って、ToDo リストの要素を追加する
function appendToDoItem(task) {
  // ここから #todo-list に追加する要素を構築する
  const elem = document.createElement("li");

  const label = document.createElement("label");
  label.textContent = task.name;
  label.style.textDecorationLine = task.status == "completed" ? "line-through" : "none";

  const toggle = document.createElement("input");
  // TODO: toggle が変化 (change) した際に API を呼び出してタスクの状態を更新し
  // 成功したら label.style.textDecorationLine を変更しなさい
  toggle.type = "checkbox";
  toggle.addEventListener('change', () => {

    retryWithExponentialBackoff(() =>
      updateTaskStatus(task, label)
    );
  });


  async function updateTaskStatus() {
    try {
      const response = await fetchWithTimeout(`${URL_TASK}/${task.id}`, PATCH, JSON.stringify({ status: "completed" }));

      switch (response.status) {
        case 408:
        case 429:
        case 500:
        case 502:
        case 503:
        case 504:
          return false;
        default:
          break;
      }


      const updated = await res.json();

      label.style.textDecorationLine =
        updated.status === "completed" ? "line-through" : "none";

      return true;

    } catch (error) {
      alert(error);
    }
  }


  const destroy = document.createElement("button");
  destroy.textContent = "✕";
  // TODO: destroy がクリック (click) された場合に API を呼び出してタスク を削除し
  // 成功したら elem を削除しなさい
  destroy.addEventListener('click', () => {

    retryWithExponentialBackoff(() =>
      deleteTask(task.id, elem)
    );
  });

  async function deleteTask() {
    try {

      const response = await fetchWithTimeout(`${URL_TASK}/${task.id}`, DELETE, null);

      switch (response.status) {
        case 408:
        case 429:
        case 500:
        case 502:
        case 503:
        case 504:
          return false;
        default:
          break;
      }

      elem.remove();
      return true;

    } catch (error) {
      alert(error);
    }
  }

  // TODO: elem 内に toggle, label, destroy を追加しなさい
  elem.append(toggle, label, destroy);
  list.prepend(elem);
}

// ---------------------------------------------------

async function fetchWithTimeout(url, method, body, timeout = 3000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  try {
    const res = await fetch(url, {
      method,
      signal: controller.signal,
      headers: { "Content-Type": "application/json" },
      body,
      signal: controller.signal
    });

    return res;

  } catch (e) {
    if (e.name === "AbortError") {
      console.error("リクエストがタイムアウトしました");
    }
    throw e;
  } finally {
    clearTimeout(timer);
  }
}



// ---------------------------------------------------

async function retryWithExponentialBackoff(func, maxRetry = Infinity) {
  let count = 0;

  while (count < maxRetry) {
    const ok = await func();
    if (ok === true) {
      return true;
    }

    count++;
    const wait = Math.pow(2, count) * 200;
    console.log(`${wait}ms待ってリトライ`);
    await new Promise(res => setTimeout(res, wait));
  }

  alert("最大リトライ回数に到達しました");
  return false;
}


function callback(boolean) {
  console.log("結果: " + boolean);
  return boolean;
}

// 参考　https://salumarine.com/javascript-fetch-tips/