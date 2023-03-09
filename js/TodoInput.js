export default function TodoInput({ $todoForm, $todoInput, onSubmit }) {
  $todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const { value: text } = $todoInput;

    if (text.length === 0) return;
    onSubmit(text);
    $todoInput.value = '';
    $todoInput.focus();
  });
}
