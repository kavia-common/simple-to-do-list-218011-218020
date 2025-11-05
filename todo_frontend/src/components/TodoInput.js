import React, { useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * TodoInput
 * An input form for creating new tasks.
 *
 * Props:
 * - onAdd: (text: string) => void  // called when a new task is submitted
 */
export default function TodoInput({ onAdd }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setText('');
  };

  return (
    <div className="todo-input">
      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="todo-input-field">Add a new task</label>
        <input
          id="todo-input-field"
          className="input"
          type="text"
          placeholder="e.g., Buy groceries"
          aria-label="Add a new task"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit" className="btn btn-primary" aria-label="Add task">
          Add Task
        </button>
      </form>
    </div>
  );
}
