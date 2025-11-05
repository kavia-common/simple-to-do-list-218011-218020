import React, { useState, useId } from 'react';

/**
 * PUBLIC_INTERFACE
 * TodoItem
 * Displays a single task with controls to toggle completion, edit text, or delete.
 *
 * Props:
 * - task: { id: string, text: string, completed: boolean }
 * - onToggle: (id: string) => void
 * - onDelete: (id: string) => void
 * - onUpdate: (id: string, text: string) => void
 */
export default function TodoItem({ task, onToggle, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const editId = useId();

  const save = (e) => {
    e.preventDefault();
    const trimmed = editText.trim();
    if (trimmed && trimmed !== task.text) {
      onUpdate(task.id, trimmed);
    }
    setIsEditing(false);
  };

  const cancel = () => {
    setEditText(task.text);
    setIsEditing(false);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      cancel();
    }
  };

  return (
    <li className={`todo-item ${task.completed ? 'completed' : ''}`}>
      <input
        className="checkbox"
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        aria-label={`Mark task as ${task.completed ? 'incomplete' : 'complete'}: ${task.text}`}
      />

      {!isEditing ? (
        <>
          <span className="task-text">{task.text}</span>
          <div className="actions">
            <button
              type="button"
              className="btn"
              aria-label={`Edit task: ${task.text}`}
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
            <button
              type="button"
              className="btn btn-danger"
              aria-label={`Delete task: ${task.text}`}
              onClick={() => onDelete(task.id)}
            >
              Delete
            </button>
          </div>
        </>
      ) : (
        <form className="edit-form" onSubmit={save}>
          <label htmlFor={editId} className="visually-hidden">
            Edit task
          </label>
          <input
            id={editId}
            className="input"
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={onKeyDown}
            aria-label="Edit task"
            autoFocus
          />
          <button type="submit" className="btn btn-primary" aria-label="Save task">
            Save
          </button>
          <button
            type="button"
            className="btn"
            onClick={cancel}
            aria-label="Cancel editing"
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => onDelete(task.id)}
            aria-label="Delete task"
          >
            Delete
          </button>
        </form>
      )}
    </li>
  );
}
