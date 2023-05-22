let index = 0;

const getUniqueId = (suffix = '') => {
  index += 1;
  return index + suffix;
};

export default getUniqueId;
