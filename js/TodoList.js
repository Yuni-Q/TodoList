import Validate from './Validation.js';

/**
 *
 * @param {{initialState: Array, onTextClick: function, onRemoveClick: function, onEditCompleteClick: function}}
 *
 */

export default function TodoList({
  initialState,
  onTextClick,
  onRemoveClick,
  onEditCompleteClick,
}) {
  Validate(initialState, new.target);
  this.state = initialState;
  this.$li = document.querySelector('#todo-list-item');

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
    const $targetLi = e.target.closest('li');
    const listIndex = this.state.findIndex(
      ({ id }) => id === parseInt($targetLi.id)
    );

    if (
      e.target.className === 'todo-checkbox' ||
      e.target.className === 'todo-content'
    ) {
      onTextClick(listIndex);
    } else if (e.target.className === 'remove-button') {
      onRemoveClick(listIndex);
    } else if (e.target.className === 'edit-button') {
      this.$li.innerHTML = this.state
        .map(({ id, text, isCompleted }) => {
          if (id === parseInt($targetLi.id)) {
            return `<li id=${id}>
            <textarea class="edit-content"></textarea>
            <button class="edit-completed-button">수정완료</button>
            <button class="remove-button">삭제</button></li>`;
          } else {
            return listTemplate(id, text, isCompleted);
          }
        })
        .join('');
    } else if (e.target.className === 'edit-completed-button') {
      const editContent = $targetLi.firstElementChild.value;
      onEditCompleteClick(editContent, listIndex);
    }
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
