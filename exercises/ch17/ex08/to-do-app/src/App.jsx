import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [todos, setTodos] = useState([]);  // Todoリストの状態
  const [input, setInput] = useState(''); // 入力フォームの状態

  // const form = document.querySelector('#new-todo-form');
  // const list = document.querySelector('#todo-list');
  // const input = document.querySelector('#new-todo');


  // フォーム送信時の処理
  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;

    // 新しいTodoを先頭に追加
    setTodos([{ id: Date.now(), text: input.trim(), done: false }, ...todos]);
    setInput(''); // 入力欄をリセット
  };

  // チェックボックスの変更時の処理
  const handleToggle = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    ));
  };

  // 削除ボタンの処理
  const handleDelete = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (

    <div>
      <div>Todo管理アプリ</div>
      <form id="new-todo-form" onSubmit={handleSubmit}>
        <input type="text" id="new-todo" placeholder="What needs to be done?" value={input} onChange={(e) => setInput(e.target.value)} />
        <button type="submit">Add</button>
      </form>
      <ul id="todo-list">
        {todos.map(todo => (
          <li key={todo.id} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input type="checkbox" checked={todo.done} onChange={() => handleToggle(todo.id)} />
            <span style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>{todo.text}</span>
            <button onClick={() => handleDelete(todo.id)} style={{ color: 'red' }}>✖</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App;
