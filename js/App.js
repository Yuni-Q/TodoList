import TodoInput from './TodoInput.js';
import TodoList from './TodoList.js';
import { ValidationError, NewKeyWordRequiredError } from './Validation.js';

export default function App({ $target }) {
  const storedState = window.localStorage.getItem('todo-list-data');
  this.state = storedState
    ? JSON.parse(storedState)
    : [
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

      window.localStorage.setItem('todo-list-data', JSON.stringify(nextState));
      todoList.setState(this.state);
    };
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
}
