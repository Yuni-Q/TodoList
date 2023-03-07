const clickEvent = (elem, eventHandler) => {
  elem.addEventListener("click", function (e) {
    e.preventDefault();
    const target = e.target;
    if (target) {
      eventHandler(target);
    }
  });
};

const deleteCnts = (target) => {
  if (target.classList.contains("fa-times-circle")) {
    const li = target.closest("li");
    const ItemsListId = Number(li.dataset.id);
    if (li.parentNode === todoItemsList) {
      li.remove();
      todos = todos.filter((todo) => Number(todo.id) !== ItemsListId);
      setLocalStorage("todos", todos);
    } else {
      li.remove();
      done = done.filter((compl) => Number(compl.id) !== ItemsListId);
      setLocalStorage("done", done);
    }
  }
};
