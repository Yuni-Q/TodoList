const container = document.querySelector(".container");
const completedItemsList = document.querySelector(".completed-itemsList");

let done = [];

/**
 * @description 반복되는 push 동작을 함수로 구현했다.
 * @param {Array} arr
 * @param {Object} li
 */
const liPushArr = (arr, li) => {
  arr.push({
    id: li.dataset.id,
    isCompleted: true,
    content: li.children[0].textContent
  });
};

/**
 * @description todoItemsList에 있는 li요소의 완료버튼에 이벤트 적용 후 실행시 completedItemsList로 li요소가 이동한다.
 * @param {Object} target
 */
const todoCompletedCnts = (target) => {
  if (target.className === "far fa-check-circle") {
    const li = target.closest("li");
    const todoId = Number(li.dataset.id);
    liPushArr(done, li);
    setLocalStorage("done", done);
    li.remove();
    initVar.completedItemsList.appendChild(li);
    todos = todos.filter((todo) => Number(todo.id) !== todoId);
    setLocalStorage("todos", todos);
  }
};

/**
 * @description completedItemsList로 있는 li요소의 완료버튼에 이벤트 적용 후 실행시 todoItemsList에 li요소가 이동한다.
 * @param {Object} target
 */
const todoInCompletedCnts = (target) => {
  if (target.className === "far fa-check-circle") {
    const li = target.closest("li");
    const complId = Number(li.dataset.id);
    liPushArr(todos, li);
    setLocalStorage("todos", todos);
    li.remove();
    initVar.todoItemsList.appendChild(li);
    done = done.filter((compl) => Number(compl.id) !== complId);
    setLocalStorage("done", done);
  }
};

clickEvent(initVar.todoItemsList, todoCompletedCnts);
clickEvent(initVar.completedItemsList, todoInCompletedCnts);
