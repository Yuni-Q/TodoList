/**
 * 배열 요소들을 localStorage에 JSON 형식으로 저장한다.
 */
const setLocalStorage = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

/**
 * localStorage에 있는 key 항목을 불러온 후 JSON 형식으로 파싱하여 반환한다. key가 존재하지 않으면 빈 배열을 반환한다.
 * @returns {Array} todos - localStorage에서 가져온 JSON 형식의 todos 배열 또는 빈 배열.
 */
const getLocalStorage = () => {
  return JSON.parse(localStorage.getItem("todos")) || [];
};
