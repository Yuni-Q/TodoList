const setLocalStorage = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const getLocalStorage = () => {
  return JSON.parse(localStorage.getItem("todos")) || [];
};
