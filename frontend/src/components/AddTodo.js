import React, { useState } from 'react';
import axios from 'axios';
import { FaPlus } from 'react-icons/fa'; // ✅ Font Awesome Plus Icon

function AddTodo({ onAdd }) {
  const [text, setText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      const res = await axios.post('http://localhost:5000/api/todos', { text });
      onAdd(res.data);
      setText('');
    } catch (err) {
      console.error('Error adding todo:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-todo-form">
      <div className="input-with-button">
        <input
          type="text"
          value={text}
          placeholder="Enter a task"
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit" className="add-button">
          <FaPlus /> {/* ✅ Icon replaces "Add" text */}
        </button>
      </div>
    </form>
  );
}

export default AddTodo;