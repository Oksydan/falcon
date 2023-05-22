export const fromSerializeObject = (form) => {
    let data = {};
    let formData = new FormData(form);

    for (let key of formData.keys()) {
        data[key] = formData.get(key);
    }

    return data;
}

export const fromSerialize = (form) => new URLSearchParams(new FormData(form)).toString();

