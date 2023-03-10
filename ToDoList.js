let id = 0;

let todos = [];

/**
 * @description todo의 content를 담을 수 있는 id와 isCompleted의 정보를 가지고 있는 contentBox를 생성한다.
 * @param {number} id
 * @param {boolean} isCompleted
 * @param {string} content
 * @returns {object} li
 */
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
