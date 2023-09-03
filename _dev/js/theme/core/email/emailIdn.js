import punycode from 'punycode';

const initEmailIdn = (selector) => {
  const emailFields = document.querySelectorAll(selector);
  const handleField = (field) => {
    if (!field.checkValidity()) {
      const parts = field.value.split('@');

      if (punycode.toASCII(parts[0]) === parts[0]) {
        field.value = punycode.toASCII(field.value);
      }
    }
  };

  emailFields.forEach((field) => {
    handleField(field);

    field.addEventListener('blur', () => {
      handleField(field);
    });
  });
};

export default initEmailIdn;
