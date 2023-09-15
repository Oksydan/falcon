/**
 * Serializes the form into an object
 * @param form {HTMLFormElement} - form element to serialize
 * @returns {Object} - serialized form data
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
 * @param form {HTMLFormElement} - form element to serialize
 * @returns {string} - serialized form data in URLSearchParams format
 */
export const fromSerialize = (form) => new URLSearchParams(new FormData(form)).toString();

/**
 * Substitutes the jQuery.serializeArray() method
 * @param form {HTMLFormElement} - form element to serialize
 * @returns {Array} - serialized form data in array format [{name: 'name', value: 'value'}]
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
