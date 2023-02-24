import TodoList from './TodoList.js';

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
  // TODO: err 타입 검사
  alert(err);
}
