const form = document.querySelector("#new-todo-form");
const list = document.querySelector("#todo-list");
const input = document.querySelector("#new-todo");
const template = document.querySelector("#todo-template");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const value = input.value.trim();
  if (!value) return;

  input.value = "";

  const clone = template.content.cloneNode(true);
  const li = clone.querySelector("li");
  const toggle = clone.querySelector(".toggle");
  const label = clone.querySelector(".content");
  const destroy = clone.querySelector(".destroy");

  label.textContent = value;

  toggle.addEventListener("change", () => {
    li.classList.toggle("opacity-50", toggle.checked);
    li.classList.toggle("line-through", toggle.checked);
  });

  destroy.addEventListener("click", () => {
    li.classList.add("opacity-0");
    setTimeout(() => li.remove(), 200);
  });

  list.prepend(li);
});
