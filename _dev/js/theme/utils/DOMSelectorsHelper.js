
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
}

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
}
