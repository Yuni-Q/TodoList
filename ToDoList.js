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

clickEvent(initVar.container, editCntsClick);
editCntsEnter();
