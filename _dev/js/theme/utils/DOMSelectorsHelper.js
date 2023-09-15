/**
 * Get all siblings before element
 * @param elem {HTMLElement} - element to get siblings
 * @param includeCurrentElement {boolean} - include current element in siblings list
 * @returns {HTMLElement[]} - siblings list
 */
export const getAllSiblingsBeforeElement = (elem, includeCurrentElement = false) => {
  const siblings = [];
  let sibling = elem.previousElementSibling;

  while (sibling) {
    if (sibling.nodeType === 1) {
      siblings.push(sibling);
    }
    sibling = sibling.previousElementSibling;
  }

  if (includeCurrentElement) {
    siblings.push(elem);
  }

  return siblings;
};

/**
 * Get all siblings after element
 * @param elem {HTMLElement} - element to get siblings
 * @param includeCurrentElement {boolean} - include current element in siblings list
 * @returns {HTMLElement[]} - siblings list
 */
export const getAllSiblingsAfterElement = (elem, includeCurrentElement = false) => {
  const siblings = [];
  let sibling = elem.nextElementSibling;

  while (sibling) {
    if (sibling.nodeType === 1) {
      siblings.push(sibling);
    }
    sibling = sibling.nextElementSibling;
  }

  if (includeCurrentElement) {
    siblings.push(elem);
  }

  return siblings;
};
