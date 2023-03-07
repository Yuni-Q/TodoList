const addItemInput = document.querySelector(".addItem-bar__input");
const addBtn = document.querySelector(".addItem-bar__btn");
const todoItemsList = document.querySelector(".todo-itemsList");

const addItem = () => {
  addBtn.addEventListener("click", function (e) {
    e.preventDefault();
    if (e.target.className === "addItem-bar__btn") {
      const listItem = createContents();
      if (!listItem) return;
      todoItemsList.appendChild(listItem);
      setLocalStorage();
    }
  });
};

addItem();
