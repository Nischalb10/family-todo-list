import React, { useState, useEffect } from 'react';
import { CheckCircle2, Circle, Trash2, Plus } from 'lucide-react';

export default function TodoList({ selectedMember }) {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem(`todos-${selectedMember}`);
    return saved ? JSON.parse(saved) : [];
  });
  
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem(`todos-${selectedMember}`);
    setTodos(saved ? JSON.parse(saved) : []);
  }, [selectedMember]);

  useEffect(() => {
    localStorage.setItem(`todos-${selectedMember}`, JSON.stringify(todos));
  }, [todos, selectedMember]);

  const addTodo = (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    
    setTodos([
      ...todos,
      {
        id: crypto.randomUUID(),
        text: newTodo.trim(),
        completed: false,
      },
    ]);
    setNewTodo('');
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  return (
    <div className="todo-container">
      <h2 className="todo-header">
        {selectedMember}'s Tasks
      </h2>

      {/* Add Todo Form */}
      <form onSubmit={addTodo} className="todo-form">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new task..."
          className="todo-input"
        />
        <button
          type="submit"
          className="btn btn-primary"
        >
          <Plus size={20} />
        </button>
      </form>

      {/* Todo List */}
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className="todo-item">
            <button
              onClick={() => toggleTodo(todo.id)}
              className={`todo-checkbox ${todo.completed ? 'completed' : ''}`}
            >
              {todo.completed ? <CheckCircle2 size={20} /> : <Circle size={20} />}
            </button>
            <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="todo-delete"
            >
              <Trash2 size={20} />
            </button>
          </li>
        ))}
      </ul>

      {todos.length === 0 && (
        <p className="empty-state">
          No tasks yet. Add some tasks to get started!
        </p>
      )}

      {todos.length > 0 && (
        <button
          onClick={clearCompleted}
          className="btn btn-danger"
        >
          Clear Completed Tasks
        </button>
      )}
    </div>
  );
}