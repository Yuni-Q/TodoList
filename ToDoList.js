const init = () => {
  todos = getLocalStorage("todos");
  done = getLocalStorage("done");
  if (todos.length === 0 && done.length === 0) {
    id = 0;
    return;
  }
  if (todos.length > 0 && done.length === 0) {
    id = Number(todos[todos.length - 1].id) + 1;
    todos.forEach((todo) => {
      const existingListItem = document.querySelector(
        `li[data-id="${todo.id}"]`
      );
      if (existingListItem) {
        return; // 이미 추가된 경우, 다음으로 넘어감
      }
      const listItem = createTodoItem(todo.id, todo.isCompleted, todo.content);
      todoItemsList.appendChild(listItem);
    });
  }
  if (done.length > 0 && todos.length === 0) {
    id = Number(done[done.length - 1].id) + 1;
    done.forEach((compl) => {
      const existingListItem = document.querySelector(
        `li[data-id="${compl.id}"]`
      );
      if (existingListItem) return;
      const listItem = createTodoItem(
        compl.id,
        compl.isCompleted,
        compl.content
      );
      completedItemsList.appendChild(listItem);
    });
  } else {
    id = Number(todos[todos.length - 1].id) + 1;
    todos.forEach((todo) => {
      const existingListItem = document.querySelector(
        `li[data-id="${todo.id}"]`
      );
      if (existingListItem) {
        return;
      }
      const listItem = createTodoItem(todo.id, todo.isCompleted, todo.content);
      todoItemsList.appendChild(listItem);
    });
    done.forEach((compl) => {
      const existingListItem = document.querySelector(
        `li[data-id="${compl.id}"]`
      );
      if (existingListItem) return;
      const listItem = createTodoItem(
        compl.id,
        compl.isCompleted,
        compl.content
      );
      completedItemsList.appendChild(listItem);
    });
  }
};

init();
