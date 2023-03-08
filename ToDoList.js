const container = document.querySelector(".container");
const addItemInput = document.querySelector(".addItem-bar__input");
const addBtn = document.querySelector(".addItem-bar__btn");
const todoItemsList = document.querySelector(".todo-itemsList");
const completedItemsList = document.querySelector(".completed-itemsList");
const delBtn = document.querySelector(".delete-item");

let id = 0;
let todos = [];
let done = [];

/**
 * @description 배열 요소들을 localStorage에 JSON 형식으로 저장한다.
 * @param {string} key localStorage에 저장할 key 이름
 * @param {array} arr localStorage에 저장할 배열
 */
const setLocalStorage = (key, arr) => {
  localStorage.setItem(key, JSON.stringify(arr));
};
/**
 * @description localStorage에 있는 key 항목을 불러온 후 JSON 형식으로 파싱하여 반환한다. key가 존재하지 않으면 빈 배열을 반환한다.
 * @param {string} key localStorage에서 불러올 key 이름
 */
const getLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key)) || [];
};

/**
 * @description todo의 content를 담을 수 있는 id와 isCompleted의 정보를 가지고 있는 contentBox를 생성한다.
 * @param {number} id
 * @param {boolean} isCompleted
 * @param {string} content
 * @returns {object} li
 */
const createTodoItem = (id, isCompleted, content) => {
  const li = document.createElement("li");
  li.dataset.id = id;
  li.dataset.isCompleted = isCompleted;
  li.innerHTML = `
    <label class="txt">${content}</label>
    <input class="listItemInput" type="text" placeholder="해야할 일을 입력한 후 Enter 키를 눌러 수정해주세요."/>
    <div class="item-icons">
      <a href="#" class="complete-item mx-2 item-icon">
        <i class="far fa-check-circle"></i>
      </a>
      <a href="#" class="edit-item mx-2 item-icon">
        <i class="far fa-edit"></i>
      </a>
      <a href="#" class="delete-item item-icon">
        <i class="far fa-times-circle"></i>
      </a>
    </div>
  `;
  return li;
};

const clickEvent = (elem, eventHandler) => {
  elem.addEventListener("click", function (e) {
    e.preventDefault();
    const target = e.target;
    if (target) {
      eventHandler(target);
    }
  });
};

const liPushArr = (arr, li) => {
  arr.push({
    id: li.dataset.id,
    isCompleted: true,
    content: li.children[0].textContent
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

const editCntsClick = (target) => {
  if (target.className === "far fa-edit") {
    const li = target.closest("li");
    const editInput = li.querySelector("input[type=text]");
    const label = li.querySelector("label");
    li.classList.add("editMode");
    editInput.focus();
    if (editInput.value.trim().length < 1) return;
  }
};

const editCntsEnter = () => {
  container.addEventListener("keydown", function (e) {
    const target = e.target;
    if (target.className === "listItemInput") {
      const li = target.closest("li");
      const editInput = li.querySelector("input[type=text]");
      const label = li.querySelector("label");
      if (e.key === "Enter") {
        label.innerText = editInput.value;
        li.classList.remove("editMode");
      }
      if (li.parentNode.className === "todo-itemsList") {
        todos.map((todo) =>
          todo.id === li.dataset.id
            ? (todo.content = label.innerText)
            : todo.content
        );
        setLocalStorage("todos", todos);
      } else {
        done.map((compl) =>
          compl.id === li.dataset.id
            ? (compl.content = label.innerText)
            : compl.content
        );
        setLocalStorage("done", done);
      }
    }
  });
};

const init = () => {
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
    const todoItem = todos.find((todo) => todo.id === itemId);
    if (todoItem) {
      const listItem = createTodoItem(
        todoItem.id,
        todoItem.isCompleted,
        todoItem.content
      );
      todoItemsList.appendChild(listItem);
      return;
    }
    const doneItem = done.find((compl) => compl.id === itemId);
    if (doneItem) {
      const listItem = createTodoItem(
        doneItem.id,
        doneItem.isCompleted,
        doneItem.content
      );
      completedItemsList.appendChild(listItem);
    }
  });
};

clickEvent(addBtn, addCnts);
clickEvent(todoItemsList, deleteCnts);
clickEvent(completedItemsList, deleteCnts);
clickEvent(todoItemsList, todoCompletedCnts);
clickEvent(completedItemsList, todoInCompletedCnts);
clickEvent(container, editCntsClick);
editCntsEnter();
init();
