const addItemInput = document.querySelector(".addItem-bar__input");
const addBtn = document.querySelector(".addItem-bar__btn");
const todoItemsList = document.querySelector(".todo-itemsList");

/**
 * @description 반복되는 click 이벤트를 함수로 구현했다.
 * @param {object} elem click이벤트를 실행할 DOM요소
 * @param {function} eventHandler click이벤트 발생시 핸들링할 함수
 */
const clickEvent = (elem, eventHandler) => {
  elem.addEventListener("click", function (e) {
    e.preventDefault();
    const target = e.target;
    if (target) {
      eventHandler(target);
    }
  });
};

/**
 * @description createTodoItem 함수로 구현한 contentsBox를 todoItemsList에 자식요소로 추가한다.
 * @param {Object} target
 */
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
