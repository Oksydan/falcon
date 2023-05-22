const sprintf = (str, ...args) => {
  let i = 0;

  // eslint-disable-next-line
  return str.replace(/%s/g, () => args?.[i++] || '');
};

export default sprintf;
