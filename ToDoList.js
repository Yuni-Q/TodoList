const deleteItem = (itemsList) => {
  itemsList.addEventListener("click", function (e) {
    const target = e.target;
    if (target.classList.contains("fa-times-circle")) {
      const li = target.closest("li");
      const todoId = Number(li.dataset.id);
      todos = todos.filter((todo) => todo.id !== todoId);
      setLocalStorage();
      li.remove();
    }
  });
};
