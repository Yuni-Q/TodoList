const addItemInput = document.querySelector(".addItem-bar__input");
const addBtn = document.querySelector(".addItem-bar__btn");
const todoItemsList = document.querySelector(".todo-itemsList");

const addItem = () => {
  addBtn.addEventListener("click", function (e) {
    if (addItemInput.value.trim().length < 1) {
      alert("해야할 일을 입력해주세요!");
      return;
    }
    e.preventDefault();
    const listItem = createContents();

    todoItemsList.appendChild(listItem);
    setLocalStorage();
  });
};

addItem();
