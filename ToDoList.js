const deleteItem = (e) => {
  const target = e.target;
  if (target.classList.contains("delete-item")) {
    const li = target.closest("li");
    const todoId = Number(li.dataset.id);
    todos = todos.filter((todo) => todo.id !== todoId);
    setLocalStorage();
    li.remove();
  }
};
