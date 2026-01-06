const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");
const template = document.querySelector("#todo-template");

// { content: "...", completed: true or false } の配列
const todos = [];

function renderTodos(todos) {
  list.innerHTML = "";
  todos.forEach((todo, index) => {
    const clone = template.content.cloneNode(true);
    const li = clone.querySelector("li");
    const toggle = clone.querySelector("input");
    const label = clone.querySelector("label");
    const destroy = clone.querySelector("button");

    li.classList.toggle("completed", todo.completed);
    toggle.addEventListener("change", () => {
      todo.completed = toggle.checked;
      renderTodos(todos);
    });
    label.textContent = todo.content;
    toggle.checked = todo.completed;
    destroy.addEventListener("click", () => {
      todos.splice(index, 1);
      renderTodos(todos);
    });

    list.appendChild(li);
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value.trim() === "") {
    return;
  }
  const todo = input.value.trim();
  input.value = "";

  todos.push({ content: todo, completed: false });
  renderTodos(todos);
});

// hashchangeはURLの#以降が変わったときに発生する
// それぞれボタンを押すとURLの#以下が変わる
window.addEventListener("hashchange", () => {
  // ここを実装してね
  const hash = location.hash;
  // todosの中にcompletedのtrue/falseが格納されているのでこれでフィルタ
  // ＃以下がactive, completedの場合
  if (hash === "#/active") {
    renderTodos(todos.filter((todo) => !todo.completed)); // activeの場合はcompletedがfalse
  } else if (hash === "#/completed") {
    renderTodos(todos.filter((todo) => todo.completed)); // completedの場合はcompletedがtrue
  } else {
    renderTodos(todos); // それ以外（全部表示）
  }

});

// 実装前はActive, Completedフィルタボタンを押しても何も起こらない