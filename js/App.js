import TodoInput from './TodoInput.js';
import TodoList from './TodoList.js';
import { getItem, setItem } from './localStorage.js';

const APP_STORAGE_KEY = 'todo-list-data';
const DEFALUT_VALUE = [
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

export default function App({ $target }) {
  this.state = getItem(APP_STORAGE_KEY, DEFALUT_VALUE, () => {
    alert('저장된 데이터에 문제가 있어 기본데이터로 실행합니다.');
    setItem(APP_STORAGE_KEY, DEFALUT_VALUE);
  });

  try {
    const todoInput = new TodoInput({
      initialState: this.state,
      onSubmit: (text) => {
        this.setState([
          ...this.state,
          {
            id: Date.now(),
            text,
            isCompleted: false,
          },
        ]);
      },
    });

    const todoList = new TodoList({
      initialState: this.state,
      $target,
      onTextClick: (index) => {
        const nextState = [...this.state];
        nextState[index].isCompleted = !nextState[index].isCompleted;
        this.setState(nextState);
      },
      onRemoveClick: (index) => {
        const nextState = [...this.state];
        nextState.splice(index, 1);
        this.setState(nextState);
      },
      onEditCompleteClick: (editContent, index) => {
        const nextState = [...this.state];
        nextState[index].text = editContent;
        nextState[index].isCompleted = false;
        this.setState(nextState);
      },
    });
    this.setState = (nextState) => {
      this.state = nextState;

      setItem(APP_STORAGE_KEY, this.state);
      todoList.setState(this.state);
    };
  } catch (err) {
    if (typeof err === 'string') {
      alert(err);
    } else {
      if (!err instanceof Error) {
        const message = err.message || '알 수 없는 에러가 발생했어요.';
      }
      alert(err?.message);
    }
  }
}
