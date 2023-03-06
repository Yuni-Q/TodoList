export default function TodoInput({ initialState, onSubmit }) {
  this.state = initialState;
  this.todoForm = document.querySelector('#todo-form');
  this.$input = document.querySelector('#todo-input');
  this.$button = document.querySelector('#todo-button');

  this.todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const { value: text } = this.$input;

    if (text.length === 0) return;
    onSubmit(text);
    this.$input.value = '';
    this.$input.focus();
  });
}
