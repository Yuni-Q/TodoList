const init = () => {
  todos = getLocalStorage();
  if (todos.length === 0) {
    return;
  } else {
    id = todos[todos.length - 1].id + 1;
    return todos;
  }
};

init();
