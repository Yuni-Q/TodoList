import * as initVar from "./Vars.mjs";

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
 * @description 반복되는 push 동작을 함수로 구현했다.
 * @param {Array} arr
 * @param {Object} li
 */
const liPushArr = (arr, li) => {
  if (li.parentNode === initVar.todoItemsList) {
    li.dataset.isCompleted = true;
  } else {
    li.dataset.isCompleted = false;
  }
  arr.push({
    id: li.dataset.id,
    isCompleted: li.dataset.isCompleted,
    content: li.children[0].textContent
  });
};

/**
 * @description createTodoItem 함수로 구현한 contentsBox를 todoItemsList에 자식요소로 추가한다.
 * @param {Object} target
 */
const addCnts = () => {
  const content = initVar.addItemInput.value.trim();
  if (content.length < 1) {
    alert("해야할 일을 입력해주세요!");
    return;
  }
  const contents = new initVar.Contents(id++, false, content);
  const listItem = contents.createTodoItem();
  initVar.addItemInput.value = "";
  todos.push({ id: listItem.dataset.id, isCompleted: false, content });
  initVar.todoItemsList.appendChild(listItem);
  setLocalStorage("todos", todos);
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

/**
 * @description 수정버튼 click시 발생하는 동작에 관한 함수다.
 * @param {Object} target
 */
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

/**
 * @description 수정버튼 click 후 생성되는 input요소 안에서 contents 수정후 Enter를 눌렀을때 수정완료되는 함수다.
 */
const editCntsEnter = () => {
  initVar.container.addEventListener("keydown", function (e) {
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
    if (item?.isCompleted === "true") {
      initVar.completedItemsList.appendChild(listItem);
    } else {
      initVar.todoItemsList.appendChild(listItem);
    }
  });
};

init();
