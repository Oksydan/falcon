/**
 * simple sprintf implementation
 * @param str {string} - string to format
 * @param args {Array} - arguments to replace
 * @returns {string} - formatted string
 */
const sprintf = (str, ...args) => {
  let i = 0;

  // eslint-disable-next-line
  return str.replace(/%s/g, () => args?.[i++] || '');
};

export default sprintf;
