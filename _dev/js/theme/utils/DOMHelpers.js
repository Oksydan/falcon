/**
 * Check if element is visible
 * @param el
 * @returns {boolean}
 */
export const isElementVisible = (el) => !!(
  el.offsetWidth
    || el.offsetHeight
    || el.getClientRects().length
);

/**
 * Run a function on each element
 * @param elementsOrSelector
 * @param fnc
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
