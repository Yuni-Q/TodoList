const init = () => {
  todos = getLocalStorage("todos");
  done = getLocalStorage("done");
  if (todos.length === 0 && done.length === 0) {
    id = 0;
    return;
  }
  const todoIds = todos.map((todo) => todo.id);
  const doneIds = done.map((compl) => compl.id);
  const allIds = todoIds.concat(doneIds);
  id = Math.max(...allIds) + 1;

  allIds.forEach((itemId) => {
    const existingTodoListItem = document.querySelector(
      `li[data-id="${itemId}"]`
    );
    if (existingTodoListItem) return;
    const todoItem = todos.find((todo) => todo.id === itemId);
    if (todoItem) {
      const listItem = createTodoItem(
        todoItem.id,
        todoItem.isCompleted,
        todoItem.content
      );
      todoItemsList.appendChild(listItem);
      return;
    }
    const doneItem = done.find((compl) => compl.id === itemId);
    if (doneItem) {
      const listItem = createTodoItem(
        doneItem.id,
        doneItem.isCompleted,
        doneItem.content
      );
      completedItemsList.appendChild(listItem);
    }
  });
};

init();
