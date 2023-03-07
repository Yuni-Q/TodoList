/**
 * @description 배열 요소들을 localStorage에 JSON 형식으로 저장한다.
 * @param {string} key localStorage에 저장할 key 이름
 * @param {array} arr localStorage에 저장할 배열
 */
const setLocalStorage = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

/**
 * @description localStorage에 있는 key 항목을 불러온 후 JSON 형식으로 파싱하여 반환한다. key가 존재하지 않으면 빈 배열을 반환한다.
 * @param {string} key localStorage에서 불러올 key 이름
 */
const getLocalStorage = () => {
  return JSON.parse(localStorage.getItem("todos")) || [];
};
