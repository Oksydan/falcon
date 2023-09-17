
const codeLinkSubmitHandler = (event) => {
    event.preventDefault();

    const link = event.currentTarget;
    const input = document.querySelector('[name="discount_name"]');
    const form = document.querySelector('.js-voucher-form');

    if (input && form) {
        const formEvent = new Event('submit', {
            bubbles: true,
            cancelable: true,
        });

        input.value = link.textContent;
        form.dispatchEvent(formEvent);
    }
}

export default codeLinkSubmitHandler;
