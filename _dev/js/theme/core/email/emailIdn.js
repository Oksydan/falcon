import punycode from 'punycode';

/**
 * Initializes the conversion of Internationalized Domain Names (IDN) in email fields.
 * @param {string} selector - The CSS selector for the email fields.
 */
const initEmailIdn = (selector) => {
  /**
   * Handles the conversion of IDN in the provided email field.
   * @param {HTMLInputElement} field - The email input field.
   */
  const handleField = (field) => {
    // Check if the email field is not valid
    if (!field.checkValidity()) {
      const parts = field.value.split('@');

      // Convert the local part of the email address to ASCII if needed
      if (punycode.toASCII(parts[0]) === parts[0]) {
        field.value = punycode.toASCII(field.value);
      }
    }
  };

  // Iterate through each email field
  document.querySelectorAll(selector).forEach((field) => {
    // Initial handling of the email field
    handleField(field);

    // Attach blur event listener to re-handle the email field on blur
    field.addEventListener('blur', () => {
      handleField(field);
    });
  });
};

export default initEmailIdn;
