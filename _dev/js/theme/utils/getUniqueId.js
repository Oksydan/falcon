let index = 0;

const getUniqueId = (suffix = '') => {
    return index++ + suffix;
}

export default getUniqueId;
