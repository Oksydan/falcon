export const fromSerializeObject = (form) => {
  const data = {};
  const formData = new FormData(form);

  for (const key of formData.keys()) {
    data[key] = formData.get(key);
  }

  return data;
};

export const fromSerialize = (form) => new URLSearchParams(new FormData(form)).toString();
