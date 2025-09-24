import React from 'react';
import './Todo.css';
import { FaTrashAlt } from 'react-icons/fa'; // ✅ Font Awesome Trash Icon

function TodoList({ todos, onDelete, onToggle }) {
  return (
    <div className="todo-section">
      {/* <h2>Your Todo</h2> */}
      <div className="todo-grid">
        {todos.map(todo => (
          <div className="todo-card" key={todo._id}>
            <div className="todo-header">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggle(todo._id, !todo.completed)}
              />
              <button
                className="delete-button"
                onClick={() => onDelete(todo._id)}
              >
                <FaTrashAlt /> {/* ✅ Icon inserted here */}
              </button>
            </div>
            <div className="todo-body">
              <span
                className={todo.completed ? 'todo-text completed' : 'todo-text'}
              >
                {todo.text}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TodoList;