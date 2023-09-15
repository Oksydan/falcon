/**
 * Convert a template string into HTML DOM nodes
 * @param  str {String} - string representation of the HTML
 * @return {HTMLElement} - HTML element from the string
 */
const parseToHtml = (str) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(str, 'text/html');

  return doc.body.children[0];
};

export default parseToHtml;
