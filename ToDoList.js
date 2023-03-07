const container = document.querySelector(".container");
const completedItemsList = document.querySelector(".completed-itemsList");

let done = [];

const liPushArr = (arr, li) => {
  arr.push({
    id: li.dataset.id,
    isCompleted: true,
    content: li.children[0].textContent
  });
};

const todoCompletedCnts = (target) => {
  if (target.className === "far fa-check-circle") {
    const li = target.closest("li");
    const todoId = Number(li.dataset.id);
    liPushArr(done, li);
    setLocalStorage("done", done);
    li.remove();
    completedItemsList.appendChild(li);
    todos = todos.filter((todo) => Number(todo.id) !== todoId);
    setLocalStorage("todos", todos);
  }
};

const todoInCompletedCnts = (target) => {
  if (target.className === "far fa-check-circle") {
    const li = target.closest("li");
    const complId = Number(li.dataset.id);
    liPushArr(todos, li);
    setLocalStorage("todos", todos);
    li.remove();
    todoItemsList.appendChild(li);
    done = done.filter((compl) => Number(compl.id) !== complId);
    setLocalStorage("done", done);
  }
};
