
DOMReady(() => {
  const DOM_SELECTORS = {
    ALERT_BLOCK: '.js-mailalert-alert-box',
    FORM: '.js-mailalert',
    SUBMIT_BTN: '.js-mailalert-submit',
    EMAIL_INPUT: '.js-mailalert-email',
    MODAL: '#email-alert-modal',
    MODAL_BTN: '.js-mailalert-modal-btn',
    REMOVE_BTN: '.js-remove-email-alert',
    INPUT_ID_PRODUCT: '.js-mailalert-id-product',
    INPUT_ID_PRODUCT_ATTRIBUTE: '.js-mailalert-id-product-attribute',
    PRODUCT_MINIATURE: '.js-mailalert-product-miniature',
  };

  const clearAlert = () => {
    each(DOM_SELECTORS.ALERT_BLOCK, (el) => el.innerHTML = '');
  }

  const resetForm = () => {
    each(DOM_SELECTORS.EMAIL_INPUT, (el) => el.value = '');
    each(`${DOM_SELECTORS.FORM} [name=psgdpr_consent_checkbox]`, (el) => el.checked = false);
  }

  const setAlert = (message, type) => {
    const alertBox = document.querySelector(DOM_SELECTORS.ALERT_BLOCK);
    const alert = parseToHtml(`<div class="alert alert-${type}">${message}</div>`);

    if (type === 'success') {
      alert.classList.add('alert-success');
    } else if (type === 'danger') {
      alert.classList.add('alert-danger');
    }

    alert.innerText = message;

    alertBox?.append(alert);
  }

  const handleAddNotification = (email, idProduct, idProductAttribute) => {
    const submitBtn = document.querySelector(DOM_SELECTORS.SUBMIT_BTN);
    const form = document.querySelector(DOM_SELECTORS.FORM);
    const url = form?.dataset.url;

    submitBtn.setAttribute('disabled', true);
    clearAlert();


    if (!url) {
      return;
    }

    const { request } = useHttpRequest(url);

    request
      .query({
        id_product: idProduct,
        id_product_attribute: idProductAttribute,
        customer_email: email,
      })
      .post()
      .json((resp) => {
        const alertType = resp.error ? 'danger' : 'success';

        setAlert(resp.message, alertType);

        if (resp.error) {
          submitBtn.removeAttribute('disabled');
        } else {
          const modal = document.querySelector(DOM_SELECTORS.MODAL);

          eventHandlerOff(modal, 'hidden.bs.modal', handleModalClose);
          eventHandlerOn(modal, 'hidden.bs.modal', handleModalClose);

          setTimeout(() => {
            const modalInstance = bootstrap.Modal.getInstance(modal);
            const modalBtn = document.querySelector(DOM_SELECTORS.MODAL_BTN);

            modalInstance?.hide();
            modalBtn?.classList.add('d-none');
          }, 2500);
        }
      });
  }

  const handleSubmitClick = (e) => {
    e.preventDefault();

    const inputIdProduct = document.querySelector(DOM_SELECTORS.INPUT_ID_PRODUCT);
    const inputIdProductAttribute = document.querySelector(DOM_SELECTORS.INPUT_ID_PRODUCT_ATTRIBUTE);
    const emailInput = document.querySelector(DOM_SELECTORS.EMAIL_INPUT);
    const idProduct = inputIdProduct?.value;
    const idProductAttribute = inputIdProductAttribute?.value || 0;
    const email = emailInput?.value;

    handleAddNotification(email, idProduct, idProductAttribute);
  }

  const handelRemoveNotification = (url, idProduct, idProductAttribute, elementToRemove) => {
    const { request } = useHttpRequest(url);

    request
      .query({
        id_product: idProduct,
        id_product_attribute: idProductAttribute,
      })
      .post()
      .json((resp) => {
        if (resp != '0') {
          return;
        }

        if (elementToRemove) {
          elementToRemove?.remove();
        }
      })
  }

  const handleRemoveClick = (e) => {
    e.preventDefault();
    const btn = e.delegateTarget;

    const idProduct = btn.dataset.idProduct;
    const idProductAttribute = btn.dataset.idProductAttribute;
    const url = btn.dataset.url;
    const elementToRemove = btn.closest(DOM_SELECTORS.PRODUCT_MINIATURE);

    handelRemoveNotification(url, idProduct, idProductAttribute, elementToRemove);
  }

  const handleModalClose = (e) => {
    resetForm();
    clearAlert();
  }

  eventHandlerOn(document, 'click', DOM_SELECTORS.SUBMIT_BTN, handleSubmitClick);
  eventHandlerOn(document, 'click', DOM_SELECTORS.REMOVE_BTN, handleRemoveClick);
});
