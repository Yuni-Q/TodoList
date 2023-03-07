const container = document.querySelector(".container");
const completedItemsList = document.querySelector(".completed-itemsList");

let done = [];

const liRemoveArrFilterSetLocalApnChild = (
  liList,
  li,
  arr,
  arr2,
  id,
  key,
  key2
) => {
  arr2.push({
    id: li.dataset.id,
    isCompleted: true,
    content: li.children[0].textContent
  });
  setLocalStorage(key2, arr2);
  li.remove();
  liList.appendChild(li);
  arr = arr.filter((todo) => Number(todo.id) !== id);
  setLocalStorage(key, arr);
};

const todoCompleted = () => {
  todoItemsList.addEventListener("click", function (e) {
    const target = e.target;
    if (target.className === "far fa-check-circle") {
      const li = target.closest("li");
      const todoId = Number(li.dataset.id);
      liRemoveArrFilterSetLocalApnChild(
        completedItemsList,
        li,
        todos,
        done,
        todoId,
        "todos",
        "done"
      );
    }
  });
};

const todoInCompleted = () => {
  completedItemsList.addEventListener("click", function (e) {
    const target = e.target;
    if (target.className === "far fa-check-circle") {
      const li = target.closest("li");
      const complId = Number(li.dataset.id);
      liRemoveArrFilterSetLocalApnChild(
        todoItemsList,
        li,
        done,
        todos,
        complId,
        "done",
        "todos"
      );
    }
  });
};
