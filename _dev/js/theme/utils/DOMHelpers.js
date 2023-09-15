/**
 * Check if element is visible
 * @param el {HTMLElement} - element to check
 * @returns {boolean} - true if element is visible and false otherwise
 */
export const isElementVisible = (el) => !!(
  el.offsetWidth
    || el.offsetHeight
    || el.getClientRects().length
);

/**
 * Run a function on each element
 * @param elementsOrSelector {NodeList|HTMLCollection|string} - elements or selector
 * @param fnc {function} - function to run on each element
 * @returns {void}
 */
export const each = (elementsOrSelector, fnc) => {
  const elements = typeof elementsOrSelector === 'string'
    ? document.querySelectorAll(elementsOrSelector)
    : elementsOrSelector;

  elements.forEach((element) => {
    fnc(element);
  });
};
