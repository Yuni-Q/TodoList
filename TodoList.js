/**
 *
 * @param {{state: object, target: string}}
 */

export default function TodoList({ state, target }) {
  if (state === null || state === undefined)
    throw new Error('state가 null 또는 undefined 입니다.');
  if (!Array.isArray(state)) throw new Error('state가 배열이 아닙니다.');
  if (new.target === undefined)
    throw new Error('new 키워드가 사용되지 않았습니다.');

  this.state = state;
  this.$target = document.getElementById(target);
  this.$li = document.getElementById('todo-list-item');
  this.$input = document.getElementById('todo-input');

  this.$li.addEventListener('click', (e) => {
    if (e.target.classList.contains('todo-checkbox')) {
      const checkboxIndex = this.state.findIndex(
        ({ id }) => id === parseInt(e.target.closest('li').id)
      );
      this.state[checkboxIndex].isCompleted =
        !this.state[checkboxIndex].isCompleted;

      this.render();
    }

    if (e.target.classList.contains('remove-button')) {
      this.state = this.state.filter(
        (item) => item.id !== parseInt(e.target.closest('li').id)
      );
      this.render();
    }

    if (e.target.classList.contains('edit-button')) {
      e.preventDefault();
      this.$li.innerHTML = this.state
        .map(({ id, text, isCompleted }) => {
          if (id === parseInt(e.target.closest('li').id)) {
            return `<li id=${id}>
              <textarea class="edit-content"></textarea> 
              <button class="edit-completed-button">수정완료</button> 
              <button class="remove-button">삭제</button></li>`;
          } else {
            return `<li id=${id}>${
              isCompleted
                ? `<input class="todo-checkbox" type="checkbox" checked /><span>(완료) ${text}</span>`
                : `<input class="todo-checkbox" type="checkbox" /><span>${text}</span>`
            } <button class="edit-button">수정</button> <button class="remove-button">삭제</button></li>`;
          }
        })
        .join('');
    }

    if (e.target.classList.contains('edit-completed-button')) {
      e.preventDefault();
      const editIndex = this.state.findIndex(
        ({ id }) => id === parseInt(e.target.closest('li').id)
      );
      const editContent = e.target.closest('li').firstElementChild.value;

      this.state[editIndex].text = editContent;
      this.state[editIndex].isCompleted = false;

      this.render();
    }
  });

  this.$input.addEventListener('keydown', (e) => {
    if (e.isComposing === false) {
      if (e.key === 'Enter') {
        e.preventDefault();
        if (e.target.value === '') return;
        this.setState([
          ...this.state,
          {
            id: Date.now(),
            text: e.target.value,
            isCompleted: false,
          },
        ]);
        this.$input.value = '';
      }
    }
  });

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    this.$li.innerHTML = this.state
      .map(({ id, text, isCompleted }) => {
        return `<li id=${id}>${
          isCompleted
            ? `<input class="todo-checkbox" type="checkbox" checked/><span>(완료) ${text}</span>`
            : `<input class="todo-checkbox" type="checkbox" /><span>${text}</span>`
        } <button class="edit-button">수정</button> <button class="remove-button">삭제</button></li>`;
      })
      .join('');
  };

  this.render();
}
