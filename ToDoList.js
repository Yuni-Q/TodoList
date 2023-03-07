const init = () => {
  todos = getLocalStorage();
  if (todos.length === 0) return;
  id = todos[todos.length - 1].id + 1;
  todos.forEach((todo) => {
    // 이미 추가된 li 요소가 있는지 확인
    const existingListItem = document.querySelector(`li[data-id="${todo.id}"]`);
    if (existingListItem) {
      return; // 이미 추가된 경우, 다음으로 넘어감
    }
    const listItem = createTodoItem(todo.id, todo.isCompleted, todo.content);
    todoItemsList.appendChild(listItem);
    console.log(todos);
  });
};

init();
