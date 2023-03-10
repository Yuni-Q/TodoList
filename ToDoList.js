function bindEventHandlers() {
  clickEvent(initVar.addBtn, addCnts);
  clickEvent(initVar.todoItemsList, deleteCnts);
  clickEvent(initVar.completedItemsList, deleteCnts);
  clickEvent(initVar.todoItemsList, todoCompletedCnts);
  clickEvent(initVar.completedItemsList, todoInCompletedCnts);
  clickEvent(initVar.container, editCntsClick);
  editCntsEnter();
}

/**
 * 최초 웹페이지 로드될 떄와 새로고침이 발생할 때, localStorage에 저장되어 있는 파일을 불러와 그 당시 배열에 저장되어 있는 li요소들을 렌더링한다.
 */

const init = () => {
  bindEventHandlers();
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
    const item =
      todos.find((todo) => todo.id === itemId) ||
      done.find((compl) => compl.id === itemId);
    const contents = new initVar.Contents(
      item.id,
      item.isCompleted,
      item.content
    );
    const listItem = contents.createTodoItem();
    if (item && item.isCompleted === "true") {
      initVar.completedItemsList.appendChild(listItem);
    } else {
      initVar.todoItemsList.appendChild(listItem);
    }
  });
};

init();
