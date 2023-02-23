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
    if (e.target.classList.contains('remove-button')) {
      this.state = this.state.filter(
        (item) => item.id !== parseInt(e.target.closest('li').id)
      );
      this.render();
    }

    if (e.target.classList.contains('edit-button')) {
      // TODO: 수정기능 구현
    }

    if (e.target.classList.contains('edit-completed')) {
      // TODO: 수정완료 구현
    }
  });

  this.$input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (e.target.value === '') return;
      this.setState([
        ...this.state,
        {
          id: Date.now(),
          text: this.$input.value,
          isCompleted: false,
        },
      ]);
      this.$input.value = '';
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
          isCompleted ? `(완료) ${text}` : text
        } <button class="edit-button">수정</button> <button class="remove-button">삭제</button></li>`;
      })
      .join('');
  };

  this.render();
}
