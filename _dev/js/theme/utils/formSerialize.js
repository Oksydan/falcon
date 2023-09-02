/**
 * Serializes the form into an object
 * @param {HTMLFormElement} form
 * @returns {Object}
 */
export const fromSerializeObject = (form) => {
  const data = {};
  const formData = new FormData(form);

  for (const key of formData.keys()) {
    data[key] = formData.get(key);
  }

  return data;
};

/**
 * Substitutes the jQuery.serialize() method
 * @param {HTMLFormElement} form
 * @returns {string}
 */
export const fromSerialize = (form) => new URLSearchParams(new FormData(form)).toString();

/**
 * Substitutes the jQuery.serializeArray() method
 * @param {HTMLFormElement} form
 * @returns {Array}
 */
export const formSerializeArray = (form) => {
  const data = [];
  const formData = new FormData(form);

  for (const key of formData.keys()) {
    data.push({
      name: key,
      value: formData.get(key),
    });
  }

  return data;
};
