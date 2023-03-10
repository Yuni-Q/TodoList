export const getItem = (key, defaultValue, onError) => {
  try {
    const storedValue = localStorage.getItem(key);
    if (storedValue) return JSON.parse(storedValue);

    return defaultValue;
  } catch (e) {
    if (onError) {
      onError(e);
    }
    return defaultValue;
  }
};

export const setItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    return false;
  }
};
