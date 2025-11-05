import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  window.localStorage.clear();
});

test('renders the input labeled "Add a new task"', () => {
  render(<App />);
  const input = screen.getByLabelText(/add a new task/i);
  expect(input).toBeInTheDocument();
});

test('allows adding a new task and displays it', () => {
  render(<App />);
  const input = screen.getByLabelText(/add a new task/i);
  fireEvent.change(input, { target: { value: 'Buy milk' } });

  const addButton = screen.getByRole('button', { name: /add task/i });
  fireEvent.click(addButton);

  expect(screen.getByText('Buy milk')).toBeInTheDocument();
});

test('loads existing tasks from localStorage', () => {
  const seed = [{ id: 't1', text: 'Seeded Task', completed: false, createdAt: 0 }];
  window.localStorage.setItem('todo.tasks.v1', JSON.stringify(seed));

  render(<App />);
  expect(screen.getByText('Seeded Task')).toBeInTheDocument();
});
