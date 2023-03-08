export const container = document.querySelector(".container");
export const addItemInput = document.querySelector(".addItem-bar__input");
export const addBtn = document.querySelector(".addItem-bar__btn");
export const todoItemsList = document.querySelector(".todo-itemsList");
export const completedItemsList = document.querySelector(
  ".completed-itemsList"
);

/**
 * @description todo의 content를 담을 수 있는 id와 isCompleted의 정보를 가지고 있는 contentBox를 Contents 클래스로 생성한다.
 * @param {number} id
 * @param {boolean} isCompleted
 * @param {string} content
 * @returns {object} li
 */

export class Contents {
  constructor(id, isCompleted, content) {
    this.id = id;
    this.isCompleted = isCompleted;
    this.content = content;
  }
  createTodoItem() {
    const li = document.createElement("li");
    li.dataset.id = this.id;
    li.dataset.isCompleted = this.isCompleted;
    li.innerHTML = `
      <label class="txt">${this.content}</label>
      <input class="listItemInput" type="text" placeholder="해야할 일을 입력한 후 Enter 키를 눌러 수정해주세요."/>
      <div class="item-icons">
        <button class="complete-item mx-2 item-icon">
          <i class="far fa-check-circle"></i>
        </button>
        <button class="edit-item mx-2 item-icon">
          <i class="far fa-edit"></i>
        </button>
        <button class="delete-item item-icon">
          <i class="far fa-times-circle"></i>
        </button>
      </div>
    `;
    return li;
  }
}
