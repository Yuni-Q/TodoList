const clickEvent = (elem, eventHandler) => {
  elem.addEventListener("click", function (e) {
    const target = e.target;
    if (target) {
      eventHandler(target);
    }
  });
};

/**
 * @description li요소들을 삭제버튼을 통해 삭제한다. 이때, todos와 done 배열에서도 해당 li요소의 id와 같은 객체를 pop해준다.
 * @param {Object} target
 */

const deleteCnts = (target) => {
  if (target.className === "far fa-times-circle") {
    const li = target.closest("li");
    const ItemsListId = Number(li.dataset.id);
    if (li.parentNode === initVar.todoItemsList) {
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

clickEvent(initVar.todoItemsList, deleteCnts);
clickEvent(initVar.completedItemsList, deleteCnts);
