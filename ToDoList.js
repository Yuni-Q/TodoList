let id = 0;

let todos = [];

const createTodoItem = (id, isCompleted, content) => {
  const $li = document.createElement("li");
  $li.dataset.id = id;
  $li.dataset.isCompleted = isCompleted;
  $li.innerHTML = `
  <label class="txt">${content}</label>
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
  return $li;
};
