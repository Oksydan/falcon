/**
 * Debounce function
 * @param func {function} - function to debounce
 * @param timeout {int} - timeout in ms (default: 300)
 * @returns {(function(...[*]): void)|*}
 */
const debounce = (func, timeout = 300) => {
  let timer;

  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
};

export default debounce;
