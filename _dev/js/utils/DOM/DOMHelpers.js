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

/**
 * DOMReady function runs a callback function when the DOM is ready (DOMContentLoaded)
 * @param callback {function} - callback function
 */
export const DOMReady = (callback) => {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', callback);
  } else {
    callback();
  }
};

/**
 * Convert a template string into HTML DOM nodes
 * @param  str {string} - string representation of the HTML
 * @return {HTMLElement} - HTML element from the string
 */
export const parseToHtml = (str) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(str, 'text/html');

  return doc.body.children[0];
};
