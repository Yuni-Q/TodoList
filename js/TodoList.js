import Validate from './Validation.js';

/**
 *
 * @param {{initialState: Array, onTextClick: function, onRemoveClick: function, onEditCompleteClick: function}}
 *
 */

export default function TodoList({
	$li,
	initialState,
	onTextClick,
	onRemoveClick,
	onEditCompleteClick,
}) {
	Validate(initialState, new.target);
	this.state = initialState;

	const listTemplate = (id, text, isCompleted) => {
		const todoText = isCompleted ? `(완료)${text}` : text;
		return `<li id=${id}>
      <input class="todo-checkbox" type="checkbox" ${
				isCompleted ? 'checked' : ''
			} /><span class="todo-content">${todoText}</span>
      <button class="edit-button">수정</button> <button class="remove-button">삭제</button>
    </li>`;
	};

	$li.addEventListener('click', (e) => {
		const $targetLi = e.target.closest('li');
		const listIndex = this.state.findIndex(
			({ id }) => id === parseInt($targetLi.id)
		);
		const classList = ['todo-checkbox', 'todo-content'];

		if (classList.includes(e.target.className)) {
			onTextClick(listIndex);
		} else if (e.target.className === 'remove-button') {
			onRemoveClick(listIndex);
		} else if (e.target.className === 'edit-button') {
			$li.innerHTML = this.state
				.map(({ id, text, isCompleted }) => {
					if (id === parseInt($targetLi.id)) {
						return `<li id=${id}>
            <textarea class="edit-content"></textarea>
            <button class="edit-completed-button">수정완료</button>
            <button class="remove-button">삭제</button></li>`;
					} else {
						return listTemplate(id, text, isCompleted);
					}
				})
				.join('');
		} else if (e.target.className === 'edit-completed-button') {
			const editContent = $targetLi.firstElementChild.value;
			onEditCompleteClick(editContent, listIndex);
		}
	});

	this.setState = (nextState) => {
		this.state = nextState;
		this.render();
	};

	this.render = () => {
		$li.innerHTML = this.state
			.map(({ id, text, isCompleted }) => {
				return listTemplate(id, text, isCompleted);
			})
			.join('');
	};

	this.render();
}
