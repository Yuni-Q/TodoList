const addItemInput = document.querySelector(".addItem-bar__input");
const addBtn = document.querySelector(".addItem-bar__btn");
const todoItemsList = document.querySelector(".todo-itemsList");

const clickEvent = (elem, eventHandler) => {
  elem.addEventListener("click", function (e) {
    e.preventDefault();
    const target = e.target;
    if (target) {
      eventHandler(target);
    }
  });
};

const addCnts = (target) => {
  const content = addItemInput.value.trim();
  if (content.length < 1) {
    alert("해야할 일을 입력해주세요!");
    return;
  }
  const listItem = createTodoItem(id++, false, content);
  addItemInput.value = "";
  todos.push({ id: listItem.dataset.id, isCompleted: false, content });
  todoItemsList.appendChild(listItem);
  setLocalStorage("todos", todos);
};

clickEvent(addBtn, addCnts);
