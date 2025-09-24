import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import './components/Todo.css';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/todos')
      .then(res => setTodos(res.data))
      .catch(err => console.error('Error loading todos:', err));
  }, []);

  const handleAdd = (newTodo) => {
    setTodos(prev => [...prev, newTodo]);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/todos/${id}`);
      setTodos(prev => prev.filter(todo => todo._id !== id));
    } catch (err) {
      console.error('Error deleting todo:', err);
    }
  };

  const handleToggle = async (id, newStatus) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/todos/${id}`, {
        completed: newStatus
      });

      setTodos(prev =>
        prev.map(todo =>
          todo._id === id ? { ...todo, completed: res.data.completed } : todo
        )
      );
    } catch (err) {
      console.error('Error toggling todo:', err);
    }
  };

  return (
    <div className="App">
      <div className="header-grid">
        {/* <h1>Todo makes work easy...</h1> */}
        <AddTodo onAdd={handleAdd} />
      </div>
      <TodoList todos={todos} onDelete={handleDelete} onToggle={handleToggle} />
    </div>
  );
}

export default App;