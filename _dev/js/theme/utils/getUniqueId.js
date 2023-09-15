let index = 0;

/**
 * Get unique id
 * @param suffix {string} - suffix for unique id
 * @returns {string} - unique id with suffix
 */
const getUniqueId = (suffix = '') => {
  index += 1;
  return index + suffix;
};

export default getUniqueId;
