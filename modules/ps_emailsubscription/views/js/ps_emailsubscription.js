
DOMReady(() => {
  const ALERT_BLOCK_CLASS = 'js-newsletter-form-alert';
  const buildAlertBlock = (msg, type) => parseToHtml(`<div class="alert alert-${type} ${ALERT_BLOCK_CLASS}">${msg}</div>`);
  const handleSubmit = (e) => {
    e.preventDefault();

    // psemailsubscription_subscription - is a global variable
    if (typeof psemailsubscription_subscription === 'undefined') {
      return true;
    }

    const alertBlock = document.querySelector(`.${ALERT_BLOCK_CLASS}`);
    const form = e.target;
    const data = fromSerialize(form);

    const { request } = useHttpRequest(psemailsubscription_subscription);

    request
      .body(data)
      .post()
      .json((resp) => {
        alertBlock?.remove();
        
        if (resp.nw_error) {
          form.prepend(buildAlertBlock(resp.msg, 'danger'));
        } else {
          form.prepend(buildAlertBlock(resp.msg, 'success'));
        }
      });
  }

  each('.js-newsletter-form', (el) => {
    eventHandlerOn(el, 'submit', handleSubmit);
  })
})
