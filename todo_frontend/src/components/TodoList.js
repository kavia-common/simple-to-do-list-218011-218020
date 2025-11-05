import React from 'react';
import TodoItem from './TodoItem';

/**
 * PUBLIC_INTERFACE
 * TodoList
 * Renders a list of tasks or an empty state.
 *
 * Props:
 * - tasks: Array<{ id: string, text: string, completed: boolean, createdAt?: number }>
 * - onToggle: (id: string) => void
 * - onDelete: (id: string) => void
 * - onUpdate: (id: string, text: string) => void
 */
export default function TodoList({ tasks = [], onToggle, onDelete, onUpdate }) {
  if (!tasks.length) {
    return <p className="todo-empty" role="status">No tasks yet. Add your first task above.</p>;
  }

  // Keep newest tasks first by createdAt if present
  const ordered = [...tasks].sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

  return (
    <ul className="todo-list" aria-live="polite" aria-relevant="additions removals">
      {ordered.map((task) => (
        <TodoItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </ul>
  );
}
