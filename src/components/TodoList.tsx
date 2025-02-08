import React, { useState, useEffect } from 'react';
import { CheckCircle2, Circle, Trash2, Plus } from 'lucide-react';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

interface TodoListProps {
  selectedMember: string;
}

export default function TodoList({ selectedMember }: TodoListProps) {
  const [todos, setTodos] = useState<Todo[]>(() => {
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

  const addTodo = (e: React.FormEvent) => {
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

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {selectedMember}'s Tasks
      </h2>

      {/* Add Todo Form */}
      <form onSubmit={addTodo} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
      </form>

      {/* Todo List */}
      <div className="space-y-2">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg group hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center gap-3">
              <button
                onClick={() => toggleTodo(todo.id)}
                className="text-gray-400 hover:text-indigo-600 focus:outline-none"
              >
                {todo.completed ? (
                  <CheckCircle2 className="h-5 w-5 text-indigo-600" />
                ) : (
                  <Circle className="h-5 w-5" />
                )}
              </button>
              <span
                className={`${
                  todo.completed
                    ? 'text-gray-400 line-through'
                    : 'text-gray-700'
                }`}
              >
                {todo.text}
              </span>
            </div>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="text-gray-400 hover:text-red-600 focus:outline-none opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>

      {todos.length === 0 && (
        <p className="text-center text-gray-500 mt-6">
          No tasks yet. Add some tasks to get started!
        </p>
      )}
    </div>
  );
}