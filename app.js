import TodoList from './TodoList.js';
import { ValidationError, NewKeyWordRequiredError } from './Validation.js';

const initialState = [
  {
    id: 1,
    text: 'JS 공부하기',
    isCompleted: true,
  },
  {
    id: 2,
    text: 'JS 복습하기',
    isCompleted: false,
  },
];

try {
  const todoList = new TodoList({ state: initialState, target: 'todo-list' });
} catch (err) {
  if (
    err instanceof ValidationError ||
    err instanceof NewKeyWordRequiredError
  ) {
    alert(err.name + ' : ' + err.message);
  } else {
    alert(err);
  }
}
