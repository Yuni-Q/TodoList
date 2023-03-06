let id = 0;

let todos = [
  {
    id: 0,
    isCompleted: false,
    content: "HTTP 공부하기"
  },
  {
    id: 1,
    isCompleted: false,
    content: "ToDoList Project"
  },
  {
    id: 2,
    isCompleted: false,
    content: "깃허브 공부하기"
  }
];

const createContents = () => {
  const $li = document.createElement("li");
  $li.dataset.id = id;
  id++;
  $li.innerHTML = `
    <label class="txt">${addItemInput.value}</label>
    <input class="listItemInput" type="text" value="" />
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
  todos.push({ id: id, isCompleted: false, content: addItemInput.value });
  addItemInput.value = "";
  return $li;
};
