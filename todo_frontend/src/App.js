import React, { useCallback } from 'react';
import './App.css';
import { useLocalStorage } from './hooks/useLocalStorage';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';

/**
 * PUBLIC_INTERFACE
 * App
 * The main entry point of the To-do application.
 * - Manages the list of tasks (add, edit, toggle complete, delete)
 * - Persists tasks to localStorage under key 'todo.tasks.v1'
 * - Renders an accessible UI following a light theme
 */
function App() {
  // Persist tasks in localStorage
  const [tasks, setTasks] = useLocalStorage('todo.tasks.v1', []);

  // PUBLIC_INTERFACE
  /**
   * Adds a new task with the given text.
   * @param {string} text - The task content to add
   */
  const handleAdd = useCallback(
    (text) => {
      const trimmed = String(text || '').trim();
      if (!trimmed) return;
      const newTask = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        text: trimmed,
        completed: false,
        createdAt: Date.now(),
      };
      setTasks((prev) => [newTask, ...prev]);
    },
    [setTasks]
  );

  // PUBLIC_INTERFACE
  /**
   * Toggles the completed state of a task by id.
   * @param {string} id - The task id
   */
  const handleToggle = useCallback(
    (id) => {
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
      );
    },
    [setTasks]
  );

  // PUBLIC_INTERFACE
  /**
   * Updates the text of a task.
   * @param {string} id - The task id
   * @param {string} newText - The updated text
   */
  const handleUpdate = useCallback(
    (id, newText) => {
      const trimmed = String(newText || '').trim();
      if (!trimmed) return;
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, text: trimmed } : t))
      );
    },
    [setTasks]
  );

  // PUBLIC_INTERFACE
  /**
   * Deletes a task by id.
   * @param {string} id - The task id
   */
  const handleDelete = useCallback(
    (id) => {
      setTasks((prev) => prev.filter((t) => t.id !== id));
    },
    [setTasks]
  );

  return (
    <div className="app-shell">
      <main className="container">
        <header className="header">
          <h1 className="title" aria-label="Todo List title">
            Todo List
          </h1>
          <p className="subtitle">Simple, fast, and persistent.</p>
        </header>

        <section aria-labelledby="add-task-section" className="card">
          <h2 id="add-task-section" className="section-title">
            Add a Task
          </h2>
          <TodoInput onAdd={handleAdd} />
        </section>

        <section aria-labelledby="tasks-section" className="card">
          <h2 id="tasks-section" className="section-title">
            Your Tasks
          </h2>
          <TodoList
            tasks={tasks}
            onToggle={handleToggle}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        </section>
      </main>
      <footer className="footer" aria-label="App footer">
        <small>Tasks are saved locally and persist across refreshes.</small>
      </footer>
    </div>
  );
}

export default App;
