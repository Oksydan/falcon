/**
 * Convert a template string into HTML DOM nodes
 * @param  {String} str The template string
 * @return {Node}       The template HTML
 */
const parseToHtml = (str) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(str, 'text/html');

  return doc.body.children[0];
};

export default parseToHtml;
