import {
  Validate,
  ValidationError,
  NewKeyWordRequiredError,
} from './Validation.js';

/**
 *
 * @param {{state: object, target: string}}
 */

export default function TodoList({ state, target }) {
  Validate(state, new.target);
  this.state = state;
  this.$target = document.getElementById(target);
  this.$li = document.getElementById('todo-list-item');
  this.$input = document.getElementById('todo-input');
  this.$button = document.getElementById('todo-button');

  const listTemplate = (id, text, isCompleted) => {
    return `<li id=${id}>
      <input class="todo-checkbox" type="checkbox" ${
        isCompleted
          ? `checked /><span class="todo-content">(완료) `
          : `/><span class="todo-content">`
      }${text}</span>
      <button class="edit-button">수정</button> <button class="remove-button">삭제</button>
    </li>`;
  };

  this.$li.addEventListener('click', (e) => {
    if (
      e.target.classList.contains('todo-checkbox') ||
      e.target.classList.contains('todo-content')
    ) {
      console.log(e.target);
      const todoIndex = this.state.findIndex(
        ({ id }) => id === parseInt(e.target.closest('li').id)
      );
      this.state[todoIndex].isCompleted = !this.state[todoIndex].isCompleted;

      this.render();
    }

    if (e.target.classList.contains('remove-button')) {
      this.state = this.state.filter(
        (item) => item.id !== parseInt(e.target.closest('li').id)
      );

      this.render();
    }

    if (e.target.classList.contains('edit-button')) {
      this.$li.innerHTML = this.state
        .map(({ id, text, isCompleted }) => {
          if (id === parseInt(e.target.closest('li').id)) {
            return `<li id=${id}>
              <textarea class="edit-content"></textarea> 
              <button class="edit-completed-button">수정완료</button> 
              <button class="remove-button">삭제</button></li>`;
          } else {
            return listTemplate(id, text, isCompleted);
          }
        })
        .join('');
    }

    if (e.target.classList.contains('edit-completed-button')) {
      const editIndex = this.state.findIndex(
        ({ id }) => id === parseInt(e.target.closest('li').id)
      );
      const editContent = e.target.closest('li').firstElementChild.value;

      this.state[editIndex].text = editContent;
      this.state[editIndex].isCompleted = false;

      this.render();
    }
  });

  const addTodo = (value) => {
    if (value === '') return;
    this.setState([
      ...this.state,
      {
        id: Date.now(),
        text: value,
        isCompleted: false,
      },
    ]);
    this.$input.value = '';
  };

  this.$input.addEventListener('keydown', (e) => {
    if (e.isComposing === false) {
      if (e.key === 'Enter') {
        e.preventDefault();
        addTodo(e.target.value);
      }
    }
  });

  this.$button.addEventListener('click', (e) => {
    addTodo(this.$input.value);
  });

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    this.$li.innerHTML = this.state
      .map(({ id, text, isCompleted }) => {
        return listTemplate(id, text, isCompleted);
      })
      .join('');
  };

  this.render();
}
